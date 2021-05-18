import mongoose = require('mongoose');

export const valueAndTolerancesSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: [true, 'value is required']
  },
  tolerance: {
    type: [Number, Number],
    required: [true, 'tolerance is required']
  }
})
export const valuesAndTolerances = mongoose.model('valueAndTolerances', valueAndTolerancesSchema);
