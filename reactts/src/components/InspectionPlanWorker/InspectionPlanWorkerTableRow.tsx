import { useEffect, useState } from 'react'
import ReadOnlyInput from './ReadOnlyInput'
import IconDisplay from './IconDisplay'


interface IInspectionPlanWorkerTableRowProps {
  index: number
  valueToBeMeasured: number,
  tolerance: [number,number],
  onValueSave: (index: number, measuredValue: number, pass: boolean) => void
}

export default function InspectionPlanWorkerTableRow(props: IInspectionPlanWorkerTableRowProps)
{

  const [enteredValue, setenteredValue] = useState<number>();
  const [numberEntered, setNumberEntered] = useState(false);

  const [passfail, setPassfail] = useState<boolean>()
  const [passfailDisplayText, setPassfailDisplayText] = useState('');


  useEffect(() =>
  {
    if (enteredValue && (passfail !== undefined)) props.onValueSave(props.index, enteredValue, passfail);
  }, [enteredValue, passfail, props]);

  function onEnterHandler(input: string)
  {
    let inputSanitized = input.replace(',', '.')
    let parsedInput = parseFloat(inputSanitized);
    if (!isNaN(parsedInput))
    {
      let parseTolerance = calculateTolerance(parsedInput, props.tolerance, props.valueToBeMeasured)

      //TODO pack in eine funktion
      setPassfail(parseTolerance);
      setPassfailDisplayText( parseTolerance ? 'pass' : 'fail')

      setenteredValue(parsedInput);
      setNumberEntered(true);
    }
  }

  function handleChangeEnteredValue(e: any)
  {
    setNumberEntered(false);
  }

  function calculateTolerance(valueMeasured: number, tolerance: [number,number], valueToBeMeasured: number): boolean {
    let b: boolean = true;
    let upperLimit = valueToBeMeasured + tolerance[0];
    let lowerLimit = valueToBeMeasured + tolerance[1];
    if (valueMeasured < lowerLimit || valueMeasured > upperLimit) b = false;
    return b
  }



  return (
    <tr>
      <td>{props.index}</td>
      <td>{props.valueToBeMeasured} mm</td>
      <td>
        <tr><td>{props.tolerance[0]} mm</td></tr>
        <tr><td>{props.tolerance[1]} mm</td></tr>
      </td>
      <td onClick={handleChangeEnteredValue} className="align-middle">
        {!numberEntered
          ? <ReadOnlyInput confirmInputKey="Enter" onConfirmInput={onEnterHandler}
                           value={enteredValue ? enteredValue.toString() : undefined}/>
          : <span> {enteredValue} mm</span>
        } </td>
      <td> {passfailDisplayText ? <div className="row justify-content-center"> <IconDisplay  icon={passfailDisplayText} /> {passfailDisplayText}</div>: ' - ' }</td>
    </tr>
  )
}


