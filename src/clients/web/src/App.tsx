import AppFooter from "components/app-footer";
import AppHeader from "components/app-header";

interface Props {
  children: JSX.Element;
}
function App({ children }: Props) {
  return (
    <>
      <AppHeader />

      <section>
        {children}
      </section>

      <AppFooter />
    </>
  )
}


export default App;