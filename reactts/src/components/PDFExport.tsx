import React from 'react'
import IInspectionPlanInProgress from '../Models/IInspectionPlanInProgress';

import { saveInspectionPlanWithMeasures } from '../util/PDFExport'

interface IProps {
  inspectionPlan: IInspectionPlanInProgress
  serialNumber?: string
}

/**
 *Turns a InspectionPlanInProgress into a pdf version of the plan
 * @param inspectionPlan: IInspectionPlanInProgress
 * @returns
 */
export default function PDFExport (props: IProps)
{
  let inspectionPlan = props.inspectionPlan;
  let serialNumber = inspectionPlan.serialnumber || props.serialNumber;

  //TODO: geht das cleaner?
  let nameOfInspector = JSON.parse(window.sessionStorage.getItem('currentUser') as string).displayname || 'NO USER LOGGED IN';

  function onClickHandler()
  {
    if (inspectionPlan.valuesAndTolerancesInProgress && nameOfInspector) {
      saveInspectionPlanWithMeasures(props.inspectionPlan.inspectionPlanName, inspectionPlan, nameOfInspector, serialNumber);
    }
  }

  // TODO: Testfile text entfernen sobald richtige daten übergeben werden
  return (
    <div>
      <button onClick={onClickHandler}>Save to PDF</button>
    </div>
  )
}
