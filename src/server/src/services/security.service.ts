import { Guid } from 'js-guid';
import { sign, verify, decode, SignOptions, JwtPayload } from 'jsonwebtoken';
import schedule, { RecurrenceRule, Range as SchedulerRange } from 'node-schedule';

import { appConfig } from '../config';
import { SecuritySection } from '../config/config.types';
import { SavedAccessTokens } from '../models/security/security.dto.model';
import { logger } from '../utils/winston.logger';

interface ISecurityService {
  generateToken(): string;
  refreshToken(jwtToken: string): string;
  validateToken(jwtToken: string): JwtPayload | undefined;
  logout(jwtToken: string): void;
}

class SecurityService implements ISecurityService {
  private nextJob: Date;
  JOB_RECURRENCE = 1440; // every 15 minutes

  private static AllowedTokens: Array<SavedAccessTokens> = new Array<SavedAccessTokens>();

  private options: SignOptions;
  private settings: SecuritySection;

  private loggerMsg = 'Service::Security::';

  constructor() {
    this.settings = appConfig.security;
    this.nextJob = new Date();

    this.options = {
      algorithm: 'HS256',
      audience: appConfig.allowed_guests.split(';'), // List Of Allowed clients
      expiresIn: this.settings.duration_in_minutes * 60, // Calculate the secondes
    };

    this.runBackgroundJob();
  }

  public generateToken(): string {
    logger.debug(this.loggerMsg + 'Generating the access token for the user...');
    const jwtId = Guid.newGuid().toString();

    const jwtToken = sign(
      {
        jti: jwtId,
      },
      this.settings.secret_key,
      this.options
    );

    // Calculate the expiration date.
    const expiresDate = new Date();
    expiresDate.setMinutes(expiresDate.getMinutes() + this.settings.duration_in_minutes);

    SecurityService.AllowedTokens.push({
      id: jwtId,
      expiresAt: expiresDate,
    });

    return jwtToken;
  }

  public refreshToken(jwtToken: string): string {
    logger.debug(this.loggerMsg + 'Refreshing the access token...');
    const result = this.validateToken(jwtToken);
    if (!result) {
      return '';
    }

    // Delete the JWT Token from the list of allowed ones.
    logger.debug(this.loggerMsg + 'Cancelling the given access token...');
    SecurityService.AllowedTokens = SecurityService.AllowedTokens.filter(function (value) {
      return value.id !== result.jti;
    });

    const accessToken = this.generateToken();
    return accessToken;
  }

  public validateToken(jwtToken: string): JwtPayload | undefined {
    try {
      logger.debug(this.loggerMsg + 'Validating that the access token is authentic...');
      const result = verify(jwtToken, this.settings.secret_key, this.options) as JwtPayload;

      logger.debug(this.loggerMsg + 'Validating that the access token is in the allowed list...');
      const hasToken = SecurityService.AllowedTokens.some((item) => item.id === (result?.jti as string));
      if (!hasToken) {
        logger.warn(this.loggerMsg + 'Warn::The given access token is not in the allowed list!');
        return undefined;
      }

      return result;
    } catch {
      logger.warn(this.loggerMsg + 'Warn::Access token invalid or expired!');
      return undefined;
    }
  }

  public logout(jwtToken: string): void {
    logger.debug(this.loggerMsg + 'Cancelling the given access token...');

    const payload = decode(jwtToken) as JwtPayload;
    if (!payload) {
      return;
    }

    SecurityService.AllowedTokens = SecurityService.AllowedTokens.filter(function (value) {
      return value.id !== payload?.jti;
    });
  }

  private runBackgroundJob(): void {
    const rule = new RecurrenceRule();
    rule.minute = new SchedulerRange(0, 59, this.JOB_RECURRENCE);

    logger.debug(this.loggerMsg + `Background job to remove the expired access tokens is set to run every (${this.JOB_RECURRENCE}) mins...`);
    this.setNextBackgroundJob();

    schedule.scheduleJob(rule, () => {
      logger.debug(this.loggerMsg + 'Running The background job to remove the expired access tokens...');

      // Remove all the item that the expire date is lower that the job date
      SecurityService.AllowedTokens = SecurityService.AllowedTokens.filter((item) => this.nextJob < item.expiresAt);

      this.setNextBackgroundJob();
    });
  }

  private setNextBackgroundJob(): void {
    this.nextJob = new Date();
    this.nextJob.setMinutes(this.nextJob.getMinutes() + this.JOB_RECURRENCE);
    logger.debug(this.loggerMsg + `Next Background job is set to run at (${this.nextJob})...`);
  }
}

export default new SecurityService();
