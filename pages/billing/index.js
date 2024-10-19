import React, { useEffect, useState } from 'react';
import styles from './index.module.css';

const Billing = () => {
  const [billingData, setBillingData] = useState(null);

  useEffect(() => {
    // Simulating fetching data
    const data = {
      ICD_Codes: [
        {
          ICD: "E11.9",
          CPT_Codes: [
            {
              Procedure: "Blood Test",
              Reason: "Indicated for monitoring blood glucose levels in a patient with diabetes.",
              CPT: "85025"
            }
          ],
          Irrelevant_CPT_Codes: [
            {
              Procedure: "Arm X-ray",
              Reason: "Not relevant to diabetes mellitus without complications.",
              CPT: "73000"
            }
          ]
        }
      ]
    };
    setBillingData(data);
  }, []);

  return (
    <div className={styles.Billing}>
      <h1 className={styles.Title}>Billing Information</h1>
      {billingData ? (
        billingData.ICD_Codes.map((icd, index) => (
          <div key={index} className={styles.ICDContainer}>
            <h2 className={styles.ICDTitle}>ICD Code: {icd.ICD}</h2>
            <h3 className={styles.CPTTitle}>Relevant CPT Codes</h3>
            {icd.CPT_Codes.length > 0 ? (
              icd.CPT_Codes.map((cpt, cptIndex) => (
                <div key={cptIndex} className={styles.CodeCard}>
                  <h4 className={styles.Procedure}>{cpt.Procedure}</h4>
                  <p className={styles.Reason}>Reason: {cpt.Reason}</p>
                  <p className={styles.CPT}>CPT Code: {cpt.CPT}</p>
                </div>
              ))
            ) : (
              <p>No relevant CPT codes found.</p>
            )}
            <h3 className={styles.CPTTitle}>Irrelevant CPT Codes</h3>
            {icd.Irrelevant_CPT_Codes.length > 0 ? (
              icd.Irrelevant_CPT_Codes.map((irrelevantCpt, irrelevantIndex) => (
                <div key={irrelevantIndex} className={styles.CodeCard}>
                  <h4 className={styles.Procedure}>{irrelevantCpt.Procedure}</h4>
                  <p className={styles.Reason}>Reason: {irrelevantCpt.Reason}</p>
                  <p className={styles.CPT}>CPT Code: {irrelevantCpt.CPT}</p>
                </div>
              ))
            ) : (
              <p>No irrelevant CPT codes found.</p>
            )}
          </div>
        ))
      ) : (
        <p>Loading billing data...</p>
      )}
    </div>
  );
};

export default Billing;
