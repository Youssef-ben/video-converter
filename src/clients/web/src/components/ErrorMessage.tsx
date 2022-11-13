import { Message } from 'semantic-ui-react';

interface ErrorMessageProps {
  show: boolean;
  content: string;
}

function ErrorMessage({ show, content }: ErrorMessageProps) {
  if (!show) {
    return null;
  }
  return (
    <Message size="small" negative className="app-error">
      <p>{content}</p>
    </Message>
  );
}

export default ErrorMessage;
