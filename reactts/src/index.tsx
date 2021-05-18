import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import App from './pages/App';
import Login from './pages/Login';
import reportWebVitals from './util/reportWebVitals';
import { CurrentUserProvider } from '../src/contexts/userContext';

import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import PreWorkerPlaceholder from './pages/PreWorkerPlaceholder';
import WorkerPlaceholder from './pages/WorkerPlaceholder';
import Planpage from "./pages/Plan";
import PreworkerPlanPage from "./pages/PreworkerPlanPage";



ReactDOM.render(
  <React.StrictMode>
    <CurrentUserProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={() => <App currentContent={Login}/>}/>
          <Route path="/login" exact component={() => <App currentContent={Login}/>}/>
          <Route path="/worker" exact component={() => <App currentContent={WorkerPlaceholder}/>}/>
          <Route path="/plan" exact component={() => <App currentContent={Planpage}/>}/>
          <Route path="/preworkerplan" exact component={() => <App currentContent={PreworkerPlanPage}/>}/>

          <Route path="/preworker" exact component={() => <App currentContent={PreWorkerPlaceholder}/>}/>


          {/*Pass Current Content to the Content Component*/}
          <Route path="/Testpage" exact component={() => <App currentContent={Login}/>}/>

        </Switch>
      </BrowserRouter>
    </CurrentUserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
