import { useEffect, useState } from 'react'

import InspectionPlanWorker from "../components/InspectionPlanWorker/InspectionPlanWorker";
import IInspectionPlanFromDB from "../Models/IInspectionPlanFromDB";

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
      {plan ? <InspectionPlanWorker inspectionPlan={plan}/> : <p>Kein Plan ausgewählt</p>}
    </div>)
}

