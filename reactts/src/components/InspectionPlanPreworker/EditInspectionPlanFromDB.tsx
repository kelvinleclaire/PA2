import IInspectionPlanFromDB from "../../Models/IInspectionPlanFromDB";
import IValueAndTolerance from "../../Models/IValueAndTolerance";

import {updateInspectionPlan} from '../../util/BackendCommunication'

import Table from 'react-bootstrap/Table';
import EditInspectionPlanFromDBRow from './EditInspectionPlanFromDBRow'
import AddNewValuesToInspectionPlan from './AddNewValuesToInspectionPlan'
import { useEffect, useState } from "react";

import ChangeDetails from './ChangeDetails'

interface IEditInspectionPlanFromDBProps {
  inspectionPlan: IInspectionPlanFromDB
}

export default function EditInspectionPlanFromDB(props: IEditInspectionPlanFromDBProps) {

  const [inspectionPlan, setinspectionPlan] = useState<IInspectionPlanFromDB>()

  useEffect(() => {
    setinspectionPlan(props.inspectionPlan)
  }, [props.inspectionPlan])

  function onValueUpdated(newValueArray: IValueAndTolerance[]) {
    if (!inspectionPlan) return
    let newInspectionPlan:IInspectionPlanFromDB = {
      ...inspectionPlan,
      valuesAndTolerances: newValueArray
    };
    setinspectionPlan(newInspectionPlan)
  }

  function onValuesAdded(newValues: IValueAndTolerance) {
    if (!inspectionPlan) return

    let newTempsAndVals = inspectionPlan.valuesAndTolerances
    newTempsAndVals.push(newValues)

    let newInspectionPlan = {
      ...inspectionPlan,
      valuesAndTolerances: newTempsAndVals
    };
    setinspectionPlan(newInspectionPlan)
  }


  function addValuesToArray(v: number, t: [number, number]) {
    let newValsAndTols: IValueAndTolerance = {
      value: v,
      tolerance: [t[0], t[1]]
    };
    onValuesAdded(newValsAndTols)
  }

  function onValueUpdateHandler(n: number, index: number) {
    if (inspectionPlan) {
    let newValuesArray = [...inspectionPlan.valuesAndTolerances];
    newValuesArray.map((element: IValueAndTolerance, indexElement: number) => {
      return newValuesArray[indexElement] = indexElement === index ? {
        ...element,
        value: n
      } : element;
    })
    onValueUpdated(newValuesArray)
   }
  }

  function onToleranceUpdateHandler(n: [number, number], index: number) {
    if (inspectionPlan) {
      let newValuesArray = [...inspectionPlan.valuesAndTolerances];
      newValuesArray.map((element: IValueAndTolerance, indexElement: number) => {
        return newValuesArray[indexElement] = indexElement === index ? {
          ...element,
          tolerance: n
        } : element;
      })
      onValueUpdated(newValuesArray)
    }
  }

  function saveToDB() {
    if (inspectionPlan)
    updateInspectionPlan(inspectionPlan, (response: any) => {
      window.sessionStorage.setItem(
        "currentPlan",
        JSON.stringify(inspectionPlan)
      )
      console.log(response)
    })
  }

  function changeNameHandler(name: string) {
    if (!inspectionPlan) return
    let newInspectionPlan = {
      ...inspectionPlan,
      inspectionPlanName: name
    };
    setinspectionPlan(newInspectionPlan)
  }

  function partNumberChangeHandler(partNumber: string) {
    if (!inspectionPlan) return
    let newInspectionPlan = {
      ...inspectionPlan,
      partNumber: partNumber
    };
    setinspectionPlan(newInspectionPlan)
  }


  return (
    <div>
      <h1>{inspectionPlan?.inspectionPlanName}</h1>
      <ChangeDetails
      name={inspectionPlan?.inspectionPlanName}
      partNumber={inspectionPlan?.partNumber}
      onNameChange={changeNameHandler}
      onPartNumberChange={partNumberChangeHandler} />
      <Table striped bordered hover>
      <thead>
      <tr>
        <th>#</th>
        <th>Zu messender Wert</th>
        <th>Toleranz</th>
      </tr>
      </thead>
      <tbody>
      {inspectionPlan ? inspectionPlan.valuesAndTolerances.map((element: IValueAndTolerance, index: number) => {
        return <EditInspectionPlanFromDBRow
         valsAndTols={element}
         index={index}
         onValueUpdate={onValueUpdateHandler}
         onToleranceUpdate={onToleranceUpdateHandler}/>
      }): undefined}
      <AddNewValuesToInspectionPlan onSaveHandler={(v: number, t: [number, number]) => addValuesToArray(v,t)}/>
      </tbody>
    </Table>
    <button onClick={saveToDB}>Update Plan</button>
    </div>
  )
}
