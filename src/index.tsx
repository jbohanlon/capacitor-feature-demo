import React from 'react';
import ReactDOM from 'react-dom';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { getPlatforms, isPlatform } from '@ionic/react';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { registerCustomChannels, registerCustomActionTypes, registerCustomListeners } from './utils/NotificationUtils';

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);

console.log(getPlatforms());

// Note: Need to check separately for ios and android (rather than checking 'mobile')
// because of a window browser platform bug: https://github.com/ionic-team/ionic-framework/issues/19942
if (isPlatform('ios') || isPlatform('android')) {
  registerCustomChannels();
  registerCustomActionTypes();
  registerCustomListeners();
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
