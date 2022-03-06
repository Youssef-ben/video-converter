import { Body, Route, Tags, Post, Get, Hidden, Query, Delete } from 'tsoa';
import bcrypt from 'bcrypt';

// Custom
import { ApiResponse } from '../models/response/api.response';
import { logger } from '../utils/winston.logger';
import { appConfig } from '../config/index';
import { BadRequestError } from '../models/exceptions/bad_request.error';
import { LoginDto, LoginResponseDto } from '../models/security/security.dto.model';
import SecurityService from '../services/security.service';
import { UnAuthorizedError } from '../models/exceptions/unauthorized.error';
import { EmptyResponseDto } from '../models/response/empty_response.model';

@Route('security')
@Tags('security')
class SecurityController {
  private loggerId = 'Controller::Security::';

  public readonly name = 'security';
  public readonly Routes = {
    Login: '/login',
    Logout: '/logout',
    Refresh: '/refresh',
  };

  /**
   * Connect the user and returns a valid jwt access token.
   *
   * @param passphrase The security passe code.
   */
  @Post('/login')
  async postLogin(@Body() credential: LoginDto): Promise<ApiResponse<LoginResponseDto>> {
    logger.info(`${this.loggerId}Started the validation of the user credentials!`);

    // Compare the passwords
    const result = await bcrypt.compare(credential.passphrase, appConfig.security.passphrase);
    if (!result) {
      throw new BadRequestError('Invalid passphrase !', 'api.err.security.invalid_passphrase');
    }
    const accessToken = SecurityService.generateToken();

    logger.info(`${this.loggerId}Generated a new access token, returning the result!`);
    return new ApiResponse<LoginResponseDto>({
      accessToken: accessToken,
    });
  }

  /**
   * Refresh the access token for the user who requested the update.
   *
   * @param token Valid access token.
   * @returns Newly generated access token.
   */
  @Get('/refresh')
  async getRefreshedToken(@Query() @Hidden() token?: string): Promise<ApiResponse<LoginResponseDto>> {
    logger.info(`${this.loggerId}Started the access token refresh process!`);

    if (!token) {
      throw new BadRequestError('Access token required!', 'api.err.security.access_token_required');
    }

    const accessToken = SecurityService.refreshToken(token);
    if (!accessToken) {
      throw new UnAuthorizedError();
    }

    logger.info(`${this.loggerId}Generated a new access token, returning the result!`);
    return new ApiResponse<LoginResponseDto>({
      accessToken: accessToken,
    });
  }

  @Delete('/logout')
  async deleteLogout(@Query() @Hidden() token?: string): Promise<ApiResponse<EmptyResponseDto>> {
    logger.info(`${this.loggerId}Started the logout process!`);

    if (!token) {
      throw new BadRequestError('Access token required!', 'api.err.security.access_token_required');
    }

    SecurityService.logout(token);

    logger.info(`${this.loggerId}Generated a new access token, returning the result!`);
    return new ApiResponse<EmptyResponseDto>(new EmptyResponseDto('Success'));
  }
}

export default new SecurityController();
