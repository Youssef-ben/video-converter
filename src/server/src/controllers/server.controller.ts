import { Get, Route, Tags } from 'tsoa';

// Custom
import { ConfigDTO } from '../models/config/config.dto.model';
import { appConfig } from '../config';
import { ApiResponse } from '../models/response/api.response';
import { logger } from '../utils/winston.logger';

@Route('server')
@Tags('Server')
class ServerController {
  private loggerId = 'Controller::Server::';

  public readonly name = 'Server';

  @Get('/')
  async getConfig(): Promise<ApiResponse<ConfigDTO>> {
    logger.info(`${this.loggerId}Fetching the server details...`);

    const result: ConfigDTO = {
      version: appConfig.app.version,
      releaseDate: appConfig.app.release_date,

      name: appConfig.app.title,
      copyright: appConfig.app.copyright,
      description: appConfig.app.description,
    };

    return new ApiResponse<ConfigDTO>(result);
  }
}

export default new ServerController();
