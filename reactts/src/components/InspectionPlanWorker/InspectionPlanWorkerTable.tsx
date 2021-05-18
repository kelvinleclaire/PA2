import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import InspectionPlanWorkerTableRow from './InspectionPlanWorkerTableRow'

import IValuesAndTolerances from '../../Models/IValueAndTolerance'
import IValuesAndTolerancesInProgress from '../../Models/IValuesAndTolerancesInProgress'

interface IInspectionPlanWorkerTableProps {
  valuesAndTolerances: IValuesAndTolerances[]
  onEveryValueEntered: (bool: boolean, finishedValsAndTols: IValuesAndTolerances[]) => void
}

export default function InspectionPlanWorkerTable(props: IInspectionPlanWorkerTableProps)
{

  const [valuesAndTolsInProgress, setValuesAndTolsInProgress] = useState<IValuesAndTolerancesInProgress[]>([])

  useEffect(() => {
    setValuesAndTolsInProgress(props.valuesAndTolerances);
  }, [props.valuesAndTolerances]);


  function onValueSaveHandler(index: number, measuredValue: number, pass: boolean)
  {
    let tempValsAndTolsInProg = valuesAndTolsInProgress;
    tempValsAndTolsInProg.map((element: IValuesAndTolerancesInProgress, indexElement: number) => {
      return tempValsAndTolsInProg[indexElement] = indexElement === index ? {
        ...element,
        measuredVal: measuredValue,
        pass: pass
      } : element;
    })
    setValuesAndTolsInProgress(tempValsAndTolsInProg);
    checkIfEveryValueIsEntered();
  }

  function checkIfEveryValueIsEntered()
  {
    //assume that every value is entered
    let valueMissingFlag = false;

    // go throurgh every element and change flag to true if there is a measuredValue missing
    valuesAndTolsInProgress.map((element: IValuesAndTolerancesInProgress) => {
      if (!(element.measuredVal) || isNaN(element.measuredVal)) valueMissingFlag = true;
    })
    //report to parent controller
    if (!valueMissingFlag)
    {
      //call parent function with new measurements
      props.onEveryValueEntered(true, valuesAndTolsInProgress);
    }
  }

  return (
    <Table striped bordered hover>
      <thead>
      <tr>
        <th>#</th>
        <th>Zu messender Wert</th>
        <th>Toleranz</th>
        <th>Gemessenert Wert - "Enter" zum speichern (Klicke zum ändern)</th>
        <th>Pass/Fail</th>
      </tr>
      </thead>
      <tbody>
      {props.valuesAndTolerances.map((element: IValuesAndTolerances, index: number) => {
        return <InspectionPlanWorkerTableRow
          key={index}
          index={index}
          valueToBeMeasured={element.value}
          tolerance={element.tolerance}
          onValueSave={onValueSaveHandler}/>
      })}
      </tbody>
    </Table>
  )
}
