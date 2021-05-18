import React, { useCallback, useState } from 'react';
import '../assets/css/App.css';
import { useCurrentUserState } from '../contexts/userContext';
import { useHistory } from 'react-router-dom';
import Role from '../util/UserEnum';
import UploadInspectionPlan from '../components/InspectionPlanPreworker/UploadInspectionPlan'

import FileOverviewPreworker from '../components/InspectionPlanPreworker/FileOverviewPreworker'

function PreWorkerPlaceholder()
{
  const [pageStatus, setPageStatus] = useState('0') // 0 = initial, 1 = choose new Plan, 2 = choose used Plan TODO: USE ENUM
  const history = useHistory();
  const openLoginPage = useCallback(() => history.push("/"), [history]);
  const currentUserState = useCurrentUserState();

  if (currentUserState.currentUser === null || !currentUserState.currentUser?.loggedIn || currentUserState.currentUser?.role !== Role.preworker)
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
                        onClick={() => setPageStatus('1')}>Neuen Prüfplan anlegen
                </button>
              </div>
            </div>
            <div className="col-sm">
              <div className="box box-square">
                <button type="button"
                        className="btn btn-secondary btn-block rounded-0 border box-square-content"
                        onClick={() => setPageStatus('2')}>Bestehenden Prüfplan bearbeiten
                </button>
              </div>
            </div>
          </div>
        </div>
      case '1':
        return <div>
          <UploadInspectionPlan />
          <button type="button" className="btn btn-primary" onClick={() => setPageStatus('0')}>Back</button>
        </div>
      case '2':
        return <div>
          <FileOverviewPreworker />
          <button type="button" className="btn btn-primary" onClick={() => setPageStatus('0')}>Back</button>
        </div>
    }
  }

  return (
    <div className="PreWorkerPlaceholder">
      {/* TODO: Add session and access control */}
      {/* https://owasp.org/www-project-top-ten/2017/A5_2017-Broken_Access_Control */}
      <h1> Preworker </h1>
      <div className="border p-1">
        {
          contentSwitch()
        }
      </div>
    </div>
  );
}

export default PreWorkerPlaceholder;
