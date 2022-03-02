import { toast } from 'react-semantic-toasts';

const ShowToast = (type: 'error' | 'warning' | 'success', title: string, description: string): void => {
  toast({
    type,
    title,
    description,
    animation: 'fade left',
    time: 4000,
    size: 'small',
  });
};

export default ShowToast;
