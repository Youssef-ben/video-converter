import { useTranslation } from "react-i18next";
import { Button, Dropdown, Form, Grid } from "semantic-ui-react";

const translations = {
  inputLabel: 'app.yt.video_preview.title_name',
  btn_download: 'app.convert',
  btn_mp3: 'app.convert.audio',
  btn_mp4: 'app.convert.video',
};

function PartialPreviewConvert() {
  const { t } = useTranslation();

  return (
    <Form className="preview-convert">
      <Grid columns={2}>

        <Grid.Row>
          <Grid.Column className="right-padding-none" mobile={16} tablet={10} computer={11}>
            <Form.Input
              fluid
              disabled
              type="text"
              value="Video Title here"
            />
          </Grid.Column>

          <Grid.Column className="left-padding-none" mobile={16} tablet={6} computer={5}>
            <Dropdown
              button
              className="icon video-quality"
              labeled
              icon="setting"
              text={t('app.yt.video_preview.video_quality')}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row className="buttons-group">
          <Grid.Column mobile={16} tablet={6} computer={6}>
            <Button fluid size="small" primary   >
              <span className="break-line">
                {t(translations.btn_download)}
                {'  '}
                {t(translations.btn_mp3)}
              </span>
            </Button>
          </Grid.Column>

          <Grid.Column mobile={16} tablet={6} computer={6}>
            <Button fluid size="small" secondary className="mt-1"  >
              <span>
                {t(translations.btn_download)}
                {'  '}
                {t(translations.btn_mp4)}
              </span>
            </Button>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    </Form>
  )
}


export default PartialPreviewConvert;