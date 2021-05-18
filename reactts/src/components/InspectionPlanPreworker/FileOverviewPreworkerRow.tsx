import IInspectionPlanFromDB from "../../Models/IInspectionPlanFromDB";

interface IFileOverviewPreworkerRowProps{
  inspectionPlan: IInspectionPlanFromDB
  index: number
  onClickHandler:(plan: IInspectionPlanFromDB) => void
}

export default function FileOverviewPreworkerRow(props: IFileOverviewPreworkerRowProps) {
  return (
    <tr>
      <td>{props.inspectionPlan.inspectionPlanName}</td>
      <td>{props.index}</td>
      <td><button onClick={() => props.onClickHandler(props.inspectionPlan)}>Prüfplan bearbeiten</button></td>
    </tr>
  )
}
