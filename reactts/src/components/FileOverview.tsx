import React, { useCallback, useEffect, useState } from 'react';
import IInspectionPlan from '../Models/IInspectionPlan';
import { getAllFilesFromBackend } from '../util/BackendCommunication'
import { useHistory } from "react-router-dom";
import IInspectionPlanFromDB from '../Models/IInspectionPlanFromDB';

function FileOverview()
{

  const [files, setfiles] = useState<IInspectionPlanFromDB[]>([])
  const [selectedPlan, setSelectedPlan] = useState<IInspectionPlanFromDB>()
  const history = useHistory();
  const openPlanPage = useCallback(() =>
    history.push("/plan"), [history],);

  useEffect(() => {
    getAllFilesFromBackend((res: IInspectionPlanFromDB[]) => {
      setfiles(res)
    })
  }, [1])


  function fileClickListener(currentPlan: IInspectionPlanFromDB)
  {
    setSelectedPlan(currentPlan);
    window.sessionStorage.setItem(
      "currentPlan",
      JSON.stringify(currentPlan)
    )

    openPlanPage();
  }

  return (
    <div className="FileOverview">
      {
        <div>
          <div className="container">
            <div className="row">
              <div className="col-sm border">
                <h5>Name</h5>
              </div>
              <div className="col-sm border">
                <h5>Identifikationsnummer</h5>
              </div>
              <div className="col-sm border">
                <h5>Erstellt von</h5>
              </div>
              <div className="col-sm border">
                <h5>Erstellt am</h5>
              </div>
              <div className="col-sm border">
                <h5>Letzte Änderung</h5>
              </div>
              <div className="col-sm border">
                <h5>Bearbeitung starten</h5>
              </div>
            </div>

            {files.map((file: IInspectionPlanFromDB, index: number) => {
              return (
                <div className="row">
                  <div className="col-sm border">
                    {file.inspectionPlanName}
                  </div>
                  <div className="col-sm border">
                    {/*TODO: durch echten index ersetzen */}
                    {index}
                  </div>
                  <div className="col-sm border">
                    Erstellt von
                  </div>
                  <div className="col-sm border">
                    Erstellt am
                  </div>
                  <div className="col-sm border">
                    Letzte Änderung
                  </div>
                  <div className="col-sm border">
                    <button className="btn btn-link" onClick={() => fileClickListener(file)}>
                      Bearbeitung starten
                    </button>
                  </div>
                </div>

              )
            })}
          </div>
        </div>


      }
    </div>
  )

}

export default FileOverview;
