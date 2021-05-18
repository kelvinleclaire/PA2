import React, { useCallback, useState } from 'react';
import '../assets/css/App.css';
import FileOverview from "../components/FileOverview";
import { useHistory } from "react-router-dom";
import Role from '../util/UserEnum';
import { useCurrentUserState } from '../contexts/userContext';

function WorkerPlaceholder()
{

  const [pageStatus, setPageStatus] = useState('0') // 0 = initial, 1 = choose new Plan, 2 = choose used Plan TODO: USE ENUM
  const history = useHistory();
  const openTestpage = useCallback(() => history.push("/testpage"), [history]);
  const currentUserState = useCurrentUserState();
  const openLoginPage = useCallback(() => history.push("/"), [history]);


  //Session Storage is persistent even when the user refreshes the site
  if (currentUserState.currentUser === null || !currentUserState.currentUser?.loggedIn || currentUserState.currentUser?.role !== Role.worker)
  {
    openLoginPage();
  }

  function contentSwitch()
  {
    switch (pageStatus)
    {
      case '0':
        return <div className="container py-4">
          <div className="row">
            <div className="col-sm">
              <div className="box box-square">
                <button type="button"
                        className="btn btn-secondary btn-block rounded-0 border box-square-content"
                        onClick={() => setPageStatus('1')}>Prüfpläne anzeigen
                </button>
              </div>
            </div>
            <div className="col-sm">
              <div className="box box-square">
                <button type="button"
                        className="btn btn-secondary btn-block rounded-0 border box-square-content"
                        onClick={() => setPageStatus('2')}>Bestehenden Prüfplan bearbeitung fortsetzen
                </button>
              </div>
            </div>
          </div>
        </div>
      case '1':
        return <div>
          <FileOverview/>
          <button type="button" className="btn btn-primary" onClick={() => setPageStatus('0')}>Back</button>
        </div>
      case '2':
        return <div>
          //TODO: Find out what this pages content has to be
        </div>
    }
  }

  return (
    <div className="WorkerPlaceholder">
      {/* TODO: Add session and access control */}
      {/* https://owasp.org/www-project-top-ten/2017/A5_2017-Broken_Access_Control */}
      <h1> Hallo {currentUserState.currentUser?.username} </h1>
      {
        contentSwitch()
      }
    </div>
  );
}

export default WorkerPlaceholder;
