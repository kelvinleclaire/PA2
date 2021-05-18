import { useEffect, useState } from 'react'

import IInspectionPlanFromDB from "../Models/IInspectionPlanFromDB";
import EditInspectionPlan from '../components/InspectionPlanPreworker/EditInspectionPlanFromDB'

export default function PreworkerPlanPage()
{
  const [plan, setPlan] = useState<IInspectionPlanFromDB>();

  useEffect(() => {
    try
    {
      let currentPlanString: string = window.sessionStorage.getItem("currentPlan") as string
      setPlan(JSON.parse(currentPlanString) as IInspectionPlanFromDB)
    } catch
    {
    }
  }, [1]);


  return (
    <div>
      {plan ? <EditInspectionPlan inspectionPlan={plan} /> : <p>Kein Plan ausgewählt</p>}
    </div>)
}


