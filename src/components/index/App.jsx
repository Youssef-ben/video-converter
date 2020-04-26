import React from 'react';

// Custom Imports.
import { SectionPresentation, SectionConverter } from '../sections/imports';

function App() {
  return (
    <main className="main-content pt-4 pt-sm-5 pb-5">
      <SectionPresentation />

      <SectionConverter />
    </main>
  );
}

export default App;
