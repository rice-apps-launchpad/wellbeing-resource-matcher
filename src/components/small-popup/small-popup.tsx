"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Noto_Serif, Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const notoSerif = Noto_Serif({ subsets: ['latin'] });

interface SmallProps {
  image: string;
  resourceName: string;
  description: string;
  website: string;
}

export default function SmallPopup({ image, resourceName, description, website }: SmallProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '25px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#00205B',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered
          ? '0 8px 20px rgba(0, 0, 0, 0.18)'
          : '0 2px 8px rgba(0, 0, 0, 0.10)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image — fixed height so all cards are consistent */}
      <div style={{ width: '100%', height: 130, position: 'relative', flexShrink: 0 }}>
        <Image src={image} alt={resourceName} fill style={{ objectFit: 'cover' }} />
      </div>

      {/* Content */}
      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h2
          className={notoSerif.className}
          style={{ color: 'white', fontSize: '18px', fontWeight: 'bold', margin: '0 0 8px 0', lineHeight: 1.3 }}
        >
          {resourceName}
        </h2>

        <p
          className={inter.className}
          style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '13px',
            margin: 0,
            lineHeight: 1.5,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {description}
        </p>

        {/* Spacer pushes URL to bottom */}
        <div style={{ flex: 1 }} />

        {website && website !== '#' && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className={inter.className}
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '12px',
              textDecoration: 'none',
              marginTop: '12px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,1)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
          >
            {website}
          </a>
        )}
      </div>
    </div>
  );
}
