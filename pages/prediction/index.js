import React from 'react';
import styles from './index.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Prediction = () => {
  const router = useRouter();

  const [icdCode, setIcdCode] = useState([]); // State to hold the ICD code
  const [cptCode, setCptCode] = useState([]); // State to hold the ICD code
  const [loading, setLoading] = useState(false); 
  useEffect(() => {
    const storedIcdCode = localStorage.getItem('icd_code');
    const storedCptCode = localStorage.getItem('cpt_code');
    if (storedIcdCode) {
      const parsedIcdCode = JSON.parse(storedIcdCode);
      setIcdCode(parsedIcdCode);
      console.log("Updated icdCode state:", parsedIcdCode); // Check the updated state

      const parsedCptCode = JSON.parse(storedCptCode)
      setCptCode(parsedCptCode)
      console.log("Updated cptCode state:", parsedCptCode); // Check the updated state

    }
  }, []); // Dependency array to run effect when icd_code changes 

  const handleSubmit = async () => {
    // Logic for handling the review of codes
    console.log("Review Codes submitted");
    setLoading(true);
    const crossCheck = {
      icd_codes:JSON.stringify(icdCode),
      cpt_codes:JSON.stringify(cptCode)
    }
    const icd_input = encodeURIComponent(JSON.stringify(icdCode)); // Encode the JSON string
    const cpt_input = encodeURIComponent(JSON.stringify(cptCode)); // Encode the JSON string
    // You can add further functionality here, like navigating to another page or displaying a modal
        //icd
        try {
          // Call the ICD prediction endpoint
          const response = await fetch(`http://icd-backend.onrender.com/icd_cpt_cross_reference/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }, // Example diagnosis
            body: JSON.stringify(crossCheck)
          });
    
          const data = await response.json(); // Parse the JSON response
          if (response.ok) {
            // console.log('ICD codes predicted successfully', data);
            // Navigate to the prediction page with the 
            localStorage.setItem('cross', JSON.stringify(data));
            router.push({
              pathname: '/cross'        });
          } else {
            console.error('Failed to predict ICD codes:', data);
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
    setLoading(false)    
  };

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
                    {cptCode.length > 0 ? cptCode.map((item, index) => (
                        <div key={index} className={styles.CodeCard}>
                            <h2 className={styles.Disease}>{item.Procedure}</h2>
                            <p className={styles.Icd}>CPT Code: {item.CPT}</p>
                            <p className={styles.Reason}>Reason: {item.Reason}</p>
                            <p className={styles.Description}>Description: {item.Description_from_dataset}</p> {/* Added Description */}
                        </div>
                    )) : <p>No ICD codes found.</p>}
                </div>
            </div>
            <div className={styles.Upload__File_submit}>
      {loading ? ( // Show spinner when loading is true
        <div className={styles.Spinner}></div>
      ) : (
        <button onClick={handleSubmit} className={styles.ReviewButton}>Review Codes</button>
      )}
    </div>
        </div>
    );
};

export default Prediction;
