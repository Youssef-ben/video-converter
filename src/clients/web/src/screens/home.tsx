

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import type { InputOnChangeData } from "semantic-ui-react";
import { Button, Form } from "semantic-ui-react";

import useLookup from "common/store/hooks/useLookup";
import { VIDEO_PLACEHOLDER } from "common/utils/constants";
import AppLogo from "components/AppLogo";
import ErrorMessage from "components/ErrorMessage";
import APP_ROUTES from "navigation/navigation-constants";

const translations = {
  description: 'app.lookup.description',
  btn_search: 'app.lookup.btn',
};

function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { lookup, search, onSearchUrlChange } = useLookup();

  const onSearchUrlChangeHandler = (_: React.ChangeEvent<HTMLInputElement>, { value }: InputOnChangeData) => {
    onSearchUrlChange(value)
  }

  const searchHandler = async () => {
    const result = await search();

    if (result) {
      navigate(APP_ROUTES.PRIV_PREVIEW)
    }
  }

  return <>
    <AppLogo />

    <p>{t(translations.description)}</p>

    <Form>

      <ErrorMessage show={!!lookup.error} content={lookup.error?.content as string} />

      <Form.Field>
        <Form.Input
          fluid
          icon="search"
          type="text"
          iconPosition="left"
          placeholder={VIDEO_PLACEHOLDER}
          value={lookup.value}
          error={!!lookup.error}
          onChange={onSearchUrlChangeHandler}
        />
      </Form.Field>

      <Button
        primary
        floated="right"
        className="search-button"
        loading={lookup.loading}
        disabled={lookup.loading}
        onClick={searchHandler}>
        {t(translations.btn_search)}
      </Button>
    </Form>
  </>;
}


export default Home;