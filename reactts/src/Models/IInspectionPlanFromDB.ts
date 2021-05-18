import IValueAndTolerance from './IValueAndTolerance'

export default interface IInspectionPlanFromDB
{
  inspectionPlanName: string,
  pathToPlan: string,
  valuesAndTolerances: IValueAndTolerance[];
  partNumber?: string
};
