import React, { useEffect, useState } from 'react';
import styles from './index.module.css';

const Billing = () => {
  const [billingData, setBillingData] = useState(null);

  useEffect(() => {
    const cross = localStorage.getItem('cross');
    const result = JSON.parse(cross);
    const second = JSON.parse(result)

    console.log(second); 
    setBillingData(second);
  }, []);

  return (
    <div className={styles.Billing}>
      <h1 className={styles.Title}>Billing Information</h1>
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
