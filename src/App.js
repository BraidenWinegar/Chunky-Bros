import React from 'react';
import {HashRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import Toolbar from './components/Toolbar/Toolbar'
import routes from './routes'
import store from './Reducer/store'
import './App.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <HashRouter>
          <div className="App">
            <Toolbar />
            <div className="cover-container">
              <div id="max-with-container">
            {routes}
              </div>
            </div>
          </div>
        </HashRouter>
      </Provider>
    </div>
  );
}

export default App;
