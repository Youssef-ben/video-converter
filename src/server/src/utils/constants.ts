import path from 'path';
import os from 'os';

// Create the server temp folder if not exists.
export const SERVER_TEMP_FOLDER = path.join(os.tmpdir(), 'vytc');
