import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { StoreContext } from 'storeon/react';
import store from './store';
import App from './App';
import { applyPolyfills, defineCustomElements } from '@garpix/garpix-web-components/loader';
import '@garpix/garpix-web-components/dist/garpix-web-components/garpix-web-components.css';
import './style/index.scss';

const BaseApp = () => {
  return (
    <StoreContext.Provider value={store}>
      <Router>
        <App />
      </Router>
    </StoreContext.Provider>
  );
};

render(<BaseApp />, document.getElementById('root'));

applyPolyfills().then(() => {
  defineCustomElements();
});

