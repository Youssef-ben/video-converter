import { useAppContext } from 'common/store/vytc-context/provider';
import { AppText, AppView } from 'components/ui';

const DownloadFinished = () => {
  const { vyt } = useAppContext();
  console.log(vyt.download);

  return (
    <AppView>
      <AppText>Start Downloading...</AppText>
    </AppView>
  );
};

export default DownloadFinished;
