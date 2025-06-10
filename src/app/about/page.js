  
"use client";
import Image from 'next/image';
import styles from './TeamSection.module.css';
import Header from '@/main-component/main-header';
import React,{useEffect,useState} from 'react';

  const teamMembers = [
  {
    name: "Avinash Gautam",
    title: "SAP / IT Product Owner",
    colorClass: styles.blue,
    description:
      "Leads the IT function, oversees SAP systems, and drives the implementation of strategic IT initiatives",
    image: "/it-team/avinash_sir.jpeg",
  },
  {
    name: "Sanjay Singh",
    title: "IT Specialist",
    colorClass: styles.green,
    description:
      "Provides advanced technical support, system analysis, and contributes to IT infrastructure improvements.",
  image: "/it-team/sanjay_sir.jpeg",
  },
  {
    name: "Sandeep kumar",
    title: "IT Engineer",
    colorClass: styles.purple,
    description:
      "Responsible for hardware, software, and network maintenance, ensuring system reliability and user support.",
    image: "/san.jpeg",
  },
];

  export default function AboutUs(){
     const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

   
  


    function TeamSection() {
  return (
    <div className={styles.teamSection}>

      <h1 className={`${styles.black} ${styles.headingAboutSection}`} >Our Vision</h1>
      <p className={styles.subtitle}>
        Our vision is to empower the organization with innovative, secure, and efficient IT solutions that drive operational excellence, support strategic growth, and enable a future-ready digital environment.
      </p>
      <h1 className={`${styles.black} ${styles.headingAboutSection}`} >IT Department Hierarchy</h1>
      <p className={styles.subtitle}>
        Our IT team is structured to ensure efficient management of digital systems and continuous improvement of our technology landscape.
      </p>
      <div className={styles.teamContainer}>
        {teamMembers.map((member) => (
          <div className={styles.teamMember} key={member.name}>
            <div className={styles.imageWrapper}>
              <Image
                src={member.image}
                alt={member.name}
                width={120}
                height={120}
                className={styles.image}
              />
            </div>
            <h3 className={ styles.black} style={{fontSize:"30px"}}>{member.name}</h3>
            <p className={styles.title} style={{fontSize:"18px", color:"#ee7100"}}>{member.title}</p>
            <p style={{color:"#333",fontSize:"16px"}}>{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
  
    return(
        <div>
          <Header/>
            {TeamSection()}
        </div>
    )
  }