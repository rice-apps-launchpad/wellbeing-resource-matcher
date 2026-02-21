"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Inter, Noto_Serif } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const notoSerif = Noto_Serif({ subsets: ['latin'] });

interface SmallProps {
    image: string;
    title: string;
    descrip: string;
}

export default function SmallPopup({ image, title, descrip }: SmallProps) {
    const [isHovered, setIsHovered] = useState(false);

    const cardStyle = {
        width: "100%",
        borderRadius: "25px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column" as const,
        backgroundColor: "#00205B",
        cursor: "pointer",
       
        transition: "all 0.3s ease",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: isHovered 
            ? "0 30px 60px -12px rgba(0, 0, 0, 0.4)" 
            : "0 20px 40px -12px rgba(0, 0, 0, 0.25)",
    };

    return (
        <div 
            style={cardStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={{ width: "100%", height: "180px", position: "relative" }}>
                <Image
                    src={image}
                    alt={title}
                    fill
                    style={{ objectFit: "cover" }}
                />
            </div>

            <div style={{ padding: "25px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <h2 className={notoSerif.className} style={{ color: "white", fontSize: "22px", fontWeight: "bold" }}>
                    {title}
                </h2>
                <p className={inter.className} style={{ color: "white", fontSize: "14px", textDecoration: "underline", opacity: 0.9 }}>
                    {descrip}
                </p>
            </div>
        </div>
    );
}