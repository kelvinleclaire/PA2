import mongoose = require('mongoose');
import { valueAndTolerancesSchema } from './valueAndTolerancesSchema'

export const inspectionplanSchema = new mongoose.Schema({
  inspectionPlanName: {
    type: String,
    required: [true, 'Inspectionplan Name is required']
  },
  pathToPlan: {
    type: String,
    required: [true, 'Values and tolerances are required']
  },
  valuesAndTolerances: {
    type: [valueAndTolerancesSchema],
    required: [true, 'Values and tolerances are required']
  },
  partNumber: {
    type: String,
    default: ''
  }
});

module.exports = inspectionplanSchema;
//export const inspectionPlan = mongoose.model('inspectionPlan', inspectionplanSchema);

