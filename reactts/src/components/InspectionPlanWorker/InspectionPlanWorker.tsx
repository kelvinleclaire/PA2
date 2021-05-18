import React, { useState } from 'react'
import InspectionPlanWorkerTable from './InspectionPlanWorkerTable'

import IInspectionPlanFromDB from '../../Models/IInspectionPlanFromDB'

/*two new inspectionplan in progress interfaces*/
import IValuesAndTolerancesInProgress from '../../Models/IValuesAndTolerancesInProgress'
import IInspectionPlanInProgress from '../../Models/IInspectionPlanInProgress'

import PDFExport from '../PDFExport'

interface InspectionPlanWorkerProps {
  inspectionPlan: IInspectionPlanFromDB
}

/**
 * This component takes an inspection plan from the db and  displays every value, tolerance. it adds the option
 * to add a measured value to the values and tolerances
 * @param inspectionPlan: IInspectionPlanFromDB
 * @returns a header, a table with the values and tolerances, and a pdf export button to export your list
 */

export default function InspectionPlanWorker(props: InspectionPlanWorkerProps) {

  const [finishedInspectionPlan, setFinishedInspectionPlan] = useState<IInspectionPlanInProgress>();
  const [serialNumber, setSerialNumber] = useState('');
  const [finalSerialNumber, setFinalSerialNumber] = useState('');

  function serialNumberInput(e:any)
  {
    setSerialNumber(e.target.value);
  }

  function saveSerialNumber(e:any)
  {
    setFinalSerialNumber(serialNumber);
  }

  function showSaveToPDFButton(bool: boolean, finishedValsAndTols: IValuesAndTolerancesInProgress[])
  {

    let tempFinishedInspectionPlan: IInspectionPlanInProgress = props.inspectionPlan;
    tempFinishedInspectionPlan.valuesAndTolerancesInProgress = finishedValsAndTols;
    setFinishedInspectionPlan(tempFinishedInspectionPlan);

  }

  return (
    <div className="InspectionPlanWorker">
      <h2>Bearbeitung von {props.inspectionPlan.inspectionPlanName}</h2>
      <div className="serialNumberInput">
        {/* TODO: Seriennummer ist noch nicht in den anforderungen, also später erst bearbeiten */}
        <span>Gib die Seriennummer deines Bauteils an: </span>
        {finalSerialNumber ? <p>Seriennummer: {finalSerialNumber}</p> : <div><input onChange={serialNumberInput} placeholder="Seriennummer "></input><button onClick={saveSerialNumber}>Seriennummer speichern</button></div>}
      </div>
      <InspectionPlanWorkerTable onEveryValueEntered={showSaveToPDFButton} valuesAndTolerances={props.inspectionPlan.valuesAndTolerances} />
      {finishedInspectionPlan && finalSerialNumber ? <PDFExport serialNumber={serialNumber} inspectionPlan={finishedInspectionPlan}></PDFExport> : <div><button disabled>Save to PDF</button> <span> (Bitte Seriennummer angeben, alle Werte messen und bestätigen (Enter) um PDF zu generieren)</span></div>}
    </div>
  );
}




