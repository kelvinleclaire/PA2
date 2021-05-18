import IInspectionPlanFromDB from './IInspectionPlanFromDB'
import IValuesAndTolerancesInProgress from './IValuesAndTolerancesInProgress'

/** Interfaces that extend the old and add the fields for measuring stuff */
export default interface IInspectionPlanInProgress extends IInspectionPlanFromDB {
  serialnumber?: string
  valuesAndTolerancesInProgress?: IValuesAndTolerancesInProgress[];
}
