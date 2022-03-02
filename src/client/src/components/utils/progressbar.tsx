import React from 'react';
import { useTranslation } from 'react-i18next';
import { DownloadProgressEvent } from '../../types/vytc/websocket.events';

interface ProgressBarProps extends DownloadProgressEvent {
  display: boolean;
}

function ProgressBar(props: ProgressBarProps): JSX.Element {
  const { t } = useTranslation();

  const { progress, text, display } = props;

  const percentComplete = `${progress}%`;

  return (
    <div>
      {display && (
        <div>
          <div className="progress">
            <div className="progress-bar btn-primary" style={{ width: percentComplete }} />
          </div>
          <div className="center mb-2">
            <div className="progress-percentage">{percentComplete}</div>
            <span className="progress-info">{t(text)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProgressBar;
