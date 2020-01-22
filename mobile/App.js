import React from 'react';
import { StatusBar, YellowBox } from 'react-native';

import Routes from './src/routes';

//Só pra evitar a caixa amarela de aviso. Mas não é o certo.
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
])

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7d40e7"/>
      <Routes />
    </>
  );
}

