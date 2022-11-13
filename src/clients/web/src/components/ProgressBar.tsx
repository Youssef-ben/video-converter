import { useTranslation } from 'react-i18next';

import type { DownloadProgressEvent } from 'common/types/clients/websockets-events';

interface ProgressBarProps extends DownloadProgressEvent {
  display: boolean;
}

function ProgressBar({ progress, text, display }: ProgressBarProps): JSX.Element {
  const { t } = useTranslation();

  const percentComplete = `${progress}%`;

  return (
    <div>
      {display && (
        <div>
          <div className="progress">
            <div className="progress-bar" style={{ width: percentComplete }} />
          </div>

          <div className="progress-info">
            <div className="progress-percentage">{percentComplete}</div>
            <span className="progress-text">{t(text)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProgressBar;
