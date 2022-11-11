import { Route, Routes } from "react-router-dom";

import PageNotFound from "screens/page-not-found";

function AppNavigation() {
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}


export default AppNavigation;
