const inspectionPlanRouter = require("express").Router();
import { receiveInspectionPlans, uploadInspectionplan, updateInspectionPlan } from "../helpers/dbConnectionPlan";
import IInspectionPlan from "../models/IInspectionPlan";
import IValueAndTolerance from "../models/IValueAndTolerance";
import { isIValueAndTolerance } from "../helpers/typeValidation";
import { planUpload } from "../helpers/multerConfig";

import fs from "fs";
import mongoose = require('mongoose');

//Default incoming route for /plans/
inspectionPlanRouter.get("/", (request: any, response: any) =>
{
  response.send(`Welcome to inspectionPlanApi`);
});

// get inspection plans that are stored in the database
inspectionPlanRouter.get("/receive", (request: any, response: any) =>
{
  //TODO add filters
  receiveInspectionPlans((plans: IInspectionPlan[]) =>
  {
    response.json(plans);
  });
});

/**
 * expects a form-data field for file upload with the name @param file_upload
 */
inspectionPlanRouter.post("/uploadFile", planUpload.single("file_upload"), (request: any, response: any) =>
{
  let data = request.body;

  if (!request.file)
    return response.status(400).json({ message: "no file was sent with file_upload" });
  fs.readFile(request.file.path, "utf8", (err, res) =>
  {
    if (err) {
      response.json({ message: "Error at reading uploaded file" });
    } else {

      try {
        let tempPlan = translateToInspectionPlan(data.inspectionPlanName, data.inspectionPlanID, res, request.file.path)
        if (tempPlan) {
          uploadInspectionplan(tempPlan, (doc: mongoose.Document ) => {
            response.json({ message: "file uploaded", doc});
          });

        } else {
          response.status(400).json({ message: "inspectionPlanName in file is missing" });
        }
      } catch (e: any) {
        fs.unlink(request.file.path,() => {
          response.json({ message: "file upload failed", error: e });
        })
      }
    }

  });
});

inspectionPlanRouter.post("/updatePlan", (request: any, response: any) =>{
  try {
    let inspectionPlanToUpdate: IInspectionPlan = request.body.inspectionPlan;
    updateInspectionPlan(request.body.inspectionPlan._id, inspectionPlanToUpdate, (savedDoc: any) => {
      response.json({message: 'updated sucessfully', savedDoc});
    });
  } catch (e) {
    console.log('Error while updating plan')
  }
});

function translateToInspectionPlan(
  planName: string,
  planID: string,
  fileText: string,
  pathToPlan: String
): IInspectionPlan | undefined {

  let parsedText = JSON.parse(fileText);

  if (!parsedText.inspectionPlanName) return undefined;

  //check ob gültüger kram im txt steht
  if (isIValueAndTolerance(parsedText.valuesAndTolerances)) {
    //TODO: Cheat entfernen (Erst initialisieren und dann poppen? Muss cleaner gehen)
    let tempValsAndTols: [IValueAndTolerance] = [{ value: 0, tolerance: [0,0] }];
    tempValsAndTols.pop();

    //export values to readable array of type IValueAndTolerance
    parsedText.valuesAndTolerances.forEach((element: any) =>
    {
      console.log('this es the el', element)
      tempValsAndTols.push({
        value: element.value,
        tolerance: [element.tolerance[0], element.tolerance[1]],
      });
    });

    //Create inspectionplan from data
    const tempPlan: IInspectionPlan =
    {
      inspectionPlanName: parsedText.inspectionPlanName,
      pathToPlan: pathToPlan,
      valuesAndTolerances: tempValsAndTols,
    };


    return tempPlan;
  } else {
    return undefined;
  }
}

module.exports = inspectionPlanRouter;
