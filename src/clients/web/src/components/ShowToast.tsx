import { toast } from 'react-semantic-toasts';

const ShowToast = (title: string, message: string, state: 'error' | 'success' | 'warning'): void => {
  toast({
    title,
    time: 4000,
    type: state,
    size: 'small',
    description: message,
    animation: 'fade left',
  });
};

export default ShowToast;
