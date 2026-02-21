import React from 'react';
import Image from 'next/image';
import {Inter, Noto_Serif} from 'next/font/google';

// https://nextjs.org/docs/app/getting-started/fonts
const inter = Inter({ subsets: ['latin'] });
const notoSerif = Noto_Serif({ subsets: ['latin'] });

const styles = {
    card: {
        width: "100%",
        maxWidth: "64rem",
        margin: "0 auto",
        overflow: "hidden",
        borderRadius: "20px", 
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
    },
    imageContainer: {
        width: "100%",
        aspectRatio: "3 / 1",
        overflow: "hidden",
        position: "relative",
    },
    image: {
        objectFit: "cover",
    },
    contentSection: {
        backgroundColor: "#00205B", 
        padding: "60px 40px",
        color: "white",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    matchText: {
        fontSize: "34px",
        marginBottom: "34px",
        opacity: 0.9,
       
    },
    title: {
        fontSize: "3.5rem", 
        fontWeight: "bold",
        marginBottom: "24px",
        lineHeight: "1.1",
    },
    description: {
        fontSize: "1.3rem", 
        lineHeight: "1.7",
        opacity: 0.9,
    }
} as const;

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
                   <Image
                       src={imageSrc} 
                       alt={title}
                       fill
                       style={styles.image} 
                   />
               </div>
           )}

           <div style={styles.contentSection}>
               <p style={styles.matchText}>
                   {matchText}
               </p>
               
               <h1 className={notoSerif.className} style={styles.title}>
                   {title}
               </h1>
               
               <p className={inter.className} style={styles.description}>
                   {description}
               </p>
           </div>
       </div>
   );
}