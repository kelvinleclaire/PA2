import mongoose = require('mongoose');

import IInspectionPlan from '../models/IInspectionPlan'
import { valuesAndTolerances } from '../schema/valueAndTolerancesSchema';

const inspectionplanSchema = require('../schema/inspectionplanSchema');

//database plans connection
const dbConnPlans = mongoose.createConnection(`mongodb+srv://admin:hZbn3ukvVxAAqZ7d@cluster0.jkxmh.mongodb.net/inspectionPlanDB?retryWrites=true&w=majority`, {useNewUrlParser: true,useUnifiedTopology: true })
dbConnPlans.on('error', console.error.bind(console, 'plan db connection error:'));
dbConnPlans.once('open', function() {
  console.log('Connected to plans Database');
});

//initialise schemas for dbConnPlans
export const inspectionplan = dbConnPlans.model('inspectionplan', inspectionplanSchema);

// TODO: vielleicht eigene datei dafür:
export function uploadInspectionplan(insplan: IInspectionPlan, cb: Function): mongoose.Document | undefined {
  const tempInspectionPlan = new inspectionplan(insplan)
  tempInspectionPlan.save(function(err: any, doc: any) {
    if (err) return console.log(err)
    console.log('Plan saved succesfully')
    return cb(doc);
  })
  return undefined;
}

export function updateInspectionPlan(_id: string ,inspection: IInspectionPlan, cb: Function) {
  const tempInspectionPlan = new inspectionplan(inspection)
  console.log(tempInspectionPlan)
  inspectionplan.findById(_id, (err: any, doc: any) =>{
    if (err) return console.log(err)
    if (inspection.partNumber) doc.partNumber = inspection.partNumber;
    doc.inspectionPlanName = inspection.inspectionPlanName;
    doc.valuesAndTolerances = inspection.valuesAndTolerances;
    doc.save(function(err: any, doc: any) {
      if (err) console.log(err)
      else cb(doc)
    });
  });
}

// TODO: vielleicht eigene datei dafür:
export function receiveInspectionPlans(callback: Function, filter?: String) {
  if (filter) {
    inspectionplan.find({ name: `/^${filter}/`}, (err, plans) => {
      if (err) return console.error(err);
      callback(plans)
    });
  } else {
    inspectionplan.find( function(err, iPlan ) {
      if (err) return console.error(err);
      callback(iPlan);
    })
  }
}



