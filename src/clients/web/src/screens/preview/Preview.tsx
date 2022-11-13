import { useEffect, useState } from "react";

import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { Image, Loader } from "semantic-ui-react";

import loadingImage from 'assets/images/loading.png';
import { useAppContext } from "common/store/vytc-context/provider";
import APP_ROUTES from "navigation/navigation-constants";

import PartialPreviewConvert from "./PartialPreviewConvert";

function Preview() {
  const navigate = useNavigate();
  const { vyt } = useAppContext();

  // If no data, return to home
  useEffect(() => {
    if (!vyt) {
      navigate(APP_ROUTES.PRIV_HOME);
    }
  })

  const [loadingPlayer, setLoadingPlayer] = useState(true);

  return (
    <>
      <div className="player-wrapper">
        {loadingPlayer && (
          <div className="react-player loading-image" >
            <Loader active inverted size="huge" />

            <Image src={loadingImage} rounded width="100%" height="100%" />
          </div>
        )}


        <ReactPlayer url={vyt?.link} width="100%" height="100%" className="react-player" controls onReady={() => setLoadingPlayer(false)} />
      </div>

      <PartialPreviewConvert />
    </>
  )
}


export default Preview;