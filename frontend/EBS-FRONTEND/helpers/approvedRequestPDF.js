import jsPDF from 'jspdf';
import Logo from '../public/images/logo3.png';
import { formatDate } from './ReportDateHelper';
import formatDateToCustomFormat from './dateFormatter';
import 'jspdf-autotable';

const ApprovedRequestPDF = (data,names) => {
  new jsPDF();
  const unit = 'mm';
  const size = 'a4';
  const orientation = 'portrait';
  const doc = new jsPDF(orientation, unit, size);
  const pageWidth = doc.internal.pageSize.getWidth();
  const imageSource = Logo.src;
  doc.setFont('CopperplateGothic', 'normal');

  // Logo in the top-left corner
  doc.addImage(imageSource, 'JPEG', 15, 0, 80, 55);

  // Current Date in the top-right corner
  const currentDate = formatDate(new Date());
  const dateText = `Date: ${currentDate}`;
  const dateTextWidth = doc.getTextWidth(dateText);
  const dateTextX = pageWidth - dateTextWidth - 15;
  doc.setFontSize(15);
  doc.text(dateText, dateTextX, 25);

  // Underline
  doc.setLineWidth(0.5);
  doc.line(15, 40, pageWidth - 15, 40);

  // Page Title
  const titleText = "ITEM REQUEST APPROVAL REPORT";
  doc.setFontSize(15);
  doc.text(titleText, 15, 55);

  // Separator Line
  doc.setLineWidth(0.5);
  doc.line(15, 60, pageWidth - 15, 60);

  // Date Period
  const datePeriod = `Staff Names: ${names}`;
    const datePeriodLines = doc.splitTextToSize(datePeriod, pageWidth - 30);
    doc.setFontSize(13);
    doc.text(datePeriodLines, 15, 75);

  // Line
  doc.setLineWidth(0.5);
  doc.setDrawColor('#2E5A88');
  doc.line(15, 95, pageWidth - 15, 95);

  // Report Details
  const startY = 85;
  const lineHeight = 15;
  let currentY = startY;

  const printData = [];
  printData.push(["Staff names",data.owner.firstname+" "+data.owner.lastname])
  printData.push(["Item requested",data.item.ItemName])
  printData.push(["Item type",data.item.itemType])
  printData.push(["Status","Request Approved"])
  printData.push(["Requested on",formatDateToCustomFormat(data.createdAt)])
  printData.push(["Approved on",formatDateToCustomFormat(data.Finance_Approval.timeOfApproval)])
  printData.push(["assigned item",data.vendoritem.itemName])
  printData.push(["cost of the item",data.vendoritem.itemPrice+" RWF"])
  
  doc.autoTable({
    head: [["STAFF REQUEST ITEM APPROVAL REPORT"]],
    startY: startY,
    margin: { top: 5, bottom: 5 },
    styles: { cellWidth: 'wrap', halign: 'center', valign: 'middle', overflow: 'linebreak' },
    headStyles: { fillColor: [0, 51, 102], textColor: [255, 255, 255] },
  });

  doc.autoTable({
    body: printData,
    startY: startY+12,
    margin: { top: 5, bottom: 5 },
    styles: { cellWidth: 'wrap', halign: 'center', valign: 'middle', overflow: 'linebreak' },
    headStyles: { fillColor: [0, 51, 102], textColor: [255, 255, 255] },
    bodyStyles: { textColor: [0, 0, 0] },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    columnStyles: { 0: { halign: 'right' } },
  });


  // Signature
  const signatureText = `© ENTERPISE BUSINESS SERVICE MANAGEMENT`;
  doc.setFontSize(11);
  doc.text(signatureText, 15, doc.autoTable.previous.finalY + lineHeight);

  // Final Line
  doc.setDrawColor('#739900');
  doc.line(15, doc.autoTable.previous.finalY + lineHeight * 2, pageWidth - 15, doc.autoTable.previous.finalY + lineHeight * 2);

  // Address Text
  const addressText = 'KN 25 Rd, KG 1 Ave, P.O. Box 1111, Nyarugenge, Kigali, Rwanda';
  const textFontSize = 8;
  const addressTextWidth = doc.getTextWidth(addressText);
  const addressTextX = (pageWidth - addressTextWidth) / 2;

  doc.setFontSize(textFontSize);
  doc.text(addressText, addressTextX, doc.autoTable.previous.finalY + lineHeight * 3);

  // Save PDF
  doc.save(`vendor item report effective on${currentDate}.pdf`);
};

export default ApprovedRequestPDF;
