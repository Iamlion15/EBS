import jsPDF from 'jspdf';
import Logo from '../public/static/rwandaa.png'
import { formatDate } from './ReportDateHelper';
import formatDateToCustomFormat from './dateFormatter';
import "jspdf-autotable"

const GeneratePDF = (dataa,pData) => {
  const unit = 'px';
  const size = 'A4';
  const role = "example"
  console.log(pData);
  const disclaimerText = "Authority is hereby granted by the governing body, the management authority, to operate independently."
  const username = "example"
  const orientation = 'portrait';
  const doc = new jsPDF(orientation, unit, size);
  const pageWidth = doc.internal.pageSize.getWidth();
  const imageSource = Logo.src;
  doc.addImage(imageSource, 'JPEG', 25, 10, 160, 30);
  // IDENTIFICATION OF REPORT
  const currentDate = formatDate(new Date())
  const locationText = `Kigali, ${currentDate}`;
  const fontSize = 9;
  const textWidth =
    (doc.getStringUnitWidth(locationText) * fontSize) /
    doc.internal.scaleFactor;
  const textX = pageWidth - textWidth - 35;
  doc.setFontSize(fontSize);

  // UNDERLINE
  const lineY = 55;
  const lineColor = '#CBCBCB';
  const lineWidthValue = 0.8;
  doc.setLineWidth(lineWidthValue);
  doc.setDrawColor(lineColor);
  doc.line(25, lineY, pageWidth - 25, lineY);
  // LOCATION & DATE
  doc.text(locationText, textX, 15);
  // -----------------------PAGE TITLE------------------------------------
  // TITLE
  const text = `PERIOD ${role} REPORT `;
  const uppercaseText = text.toUpperCase();
  doc.setFontSize(14);
  doc.text(uppercaseText, 25, lineY + 15);
  // LINE 2
  doc.line(25, 77, pageWidth - 25, 77);
  // DECLARATION TITLE
  doc.setFontSize(12);
  doc.text('TO WHOM IT MAY CONCERN', 25, 95);
  // TEXT
  const margin = 25;
  const maxWidth = pageWidth - 2 * margin;
  const textLines = doc.splitTextToSize(disclaimerText, maxWidth);
  doc.setFontSize(10);
  doc.text(textLines, margin, 110, {
    lineHeightFactor: 1.3,
  });

  doc.setFontSize(10);
  doc.text(
    `REPORT`,
    margin,
    145
  );
  // LINE
  doc.line(25, 155, pageWidth - 25, 155);
  // -----------------------REPORT DETAILS------------------------------------

  const startY = 170;
  const lineHeight = 15;
  let currentY = startY;
  doc.setFontSize(11);
  const printData = []
  for (let i = 0; i < dataa.length; i++) {
    const names = dataa[i].owner.firstname + " " + dataa[i].owner.lastname;
    const doc = dataa[i].document.psamples;
    const submittedOn = formatDateToCustomFormat(dataa[i].createdAt)
    // Create an object with the extracted data
    const entry = [
      i + 1,
      names,
      doc,
      submittedOn,
    ];
    console.log(entry);
    // Push the object into the printData array
    printData.push(entry);
  }

  // Auto-generate a table in the PDF using autoTable
  doc.autoTable({
    head: [['No.', 'Producer', 'Chemical Type', 'Submitted On']], // Use the first row as the table header
    body: printData, // Use the remaining rows as the table body
    startY: 180
  },

  );

  currentY += lineHeight;




  // LINE
  doc.line(25, 270, pageWidth - 25, 270);

  const applicantText = "Done by: MUYANGO TETA Bernice";
  const applicantTextWidth =
    (doc.getStringUnitWidth(applicantText) * 11) / doc.internal.scaleFactor;
  doc.setFontSize(11);
  doc.text(applicantText, 25, 284);
  // doc.text(
  //   "username,role",
  //   applicantTextWidth + 35,
  //   284
  // );
  doc.text(
    "Kigali,Rwanda",
    applicantTextWidth + 35,
    284 + 12 * 3
  );

  // -----------------------FINAL LINE------------------------------------

  doc.setDrawColor('#739900');
  doc.line(25, 380, pageWidth - 25, 380);
  // -----------------------ADDRESS TEXT------------------------------------
  const addressText =
    'KN 5 Rd, KG 9 Ave, P.O. Box 6239, Remera, Kigali, Rwanda';
  const textFontSize = 8;
  const addressTextWidth =
    (doc.getStringUnitWidth(addressText) * textFontSize) /
    doc.internal.scaleFactor;
  const addressTextX = (pageWidth - addressTextWidth) / 2;
  doc.setFontSize(textFontSize);
  doc.text(addressText, addressTextX, 404);


  doc.save('a4.pdf');
};

export default GeneratePDF;
