import { useEffect, useState } from 'react'
import './modal.css'

interface IModalProps {
  children: React.ReactNode
  showConfirmButton?: boolean
  onModalConfirm?: () => void
  onModalAbort?: () => void
  showModal?: boolean
}

export default function Modal(props: IModalProps) {

  const [display, setDisplay] = useState(true)

  useEffect(() => {
    if (props.showModal) setDisplay(props.showModal)
  }, [props.showModal])

  return (
    <div className={`${display ? "display-block" : "display-none"} modal `}>
      <div >
        {props.children}
        <div className="modal-buttons">
          <button onClick={() => {
            if (props.onModalAbort) props.onModalAbort();
            }}>Zurück</button>
          {props.onModalConfirm ? <button onClick={() => props.onModalConfirm ? props.onModalConfirm() : undefined}>Speichern</button> : undefined }
        </div>
      </div>
    </div>
  )

}

