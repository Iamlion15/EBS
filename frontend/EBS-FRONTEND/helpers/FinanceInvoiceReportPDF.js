import jsPDF from 'jspdf';
import Logo from '../public/images/logo3.png';
import { formatDate } from './ReportDateHelper';
import formatDateToCustomFormat from './dateFormatter';
import 'jspdf-autotable';

const FinanceInvoiceGeneratePDF = (dataa,pData) => {
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
  const titleText = "PERIOD INVOICE REPORT";
  doc.setFontSize(15);
  doc.text(titleText, 15, 55);

  // Separator Line
  doc.setLineWidth(0.5);
  doc.line(15, 60, pageWidth - 15, 60);

  // Date Period
  const datePeriod = `START DATE: ${pData.startDate}\n\nEND DATE: ${pData.endDate}\n\n`;
  const datePeriodLines = doc.splitTextToSize(datePeriod, pageWidth - 30);
  doc.setFontSize(13);
  doc.text(datePeriodLines, 15, 75);

  // Line
  doc.setLineWidth(0.5);
  doc.setDrawColor('#2E5A88');
  doc.line(15, 95, pageWidth - 15, 95);

  // Report Details
  const startY = 105;
  const lineHeight = 15;
  let currentY = startY;

  const printData = dataa.map((data, index) => {
    const itemName = data.vendoritem.itemName;
    const names = `${data.requestedBy.firstname} ${data.requestedBy.lastname}`;
    const payedOn = formatDateToCustomFormat(data.createdAt);
    const amountPayed=data.vendoritem.itemPrice

    return [index + 1, itemName, names, payedOn,amountPayed];
  });
  // Define a custom style for the total row
  const totalAmount = dataa.reduce((total, data) => total + Number(data.vendoritem.itemPrice), 0);

 // Define a custom style for the total row
const totalRowStyle = { fontStyle: 'bold', fillColor: [204, 204, 204], textColor: [0, 0, 0] };
// Add the total row to printData with the specified style
//const totalRow = ["Total Amount:", "", "", "", totalAmount+"RWF"];
const totalRow = [{ content: "Total Amount:", styles: totalRowStyle }, "", "", "", totalAmount+" RWF"];
printData.push(totalRow);

// Auto-generate a table in the PDF using autoTable with the custom styles
doc.autoTable({
  head: [['No.', 'ITEM NAME', 'STAFF WHO REQUESTED IT', 'PAYED ON', 'AMOUNT PAYED']],
  body: printData,
  startY: startY,
  margin: { top: 5, bottom: 5 }, // Reduced top and bottom margin
  styles: { cellWidth: 'wrap', halign: 'center', valign: 'middle', overflow: 'linebreak' }, // Adjust styling options
  headStyles: { fillColor: [0, 51, 102], textColor: [255, 255, 255] }, // Header row styling
  bodyStyles: { textColor: [0, 0, 0] }, // Body row styling
  alternateRowStyles: { fillColor: [245, 245, 245] }, // Alternate row styling
  columnStyles: { 4: { halign: 'right' } }, // Align text to the right for the 'AMOUNT PAYED' column
});


  // Signature
  const signatureText = `Done by FINANCE`;
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
  doc.save(`Invoice_report_on_${currentDate}.pdf`);
};

export default FinanceInvoiceGeneratePDF;
