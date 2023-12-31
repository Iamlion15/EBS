import jsPDF from 'jspdf';
import Logo from '../public/images/logo3.png';
import { formatDate } from './ReportDateHelper';
import formatDateToCustomFormat from './dateFormatter';
import 'jspdf-autotable';

const VendorReportPDF = (dataa,pData) => {
  new jsPDF();
  const unit = 'mm';
  const size = 'a3';
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
  const titleText = "VENDOR REPORT";
  doc.setFontSize(15);
  doc.text(titleText, 15, 55);
  
  doc.setLineWidth(0.5);
  doc.setDrawColor('#2E5A88');
  doc.line(15, 95, pageWidth - 15, 95);

  // Report Details
  const startY = 65;
  const lineHeight = 15;
  let currentY = startY;

  const printData = dataa.map((data, index) => {
    const names = `${data.firstname} ${data.lastname}`;
    const phone = data.phone
    const email=data.email
    const contracteStartedOn=formatDateToCustomFormat(data.contract.startDate)
    const contracteEndOn=formatDateToCustomFormat(data.contract.endDate)

    return [index + 1, names, phone, email,contracteStartedOn,contracteEndOn];
  });

doc.autoTable({
  head: [['No.', 'VENDOR NAMES','VENDOR PHONE','VENDOR EMAIL', 'CONTRACT STARTED ON', 'CONTRACT END ON']],
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
  const signatureText = `Done by EBS DEPARTMENT`;
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
  doc.save(`vendor report effective on${currentDate}.pdf`);
};

export default VendorReportPDF;
