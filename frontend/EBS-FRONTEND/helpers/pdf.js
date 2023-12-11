import jsPDF from 'jspdf';
import Logo from '../public/images/logo3.png';
import { formatDate } from './ReportDateHelper';
import formatDateToCustomFormat from './dateFormatter';
import 'jspdf-autotable';

const GeneratePDF = (dataa, pData) => {
  const unit = 'mm';
  const size = 'a4';
  const orientation = 'portrait';
  const doc = new jsPDF(orientation, unit, size);
  const pageWidth = doc.internal.pageSize.getWidth();
  const imageSource = Logo.src;

  // Logo in the top-left corner
  doc.addImage(imageSource, 'JPEG', 15, 0, 80, 55);

  // Current Date in the top-right corner
  const currentDate = formatDate(new Date());
  const dateText = `Date: ${currentDate}`;
  const dateTextWidth = doc.getTextWidth(dateText);
  const dateTextX = pageWidth - dateTextWidth - 15;
  doc.setFontSize(9);
  doc.text(dateText, dateTextX, 25);

  // Underline
  doc.setLineWidth(0.5);
  doc.line(15, 40, pageWidth - 15, 40);

  // Page Title
  const titleText = pData.title.toUpperCase();
  doc.setFontSize(15);
  doc.text(titleText, 15, 55);

  // Separator Line
  doc.setLineWidth(0.5);
  doc.line(15, 60, pageWidth - 15, 60);

  // Declaration Title
  doc.setFontSize(12);
  doc.text('REPORTS DATA DATES', 15, 68);

  // Date Period
  const datePeriod = `START DATE: ${pData.startDate}\n\nEND DATE: ${pData.endDate}\n\n`;
  const datePeriodLines = doc.splitTextToSize(datePeriod, pageWidth - 30);
  doc.setFontSize(10);
  doc.text(datePeriodLines, 15, 75);

  // Report By
  doc.setFontSize(15);
  doc.text(`REPORT BY ${pData.role}`, 15, 90);

  // Line
  doc.setLineWidth(0.5);
  doc.setDrawColor('#2E5A88');
  doc.line(15, 95, pageWidth - 15, 95);

  // Report Details
  const startY = 105;
  const lineHeight = 15;
  let currentY = startY;

  const printData = dataa.map((data, index) => {
    const names = `${data.owner.firstname} ${data.owner.lastname}`;
    const itemName = data.item.ItemName;
    const requestedOn = formatDateToCustomFormat(data.createdAt);

    return [index + 1, itemName, names, requestedOn];
  });

  // Auto-generate a table in the PDF using autoTable
  doc.autoTable({
    head: [['No.', 'ITEM NAME', 'STAFF NAME', 'REQUESTED ON']],
    body: printData,
    startY: startY,
    margin: { top: 5, bottom: 5 }, // Reduced top and bottom margin
  });

  // Signature
  const signatureText = `Done by ${pData.role}`;
  doc.setFontSize(11);
  doc.text(signatureText, 15, doc.autoTable.previous.finalY + lineHeight);
  const signatureTextWidth = doc.getTextWidth(signatureText);
  const signatureDetailsX = 15 + signatureTextWidth + 10;
  const signatureDetails = `${pData.username}, ${pData.role}`;
  doc.text(signatureDetails, signatureDetailsX, doc.autoTable.previous.finalY + lineHeight);

  // Final Line
  doc.setDrawColor('#739900');
  doc.line(15, doc.autoTable.previous.finalY + lineHeight * 2, pageWidth - 15, doc.autoTable.previous.finalY + lineHeight * 2);

  // Address Text
  const addressText = 'KN 5 Rd, KG 9 Ave, P.O. Box 6239, Remera, Kigali, Rwanda';
  const textFontSize = 8;
  const addressTextWidth = doc.getTextWidth(addressText);
  const addressTextX = (pageWidth - addressTextWidth) / 2;

  doc.setFontSize(textFontSize);
  doc.text(addressText, addressTextX, doc.autoTable.previous.finalY + lineHeight * 3);

  // Save PDF
  doc.save('report.pdf');
};

export default GeneratePDF;
