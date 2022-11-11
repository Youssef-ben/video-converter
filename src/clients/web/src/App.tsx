import AppFooter from "components/app-footer";
import AppHeader from "components/app-header";
import AppNavigation from "navigation";

function App() {
  return (
    <>
      <AppHeader />

      <section>
        <AppNavigation />
      </section>

      <AppFooter />
    </>
  )
}


export default App;