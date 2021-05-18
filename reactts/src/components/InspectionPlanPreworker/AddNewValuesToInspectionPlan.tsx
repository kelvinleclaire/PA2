import { useState } from "react"
import Modal from './Modal'

interface IAddNewValuesToInspectionPlanProps {
  onSaveHandler: (v: number, t:[number, number]) => void,
}

export default function AddNewValuesToInspectionPlan(props: IAddNewValuesToInspectionPlanProps) {

  const [addNewRowActive, setAddNewRowActive] = useState(false)
  const [newValue, setNewValue] = useState<number | undefined>()
  const [newTolerance, setNewTolerance] = useState<[number, number] | undefined>()
  const [errorMessage, setErrorMessage] = useState<string>()

  function onClickHandler() {
    setAddNewRowActive(true)
  }

  function onSaveNewValues() {
    if (newValue && newTolerance) {
      props.onSaveHandler(newValue, newTolerance);
      resetAddingNewValues();
    }


  }

  function resetAddingNewValues() {
    setNewValue(undefined)
    setNewTolerance(undefined)
    setAddNewRowActive(false)
  }

  function onToleranceInputChange(n:number , i: number) {
    //start by declaring defaults
    let newVal: [number, number] = [0, 0]
    if (newTolerance && newTolerance[0]) newVal[0] = newTolerance[0];
    if (newTolerance && newTolerance[1]) newVal[1] = newTolerance[1];
    newVal[i] = n

    // check if tolerance is ok
    if ((newValue && i === 0 && newVal[0] < 0) || (newValue && i === 1 && newVal[1] > 0)) {
      setErrorMessage('Toleranzen nicht richtig angegeben (Obere toleranz muss größer als 0 und untere Toleranz kleiner 0)');
    } else {
      setErrorMessage(undefined)
      setNewTolerance(newVal)
    };


  }


  return (
  <tr className="justify-content-center">
    <td colSpan={3}><button onClick={onClickHandler}>Add new Row</button></td>
    <div>
  {addNewRowActive
    ?
      <Modal showModal={addNewRowActive} onModalAbort={() => resetAddingNewValues()} onModalConfirm={errorMessage ? () => alert(errorMessage) : onSaveNewValues }>
        <div className="justify-content-center text-align ">
          <h4 className="text-center">Neuen Wert + Toleranz hinzufügen:</h4>
          <div >
            <div >
              <span>Neuer Wert: </span>
              <input onChange={(e: any) => setNewValue(e.target.value)} type="number" placeholder="Wert" step="0.1"/>
            </div>
            {newValue?
            <div>
              <span>Toleranz: </span>
              <input onChange={(e: any) => onToleranceInputChange(e.target.value, 0)} type="number" value={newTolerance && newTolerance[0] ? newTolerance[0] : undefined} placeholder="Obere Toleranz" step="0.1"/>
              <input onChange={(e: any) => onToleranceInputChange(e.target.value, 1)} type="number" value={newTolerance && newTolerance[1] ? newTolerance[1] : undefined} placeholder="Untere Toleranz" step="0.1"/>
            </div>
            : <span />}
          </div>
        </div>
      <span>{errorMessage? errorMessage : undefined}</span>
      </Modal>
    : undefined
  }
  </div>
  </tr>
  )
}

