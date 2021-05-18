import React, { useCallback, useEffect, useState } from 'react';
import { getAllFilesFromBackend } from '../../util/BackendCommunication'
import { useHistory } from "react-router-dom";
import { Table } from 'react-bootstrap';
import IInspectionPlanFromDB from '../../Models/IInspectionPlanFromDB';
import FileOverviewPreworkerRow from './FileOverviewPreworkerRow'

function FileOverview()
{

  const [files, setfiles] = useState<IInspectionPlanFromDB[]>([])
  const history = useHistory();
  const openPlanPage = useCallback(() =>
    history.push("/preworkerplan"), [history],);

  useEffect(() => {
    getAllFilesFromBackend((res: IInspectionPlanFromDB[]) => {
      setfiles(res)
    })
  }, [1])


  function fileClickListener(currentPlan: IInspectionPlanFromDB)
  {
    window.sessionStorage.setItem(
      "currentPlan",
      JSON.stringify(currentPlan)
    )

    openPlanPage();
  }

  return (
    <Table striped bordered hover>
      <thead>
        <th>Name</th>
        <th>Identifikationsnummer</th>
        <th>Prüfplan bearbeiten</th>
      </thead>
      <tbody>
        {files.map((file:any, index: number )=>
        { return <FileOverviewPreworkerRow
        inspectionPlan={file}
        index={index}
        onClickHandler={fileClickListener}/>})}
      </tbody>
    </Table>
  )

}

export default FileOverview;
