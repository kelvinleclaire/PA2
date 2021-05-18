import IValueAndTolerance from './IValueAndTolerance'

export default interface IInspectionPlan
{
  inspectionPlanName: String,
  pathToPlan: String,
  valuesAndTolerances: IValueAndTolerance[];
  partNumber?: String
};
