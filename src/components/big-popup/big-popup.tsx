import React from 'react';

const styles = {
    card: {
        maxWidth: "1027px", 
        minHeight: "668px", 
        margin: "0 auto",
        overflow: "hidden",
        borderRadius: "20px", 
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        backgroundColor: "white",
        display: "flex" as "flex",
        flexDirection: "column" as "column",
    },
    imageContainer: {
        width: "100%",
        height: "335px", 
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover" as "cover",
    },
    contentSection: {
        backgroundColor: "#00205B", 
        padding: "60px 40px",
        color: "white",
        flexGrow: 1, 
        display: "flex" as "flex",
        flexDirection: "column" as "column",
        justifyContent: "center" as "center",
    },
    matchText: {
        fontSize: "34px",
        marginBottom: "34px",
        opacity: 0.9,
       
    },
    title: {
        fontSize: "3.5rem", 
        fontFamily: "serif",
        fontWeight: "bold" as "bold",
        marginBottom: "24px",
        lineHeight: "1.1",
    },
    description: {
        fontSize: "1.3rem", 
        lineHeight: "1.7",
        opacity: 0.9,
    }
};

interface BigPopupProps {
   imageSrc: string;
   matchText?: string;
   title: string;
   description: string;
}

export default function BigPopup({
   imageSrc,
   matchText = "Your top match:",
   title,
   description
}: BigPopupProps) {
   return (
       <div style={styles.card}>
           {imageSrc && (
               <div style={styles.imageContainer}>
                   <img 
                       src={imageSrc} 
                       alt={title} 
                       style={styles.image} 
                   />
               </div>
           )}

           <div style={styles.contentSection}>
               <p style={styles.matchText}>
                   {matchText}
               </p>
               
               <h1 style={styles.title}>
                   {title}
               </h1>
               
               <p style={styles.description}>
                   {description}
               </p>
           </div>
       </div>
   );
}