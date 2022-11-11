
import { BrowserRouter } from 'react-router-dom';

import { VytcContextProvider } from 'common/store/vytc-context/provider';
import type { VytcAsyncStorageProvider } from 'common/store/vytc-context/types';
import AppNavigation from 'navigation';

function App() {
  // Make sure that the method are async.
  const appStorage: VytcAsyncStorageProvider = {
    getItem: async (key: string) => localStorage.getItem(key),
    setItem: async (key: string, value: string) => localStorage.setItem(key, value),
    removeItem: async (key: string) => localStorage.removeItem(key),
  };

  return (
    <VytcContextProvider storage={appStorage} >
      <BrowserRouter>
        <h1>This is my test</h1>
        <AppNavigation />

      </BrowserRouter>
    </VytcContextProvider>
  )
}


export default App;