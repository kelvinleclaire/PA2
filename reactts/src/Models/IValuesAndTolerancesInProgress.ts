import IValuesAndTolerances from './IValueAndTolerance'

/** Interfaces that extend the old and add the fields for measuring stuff */
export default interface IValuesAndTolerancesInProgress extends IValuesAndTolerances {
  measuredVal?: number
  pass?: boolean
}
