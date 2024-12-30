import React from 'react';
import AuthNavigator from './src/navigation/AuthNavigator';
import { ItemCountProvider } from './src/screens/itemCountContext';

const App = () => {
  return (
    <ItemCountProvider>
      <AuthNavigator />
    </ItemCountProvider>
  );
};

export default App;
