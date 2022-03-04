import fs from 'fs';
import path from 'path';

// Custom
import packageJson from '../../package.json';
import mergeObjects from './merge.config';
import { ConfigurationFile } from './config.types';
import { logger } from '../utils/winston.logger';

class ApiConfig {
  public readonly config: ConfigurationFile;

  constructor() {
    this.config = this.loadConfigFile();

    this.setupTheAppSection();
    this.setupFromEnvironmentFile();

    this.validateAppConfigSection();

    this.config.getAllowedDomains = this.getAllowedDomains;
  }

  private getAllowedDomains = (): Array<string> | boolean => {
    if (this.config.allowed_guests == '*') {
      return true;
    }

    return this.config.allowed_guests.split(';');
  };

  private loadConfigFile = (): ConfigurationFile => {
    logger.debug(`Config::Started the process of loading the configuration file (config.json)...`);

    const jsonConfigFile = path.join(__dirname, 'config.json');

    // Check that the base file {config.json} exists.
    if (!fs.existsSync(jsonConfigFile)) {
      throw new Error(`Config::Configuration file required!. Couldn't find a valid configuration file (config.json)`);
    }

    // Load the base config file.
    const data = fs.readFileSync(jsonConfigFile, 'utf-8');

    // Load any other config file based on the environment variable if any.
    return this.loadEnvironmentConfigFile(JSON.parse(data));
  };

  private loadEnvironmentConfigFile(defaultConfig: ConfigurationFile): ConfigurationFile {
    const env = process.env.NODE_ENV?.toLowerCase() || 'development';
    const jsonConfigFile = path.join(__dirname, `config.${env}.json`);

    // Check if we have any environment configuration file.
    if (!fs.existsSync(jsonConfigFile)) {
      logger.debug(`Config::No Environment configuration file found for (${env}) environment!`);
      return defaultConfig;
    }

    logger.debug(`Config::Environment configuration file found for (${env}) environment, loading...`);
    const data = fs.readFileSync(jsonConfigFile, 'utf-8');
    const extraSettings = JSON.parse(data);

    logger.debug(`Config::Environment configuration file (${env}), loaded successfuly!`);
    return mergeObjects({ ...defaultConfig }, { ...extraSettings });
  }

  private setupTheAppSection(): void {
    // Setup the App Section
    this.config.app.version = packageJson.version;
    this.config.app.release_date = packageJson.releaseDate;
    this.config.app.title = packageJson.productName;
    this.config.app.description = packageJson.description;

    this.config.app.environment = process.env.NODE_ENV?.toLowerCase() || 'development';
    this.config.app.port = process.env.PORT || '3000';

    this.config.app.year = new Date().getFullYear();
    this.config.app.copyright = `Copyright {${this.config.app.title}} (${this.config.app.year}) | All Rights Reserved`;
  }

  /**
   * Override the configuration file by privileging the environment variables first
   * and default to the config.json.
   */
  private setupFromEnvironmentFile(): void {
    logger.debug(`Config::Overriding the configuration using the (.env) file...`);
    const { allowed_guests, duration_in_minutes, secret_key, passphrase } = process.env;
    const { security } = this.config;

    // Setup the allowed domains.
    this.config.allowed_guests = allowed_guests ?? this.config.allowed_guests;

    // Setup the Security section.
    const duration = duration_in_minutes || undefined;
    this.config.security.duration_in_minutes = duration ? parseInt(duration) : security.duration_in_minutes;
    this.config.security.secret_key = secret_key || security.secret_key;
    this.config.security.passphrase = passphrase || security.passphrase;
    logger.debug(`Config::Overriding the configuration using the (.env) finished successfuly!`);
  }

  private validateAppConfigSection = (): void => {
    const msg = 'Config::Validation::App::Value(s) for ({0}) is required!';
    const errors: Array<string> = new Array<string>();

    // App section
    if (!this.config.app) {
      errors.push(msg.format('App section'));
    }
    if (!this.config.app.version) {
      errors.push(msg.format('version'));
    }
    if (!this.config.app.release_date) {
      errors.push(msg.format('release date'));
    }

    // Allowed Guests.
    if (!this.config.allowed_guests || this.config.allowed_guests.length === 0) {
      errors.push(msg.format('Allowed Guests'));
    }

    // Security section
    if (!this.config.security) {
      errors.push(msg.format('Security section'));
    }
    if (!this.config.security.duration_in_minutes || this.config.security.duration_in_minutes < 1) {
      errors.push(msg.format('duration by minutes'));
    }
    if (!this.config.security.secret_key) {
      errors.push(msg.format('secret key'));
    }
    if (!this.config.security.passphrase) {
      errors.push(msg.format('passphrase'));
    }
  };
}

const configuration = new ApiConfig();
const { config } = configuration;

export { config as appConfig };
export default configuration;
