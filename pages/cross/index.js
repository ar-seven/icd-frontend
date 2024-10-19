import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import { jsPDF } from "jspdf";
import 'jspdf-autotable'; // Import the autotable plugin
const Billing = () => {
  const [billingData, setBillingData] = useState(null);

  useEffect(() => {
    const cross = localStorage.getItem('cross');
    const result = JSON.parse(cross);
    const second = JSON.parse(result)

    console.log(second); 
    setBillingData(second);
  }, []);

  // Function to generate PDF report
  const generateReport = () => {
    const doc = new jsPDF();
    
    // Set background color
    doc.setFillColor(240, 240, 240);
    doc.rect(0, 0, 210, 297, 'F');
    
    // Add logo
    const logo = new Image();
    logo.src = 'https://media.istockphoto.com/id/1624291952/vector/medical-health-logo-design-illustration.webp?s=2048x2048&w=is&k=20&c=U2YmBEYkJh3tyKRnjw0ZTXekrj2x8beC_l2olJPSrjo=';
    doc.addImage(logo, 'PNG', 10, 10, 30, 30);
    
    // Hospital name and address
    doc.setFontSize(22);
    doc.setTextColor(0, 0, 100);
    doc.text("City General Hospital", 50, 25);
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text("123 Medical Lane, Healthville, HV 12345", 50, 35);
    
    // Horizontal line
    doc.setDrawColor(0, 0, 100);
    doc.setLineWidth(0.5);
    doc.line(10, 45, 200, 45);
    
    // Title
    doc.setFontSize(24);
    doc.setTextColor(0, 0, 100);
    doc.text("Billing Report", 105, 60, null, null, 'center');
    
    // Patient details
    const patientDetails = [
      ['Date:', new Date().toLocaleDateString()],
      ['Patient Name:', 'John Doe'], // Replace with actual patient name
      ['Patient ID:', '123456'], // Replace with actual patient ID
      ['Age:', '30'], // Replace with actual age
      ['Gender:', 'Male'] // Replace with actual gender
    ];
    
    doc.autoTable({
      startY: 70,
      head: [['Patient Information', '']],
      body: patientDetails,
      theme: 'striped',
      headStyles: { fillColor: [0, 0, 100], textColor: 255 },
      alternateRowStyles: { fillColor: [240, 240, 255] },
      margin: { left: 10, right: 10 },
    });
    
    // Relevant Procedures
    let y = doc.lastAutoTable.finalY + 20; // Start after patient details
    if (billingData && billingData.Relevant.length > 0) {
      const relevantProcedures = billingData.Relevant.map(item => {
        const price = Math.floor(Math.random() * 1000); // Dummy price
        return [item.ICD, item.Procedure, `$${price}`, item.CPT]; // Include CPT code
      });

      // Add a title for the relevant procedures
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 100);
      doc.text("Relevant Procedures:", 20, y);
      y += 10;

      // Create the table for relevant procedures
      doc.autoTable({
        startY: y,
        head: [['ICD Code', 'Procedure', 'Price', 'CPT Code']], // Added CPT Code to the header
        body: relevantProcedures,
        theme: 'striped',
        headStyles: { fillColor: [0, 0, 100], textColor: 255 },
        alternateRowStyles: { fillColor: [240, 240, 255] },
        margin: { left: 10, right: 10 },
      });
    } else {
      doc.text("No relevant procedures found.", 20, y);
    }

    // Save the PDF
    doc.save("billing_report.pdf"); // Save the PDF
  };

  return (
    <div className={styles.Billing}>
      <h1 className={styles.Title}>Billing Information</h1>
      <button onClick={generateReport} className={styles.ReportButton}>Download Report</button> {/* Button to download report */}
      {billingData ? (
        <>
          <h2 className={styles.RelevantTitle}>Relevant Procedures</h2>
          {billingData.Relevant.length > 0 ? (
            billingData.Relevant.map((item, index) => (
              <div key={index} className={styles.CodeCard}>
                <h3 className={styles.ICDTitle}>ICD Code: {item.ICD}</h3>
                <h4 className={styles.Procedure}>{item.Procedure}</h4>
                <p className={styles.Reason}>Reason: {item.Reason}</p>
                <p className={styles.CPT}>CPT Code: {item.CPT}</p>
              </div>
            ))
          ) : (
            <p>No relevant procedures found.</p>
          )}

          <h2 className={styles.IrrelevantTitle}>Irrelevant Procedures</h2>
          {billingData.Irrelevant.length > 0 ? (
            billingData.Irrelevant.map((item, index) => (
              <div key={index} className={styles.CodeCard}>
                <h4 className={styles.Procedure}>{item.Procedure}</h4>
                <p className={styles.Reason}>Reason: {item.Reason}</p>
                <p className={styles.CPT}>CPT Code: {item.CPT}</p>
              </div>
            ))
          ) : (
            <p>No irrelevant procedures found.</p>
          )}
        </>
      ) : (
        <p>Loading billing data...</p>
      )}
    </div>
  );
};

export default Billing;
