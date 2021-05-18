import { useState } from 'react'

interface IReadOnlyInputProps {
  onConfirmInput: (value: string) => void
  confirmInputKey: string
  value?: string | undefined
}

/**
 * This component prevents they keyboard to pop up while using a tablet or any other mobile device. When this component is focused, it registers
 * keystrokes and displays them in the input field. The Backspace key is reserved to delete the last keystroke.
 *
 * @param confirmInputKey: The key that triggers the end of the keyboard input
 * @param onConfirmInput: the function that receives the Input since the last confirm or an empty string if nothing was entered
 * @returns a input field that can only be manipulated through keystrokes when it is focused
 */
export default function ReadOnlyInput(props: IReadOnlyInputProps)
{

  const [keyboardInput, setKeyBoardInput] = useState('');

  function onEnterHandler(e: any)
  {

    let pressedkey = e.key;

    switch (pressedkey)
    {
      case props.confirmInputKey:
      {
        if (!keyboardInput && props.value)
        {
          props.onConfirmInput(props.value)
        } else
        {
          props.onConfirmInput(keyboardInput);
        }
        setKeyBoardInput('');
        break;
      }
      case 'Backspace':
      {
        setKeyBoardInput(keyboardInput.slice(0, -1));
        break;
      }
      default:
      {
        // Check if key is number, ',', '+' or '-' to prevent unwanted inputs
        const regex = /[\d,\+\-]/g;
        if (regex.test(pressedkey)) setKeyBoardInput(`${keyboardInput + pressedkey}`);
        break;
      }
    }
  }

  return (
    <input autoFocus value={keyboardInput} readOnly onKeyDown={onEnterHandler} type="text"
           className="w-100 h-100"
           placeholder={props.value ? props.value + " (Bitte neuen Wert messen)" : "Hier drücken um Wert einzutragen"}/>
  )
}
