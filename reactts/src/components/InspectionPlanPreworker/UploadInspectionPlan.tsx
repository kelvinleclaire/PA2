import FileUpload from '../../components/FileUpload';
import {useState} from 'react'
import IInspectionPlanFromDB from '../../Models/IInspectionPlanFromDB';
import EditInspectionPlanFromDB from './EditInspectionPlanFromDB'

export default function UploadInspectionPlan() {

  const [inspectionPlanFromDB, setinspectionPlanFromDB] = useState<IInspectionPlanFromDB>()

  return (
    <div>
    {inspectionPlanFromDB
    ? <EditInspectionPlanFromDB
    inspectionPlan={inspectionPlanFromDB} />
    : <FileUpload
    onFileUploadedToBackend={(doc: IInspectionPlanFromDB) => setinspectionPlanFromDB(doc)} />
    }
    </div>
  )
}


