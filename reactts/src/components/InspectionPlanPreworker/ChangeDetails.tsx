import { useState } from "react"

interface IChageDetailsProps{
  name: string | undefined ,
  partNumber?: string | undefined,
  onNameChange: (s: string) => void;
  onPartNumberChange: (s: string) => void;
}

export default function ChangeDetails(props: IChageDetailsProps) {

  const [partNumberChanging, setpartNumberChanging] = useState(false)
  const [nameChanging, setnameChanging] = useState(false)

  const [nameInput, setnameInput] = useState<string>()
  const [partNumberInput, setpartNumberInput] = useState<string>()

  function partNumberSaveHandler() {
    if (partNumberInput) props.onPartNumberChange(partNumberInput)
    setpartNumberChanging(false);
  }

  function onChangeNameSaveHandler() {
    if (nameInput) props.onNameChange(nameInput)
    setnameChanging(false)
  }

  return (
    <div>
      <div>
        <p>Name: {props.name}</p>
        {nameChanging
        ?<div><input placeholder={props.name} onChange={(e:any) => {setnameInput(e.target.value)}}/><button onClick={onChangeNameSaveHandler}>Speichern</button></div>
        : <button onClick={() => setnameChanging(!nameChanging)}>Namen ändern</button>
        }
      </div>

      <div>
        {props.partNumber && !partNumberChanging
        ? <div>
          <p>Teile-Nummer:{props.partNumber}</p>
          <button onClick={() => setpartNumberChanging(true)}>Teile-Nummer ändern</button>
        </div>
        : <div>
            {partNumberChanging
            ? <div>
              <span>Teile-Nummer eingeben:</span>
              <input placeholder={props.partNumber} onChange={(e: any) => setpartNumberInput(e.target.value)}/>
              <button onClick={partNumberSaveHandler}>Speichern</button></div>
            : <button onClick={() => setpartNumberChanging(true)}>Teile-Nummer hinzufügen</button>
            }
          </div>
        }
      </div>
    </div>
  )
}
