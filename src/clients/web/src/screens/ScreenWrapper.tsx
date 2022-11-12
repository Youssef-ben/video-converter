import { Container } from "semantic-ui-react";

interface Props {
  children: JSX.Element;
}
function ScreenWrapper({ children }: Props) {
  return (
    <Container className="app-content">
      <div className="yt-content">{children}</div>
    </Container>
  );
}


export default ScreenWrapper;