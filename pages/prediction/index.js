import React from 'react';
import styles from './index.module.css';

const dummyData = [
    {
        Disease: "Anemia",
        ICD: "D64.9",
        Reason: "The patient was referred for anemia with a hemoglobin level of 12.6 on recent labs, indicating a potential low red blood cell count.",
        CPT: "85025" // Sample CPT code
    },
    {
        Disease: "Hypertension",
        ICD: "I10",
        Reason: "The patient has a history of hypertension with recent blood pressure readings consistently above normal.",
        CPT: "99213" // Sample CPT code
    }
];

const Prediction = () => {
    return (
        <div className={styles.Prediction}>
            <h1 className={styles.Title}>ICD and CPT Codes</h1>
            <div className={styles.CodesContainer}>
                <div className={styles.ICDContainer}>
                    <h2 className={styles.ICDTitle}>ICD Codes</h2>
                    {dummyData.map((item, index) => (
                        <div key={index} className={styles.CodeCard}>
                            <h2 className={styles.Disease}>{item.Disease}</h2>
                            <p className={styles.ICD}>ICD Code: {item.ICD}</p>
                            <p className={styles.Reason}>{item.Reason}</p>
                        </div>
                    ))}
                </div>
                <div className={styles.CPTContainer}>
                    <h2 className={styles.CPTTitle}>CPT Codes</h2>
                    {dummyData.map((item, index) => (
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
