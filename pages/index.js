'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';

import styles from './index.module.css'
import { useRouter } from 'next/router';

export default function MyApp({}) {


  const [patientName, setPatientName] = useState('');
  const [patientId, setPatientId] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const [diagnosis, setDiagnosis] = useState(''); // State for Diagnosis input
  const [procedures, setProcedures] = useState(''); // State for Procedures input
  const [loading, setLoading] = useState(false); // State for Procedures input


  const router = useRouter();

  useEffect(() => {
    setPatientName('John Doe');
    setPatientId('12345');
    setAge('30');
    setGender('Male');
    setDiagnosis(localStorage.getItem('diagnosis') || "Diabetes");
    setProcedures(localStorage.getItem('procedure') || "Blood Test");
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();

    const patientDetails = {
      patient_name: patientName,
      patient_id: patientId,
      age: age,
      gender: gender,
      diagnosis: diagnosis, // Include diagnosis in submission
      procedures: procedures, // Include procedures in submission
    };

    localStorage.setItem('patient_name', patientName);
    localStorage.setItem('patient_id', patientId);
    localStorage.setItem('age', age);
    localStorage.setItem('gender', gender);
    localStorage.setItem('diagnosis', diagnosis);
    localStorage.setItem('procedure', procedures);
    localStorage.removeItem('icd_code');
    localStorage.removeItem('cpt_code');
    localStorage.removeItem('cross',  );

    //icd
    // try {
    //   // Call the ICD prediction endpoint
    //   const response = await fetch(`http://localhost:5000/icd?diagnosis_data=${diagnosis}&procedure=${procedures}`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     }, // Example diagnosis
    //   });

    //   const data = await response.json(); // Parse the JSON response
    //   console.log(data,"data")
    //   if (response.ok) {
    //     // console.log('ICD codes predicted successfully', data);
    //     // Navigate to the prediction page with the 
    //     localStorage.setItem('icd_code', JSON.stringify(data));
    //   } else {
    //     console.error('Failed to predict ICD codes:', data);
    //   }
    // } catch (error) {
    //   console.error('An error occurred:', error);
    // }

    const diagnosisData = {
      diagnosis_data: diagnosis,
      procedure: procedures
    };


    try {
      // Call the ICD prediction endpoint
      const response = await fetch(`http://localhost:5000/icd/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        }, // Example diagnosis
        body: JSON.stringify(diagnosisData)
      });

      const data = await response.json(); // Parse the JSON response
      console.log(data,"data")
      if (response.ok) {
        // console.log('ICD codes predicted successfully', data);
        // Navigate to the prediction page with the 
        localStorage.setItem('icd_code', JSON.stringify(data));
      } else {
        console.error('Failed to predict ICD codes:', data);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }

    const procedureData = {
      diagnosis_data: diagnosis,
      procedure: procedures
    };


    //cpt
    try {
      // Call the ICD prediction endpoint
      const response = await fetch(`http://localhost:5000/cpt/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, // Example diagnosis
        body: JSON.stringify(procedureData)
      });

      const data = await response.json(); // Parse the JSON response
      console.log(data,"data")
      if (response.ok) {
        // console.log('ICD codes predicted successfully', data);
        // Navigate to the prediction page with the 
        localStorage.setItem('cpt_code', JSON.stringify(data));
        router.push({
          pathname: '/prediction'        });
      } else {
        console.error('Failed to predict CPT codes:', data);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
    setLoading(false)
  };

  return (
  <div className={styles.Upload}>
    <div className={styles.Upload__container}>

        <form className={styles.Upload__container_top} onSubmit={handleSubmit}>

        <div className={styles.Upload__form}>

          <span>Patient Details</span>

          <div>
          <label>Patient Name:</label>
          <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} required />
          </div>

          {/* <div>
          <label>Patient ID:</label>
          <input type="text" value={patientId} onChange={(e) => setPatientId(e.target.value)} required />
          </div>

          <div>
          <label>Age:</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
          </div>

          <div>
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select> 
          </div> */}

          <div>
          <label>Diagnosis:</label>
          <textarea value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} required rows="7" />
          </div>

          <div>
          <label>Procedures Done:</label>
          <textarea value={procedures} onChange={(e) => setProcedures(e.target.value)} required rows="7" />
          </div>

        </div>


      <div className={styles.Right_Container}>
      <div className={styles.Upload__description}>
          <p>This MVP predicts ICD and CPT codes based on  diagnosis, and procedures. It aims to support efficient billing and insurance claims but may produce errors. Accurate input improves code prediction and cross-referencing between ICD and CPT codes</p>
        </div>

        <div className={styles.Upload__File_submit}>
            {loading ? ( // Show spinner when loading is true
                <div className={styles.Spinner}></div>
            ) : (
                <button type="submit">Predict ICD and CPT Codes</button>
            )}
        </div>
      </div>

        
        </form>
    </div>
  </div>
  );
}
