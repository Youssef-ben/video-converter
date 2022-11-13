import { useTranslation } from "react-i18next";
import { Button, Dropdown, Form, Grid } from "semantic-ui-react";

import { useAppContext } from "common/store/vytc-context/provider";

const translations = {
  btnDownload: 'app.preview.convert',
  btnMp3: 'app.preview.convert.audio',
  btnMp4: 'app.preview.convert.video',
  dropdownLabel: 'app.preview.video_quality',
};

function PartialPreviewConvert() {
  const { t } = useTranslation();
  const { vyt } = useAppContext();

  return (
    <Form className="preview-convert">
      <Grid columns={2}>

        <Grid.Row>
          <Grid.Column className="right-padding-none" mobile={16} tablet={10} computer={11}>
            <Form.Input
              fluid
              disabled
              type="text"
              value={vyt?.title}
            />
          </Grid.Column>

          <Grid.Column className="left-padding-none" mobile={16} tablet={6} computer={5}>
            <Dropdown
              button
              className="icon video-quality"
              labeled
              icon="setting"
              text={t(translations.dropdownLabel)}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row className="buttons-group">
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
        </Grid.Row>

      </Grid>
    </Form>
  )
}


export default PartialPreviewConvert;