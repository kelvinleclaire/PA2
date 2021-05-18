import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import IInspectionPlan from '../Models/IInspectionPlan';
import IInspectionPlanFromDB from '../Models/IInspectionPlanFromDB';
import { uploadFileToBackend } from '../util/BackendCommunication'

interface IFileUploadProps{
  onFileUploadedToBackend: (inspectionPlanFromDB: IInspectionPlanFromDB) => void
}

function FileUpload(props: IFileUploadProps)
{

  const [uploadedFile, setUploadedFile] = useState<File>();
  const [fileIdInput, setfileIdInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [feedbackMessage, setfeedbackMessage] = useState('')

  function onChangeHandler(e: any)
  {
    setfeedbackMessage('');
    setUploadedFile(e.target.files[0]);
  }

  // Bearbeitung abschließen
  function onUploadConfirm(e: any)
  {
    e.preventDefault();
    //Check if there is an uploaded file
    if (uploadedFile !== undefined)
    {

      //File for backend communication
      const inspectionPlan: IInspectionPlan =
        {
          file: uploadedFile,
          name: nameInput,
          id: fileIdInput
        }

      if (uploadFileToBackend(inspectionPlan, (response: any) => { props.onFileUploadedToBackend(response.data.doc)}))
      {
        setfeedbackMessage(uploadedFile.name + ' has been uploaded');
      } else
      {
        setfeedbackMessage(uploadedFile.name + '  \'s Upload failed!');
      }

    } else
    {
      setfeedbackMessage('File could not be read');
    }


  }

  return (
    <div className="input-group mb-3">
      <Form onSubmit={onUploadConfirm}>
        <div>
          <Form.Group controlId="formBasicFile" id="formInput">
            <Form.Control type="file"
                          onChange={onChangeHandler}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Bestätigen
          </Button>
        </div>
        <div>
          <span>{feedbackMessage}</span>
        </div>
      </Form>
    </div>
  )

}

export default FileUpload;

