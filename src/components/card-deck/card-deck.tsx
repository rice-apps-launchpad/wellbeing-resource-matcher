'use client';

import Image from 'next/image';
import {FullResource} from '@/app/sheets/backend';
import {Noto_Serif} from 'next/font/google';
import {Swiper, SwiperSlide} from 'swiper/react';
import {EffectCards} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

const notoSerif = Noto_Serif({subsets: ['latin']});

export default function CardDeck({resources}: { resources: FullResource[] }) {
  if (resources.length === 0) return null;

  return (
    <div style={{width: '100%', maxWidth: '100%', boxSizing: 'border-box'}}>
      <Swiper
        effect="cards"
        grabCursor
        modules={[EffectCards]}
        style={{width: '80%', maxWidth: '100%', margin: '0 auto'}}
      >
        {resources.map(resource => {
          const imgSrc = resource.image
            ? resource.image.startsWith('/') ? resource.image : `/${resource.image}`
            : '/rpc.jpg';

          return (
            <SwiperSlide key={resource.row} style={{borderRadius: 25, backgroundColor: '#00205B'}}>
              <div
                onClick={() => resource.website && window.open(resource.website, '_blank')}
                style={{cursor: 'pointer'}}
              >
                <div style={{width: '100%', height: 180, position: 'relative'}}>
                  <Image src={imgSrc} alt={resource.resourceName} fill style={{objectFit: 'cover'}}/>
                </div>
                <div style={{padding: '16px 20px'}}>
                  <h3
                    className={notoSerif.className}
                    style={{color: 'white', fontSize: 18, fontWeight: 'bold', margin: 0}}
                  >
                    {resource.resourceName}
                  </h3>
                  {resource.description && (
                    <p style={{
                      color: 'white',
                      opacity: 0.75,
                      fontSize: 13,
                      margin: '6px 0 0 0',
                      lineHeight: 1.4,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    } as React.CSSProperties}>
                      {resource.description}
                    </p>
                  )}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
