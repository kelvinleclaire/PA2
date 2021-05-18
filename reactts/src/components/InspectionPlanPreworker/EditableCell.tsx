import { useEffect, useState } from 'react'

interface IEditableCellProps {
  onSaveHandler?: (n: number) => void
  onArraySaveHandler?: (n: [number, number]) => void
  value?: number
  text?: String
  active?: boolean
  array?: [number, number]
}

export default function EditableCell(props: IEditableCellProps) {

  const [isFocused, setIsFocused] = useState(false)
  const [inputField, setInputField] = useState<[number, number]>([0, 0])

  useEffect(() => {
    console.log(props.array)
    if (props.value) setInputField([props.value, 0])
    if (props.array) setInputField([props.array[0], props.array[1]])
    if (props.active) setIsFocused(props.active)
  }, [props])

  function onClickHandler() {
    setIsFocused(true)
  }

  function onKeyDownHandler(e: any) {

    switch (e.key) {
      case 'Enter': {
        if (props.array) confirmArrayInput();
        else confirmInput();
        break;
      }
      case 'Escape': {
        abortInput();
        break;
      }
      default:
        break;
    }
  }

  function onInputValueChange(e: any, index?: number) {
    if (index === 0 || index === 1) {
      let newInput: [number, number] = [inputField[0], inputField[1]];
      newInput[index] = parseFloat(e.target.value);
      setInputField(newInput);
    } else {
      setInputField([e.target.value.replace(',', '.'), 0])
    }
  }

  function confirmInput() {
    setIsFocused(false)
    if (props.onSaveHandler) props.onSaveHandler(inputField[0]);
  }

  function confirmArrayInput() {
    setIsFocused(false)
    if (props.onArraySaveHandler) props.onArraySaveHandler(inputField);
  }

  function abortInput() {
    setIsFocused(false)
    if (props.value) setInputField([props.value, 0])
    if (props.array) setInputField(props.array)
  }

  /** Verhindert momentan noch das man die Knöpfe drücken kann.. wäre ein nice to have
  function onBlurHandler () {
    abortInput()
  }
  */

  return (
    <td onKeyDown={onKeyDownHandler}>
      {props.array
        ? <div >
          {props.text ? props.text : ''}
          {isFocused
            ?<div>
            <div className="Row">
              <input
                type="number"
                autoFocus
                onChange={(e) => onInputValueChange(e, 0)}
                placeholder={`${inputField[0]}`}
                step="0.1" />
              </div>
              <div className="Row">
              <input
                type="number"
                autoFocus
                onChange={(e) => onInputValueChange(e, 1)}
                placeholder={`${inputField[1]}`}
                step="0.1" />
              </div>
              <button onClick={abortInput}>Abbrechen</button>
              <button onClick={confirmArrayInput}>Speichern</button>
            </div>
            : <div onClick={onClickHandler}>
              {props.array.map((element: number) => {
                return <tr>{`${element}`}</tr>
              })
              }
            </div>
          }
        </div>
        :
        <div>
          {props.text ? props.text : ''}
          {isFocused
            ? <div className="Row" >
              <input
                type="number"
                min="0"
                autoFocus
                onChange={onInputValueChange}
                placeholder={`${inputField[0]}`}
                step="0.1" />
              <button onClick={abortInput}>Abbrechen</button>
              <button onClick={confirmInput}>Speichern</button>
            </div>
            : <div onClick={onClickHandler}>
              {props.value}
            </div>

          }
        </div>
      }
    {/* noch nicht gefordert, später vielleicht: isFocused ? undefined :<button onClick={onClickHandler}>Ändern</button> */}
    </td>
  )
}


