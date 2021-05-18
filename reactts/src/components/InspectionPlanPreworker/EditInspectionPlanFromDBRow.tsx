import { useEffect, useState } from "react";
import IValueAndTolerance from "../../Models/IValueAndTolerance";
import EditableCell from './EditableCell'

interface IEditInspectionPlanFromDBRowProps {
  valsAndTols: IValueAndTolerance
  index: number
  onValueUpdate: (n: number, i: number) => void
  onToleranceUpdate: (n: [number, number], i: number) => void
}

export default function EditInspectionPlanFromDBRow (props: IEditInspectionPlanFromDBRowProps) {

  const [value, setValue] = useState<number>(0);
  const [tolerance, setTolerance] = useState<[number, number]>([0,0])


  useEffect(() => {
    setValue(props.valsAndTols.value);
    setTolerance(props.valsAndTols.tolerance)
  }, [1])

  function onToleranceSaveHandler(n: [number,number]) {
    if (n[0] < 0 || n[1] > 0) {
      alert('Fehler beim speichern der Toleranzen: Obere Toleranz muss größer 0 sein und untere Toleranz muss kleiner als 0 sein')
    } else {
      setTolerance(n)
      props.onToleranceUpdate(n, props.index)
    }
  }

  function onValueSaveHandler(n: number) {
    setValue(n)
    props.onValueUpdate(n, props.index)

  }

  return (
    <tr>
      <td>{props.index}</td>
      <EditableCell value={value} onSaveHandler={onValueSaveHandler}></EditableCell>
      <EditableCell array={tolerance} onArraySaveHandler={onToleranceSaveHandler}></EditableCell>
    </tr>
  )
}
