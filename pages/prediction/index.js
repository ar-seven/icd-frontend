import React from 'react';
import styles from './index.module.css';
import { useState, useEffect } from 'react';

var dummyDataICD = [
    {
        Disease: "Anemia",
        ICD: "D64.9",
        Reason: "The patient was referred for anemia with a hemoglobin level of 12.6 on recent labs, indicating a potential low red blood cell count."
    },
    {
        Disease: "Hypertension",
        ICD: "I10",
        Reason: "The patient has a history of hypertension with recent blood pressure readings consistently above normal."
    }
];


let dummyDataCPT = [
    {
        Disease: "Anemia",
        CPT: "85025" // Sample CPT code
    },
    {
        Disease: "Hypertension",
        CPT: "99213" // Sample CPT code
    }
];





const Prediction = () => {
  const [icdCode, setIcdCode] = useState([]); // State to hold the ICD code
  useEffect(() => {
    const storedIcdCode = localStorage.getItem('icd_code');
    if (storedIcdCode) {
      const parsedIcdCode = JSON.parse(storedIcdCode);
      console.log("Stored ICD Code:", parsedIcdCode);
      setIcdCode(parsedIcdCode);
      console.log("Updated icdCode state:", parsedIcdCode); // Check the updated state
    }
  }, []); // Dependency array to run effect when icd_code changes 

  return (
        <div className={styles.Prediction}>
            <h1 className={styles.Title}>ICD and CPT Codes</h1>
            <div className={styles.CodesContainer}>
                <div className={styles.ICDContainer}>
                    <h2 className={styles.ICDTitle}>ICD Codes</h2>
                    
                    {icdCode.length > 0 ? icdCode.map((item, index) => (
                        <div key={index} className={styles.CodeCard}>
                            <h2 className={styles.Disease}>{item.Disease}</h2>
                            <p className={styles.Icd}>ICD Code: {item.ICD}</p>
                            <p className={styles.Reason}>Reason: {item.Reason}</p>
                            <p className={styles.Description}>Description: {item.Description_from_dataset}</p> {/* Added Description */}
                        </div>
                    )) : <p>No ICD codes found.</p>}
                </div>
                <div className={styles.CPTContainer}>
                    <h2 className={styles.CPTTitle}>CPT Codes</h2>
                    {dummyDataCPT.map((item, index) => (
                        <div key={index} className={styles.CodeCard}>
                            <h2 className={styles.Disease}>{item.Disease}</h2>
                            <p className={styles.CPT}>CPT Code: {item.CPT}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Prediction;
