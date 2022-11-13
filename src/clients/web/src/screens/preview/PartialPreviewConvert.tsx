import { useTranslation } from "react-i18next";
import { Button, Grid } from "semantic-ui-react";


const translations = {
  btnDownload: 'app.preview.convert',
  btnMp3: 'app.preview.convert.audio',
  btnMp4: 'app.preview.convert.video',
  dropdownLabel: 'app.preview.video_quality',
  downloadQualityLabel: 'app.preview.video_quality.label',
};

function PartialPreviewConvert() {
  const { t } = useTranslation();


  return (
    < >

      <Grid.Column mobile={16} tablet={6} computer={6}>
        <Button fluid size="small" primary   >
          <span className="break-line">
            {t(translations.btnDownload)}
            {'  '}
            {t(translations.btnMp3)}
          </span>
        </Button>
      </Grid.Column>

      <Grid.Column mobile={16} tablet={6} computer={6}>
        <Button fluid size="small" secondary className="mt-1"  >
          <span>
            {t(translations.btnDownload)}
            {'  '}
            {t(translations.btnMp4)}
          </span>
        </Button>
      </Grid.Column>

    </>
  )
}


export default PartialPreviewConvert;