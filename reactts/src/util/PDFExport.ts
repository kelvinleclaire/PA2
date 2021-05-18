/**
 * This File uses jsPDF from https://parall.ax/products/jspdf
 */
import { jsPDF } from "jspdf";
import IValuesAndTolerancesInProgress from "../Models/IValuesAndTolerancesInProgress";
import IInspectionPlanInProgress from "../Models/IInspectionPlanInProgress";

/**
 * This function generates and saves a PDF with the given parameters
 *
 * @param nameOfPdf: string - The name of the generated PDF
 * @param newLines: string[] - The lines that the pdf will contain
 * @returns true if the pdf was generated
 */
export function saveStringArrAsPDF(nameOfPdf: string, newLines: string[]): boolean
{
  // Default export is a4 paper, portrait, using millimeters for units
  const doc = new jsPDF();

  newLines.forEach((line: string, index: number) => {
    doc.text(`${line}`, 10, 10 + 10 * index);
  });

  doc.save(`${nameOfPdf}.pdf`);
  return true;
}

/**
 *
 * This Function takes the measured vals tols and meas and puts them into an array to pass them to the @function saveStringArrAsPDF to export them as a pdf.
 *
 * @param nameOfPdf The name the pdf will be saved as
 * @param inspectionPlan The inspection plan that was checked
 * @param valsAndTolsAndMeas The vales and measurements that have been measured und provided by the db
 * @param nameOfInspector the name of the inspector of the workpiece
 * @param id <optional> the id of the workpiece
 * @returns true if the pdf was sucessfully generated
 */
export function saveInspectionPlanWithMeasures(
  nameOfPdf: string,
  inspectionPlan: IInspectionPlanInProgress,
  nameOfInspector: string,
  id?: string
): boolean
{

  let strArray: string[] = new Array<string>();

  strArray.push(`Name of inspector: ${nameOfInspector}`);
  strArray.push(`Name of inspectionplan: ${inspectionPlan.inspectionPlanName}`);

  if (id) strArray.push(`Serialnumber: ${id}`);
  if (inspectionPlan.valuesAndTolerancesInProgress) {
    inspectionPlan.valuesAndTolerancesInProgress.forEach((valAndTol: IValuesAndTolerancesInProgress, index: number) => {
      strArray.push(
        `${index + 1}: Expected Value [${valAndTol.value}] ([${valAndTol.tolerance[0]} / ${valAndTol.tolerance[1]} ]) -> Measured: [${valAndTol.measuredVal}] -> Check ${valAndTol.pass ? 'passed' : 'failed'}`
      );
    });
  }
  return saveStringArrAsPDF(nameOfPdf, strArray);
}
