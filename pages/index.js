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

  const router = useRouter();

  useEffect(() => {
    setPatientName('John Doe');
    setPatientId('12345');
    setAge('30');
    setGender('Male');
    setDiagnosis('Diabetes');
    setProcedures('Blood Test');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const patientDetails = {
      patient_name: patientName,
      patient_id: patientId,
      age: age,
      gender: gender,
      diagnosis: diagnosis, // Include diagnosis in submission
      procedures: procedures, // Include procedures in submission
    };

    router.push({
      pathname: '/prediction',
      query: { patientDetails: JSON.stringify(patientDetails) },
    });

    // try {
    //   // Call your AI prediction function here for both ICD and CPT codes
    //   const result = await window.electron.predictCodes(patientDetails);
    //   if (result.success) {
    //     console.log('ICD and CPT codes predicted successfully', result.data);
    //     // Navigate to the next page with the predicted codes
    //     router.push({
    //       pathname: '/NextPage', // Adjust to your actual next page
    //       query: { codes: result.data }, // Assuming result.data contains both ICD and CPT codes
    //     });
    //   } else {
    //     console.error('Failed to predict codes:', result.error);
    //   }
    // } catch (error) {
    //   console.error('An error occurred:', error);
    // }
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

          <div>
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
          </div>

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
          <p>This application utilizes advanced algorithms to predict ICD (International Classification of Diseases) and CPT (Current Procedural Terminology) codes based on the patient's demographic information, diagnosis, and procedures performed. Accurate and complete information is crucial for generating the most reliable predictions. ICD codes are used to classify diseases and health problems, while CPT codes are used to report medical, surgical, and diagnostic procedures. By providing detailed and accurate information, healthcare professionals can ensure that the predicted codes are precise, facilitating efficient billing, insurance claims, and medical record-keeping processes.</p>
        </div>

        <div className={styles.Upload__File_submit}>
            <button type="submit">Predict ICD and CPT Codes</button>
        </div>
      </div>

        
        </form>
    </div>
  </div>
  );
}