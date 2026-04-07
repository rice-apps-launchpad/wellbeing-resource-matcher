'use client';

import { CSSProperties, useEffect, useRef, useState } from 'react';
import { FullResource } from '@/app/sheets/backend';
import SmallPopup from '@/components/small-popup/small-popup';

const CARD_WIDTH = 260;
// Vertical padding on the scroll container so box-shadows aren't clipped
const SHADOW_PAD = 24;

export default function ResourceRow({ resources }: { resources: FullResource[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  // Check on mount and whenever resources change
  useEffect(() => {
    updateArrows();
  }, [resources]);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === 'right' ? CARD_WIDTH * 2 + 32 : -(CARD_WIDTH * 2 + 32),
      behavior: 'smooth',
    });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <button
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
        style={arrowStyle(canScrollLeft)}
        aria-label="Scroll left"
      >‹</button>

      {/* Mask wrapper: fades right edge toward the arrow */}
      <div style={{
        flex: 1,
        minWidth: 0,
        maskImage: 'linear-gradient(to right, black 85%, rgba(0,0,0,0.95) 90%, rgba(0,0,0,0.7) 93%, rgba(0,0,0,0.25) 97%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, black 75%, rgba(0,0,0,0.95) 82%, rgba(0,0,0,0.7) 88%, rgba(0,0,0,0.25) 95%, transparent 100%)',
      }}>
      <div
        ref={scrollRef}
        className="hide-scrollbar"
        onScroll={updateArrows}
        style={{
          display: 'flex',
          gap: 16,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          paddingTop: SHADOW_PAD,
          paddingBottom: SHADOW_PAD,
          marginTop: -SHADOW_PAD,
          marginBottom: -SHADOW_PAD,
        }}
      >
        {resources.map(resource => {
          const imgSrc = resource.image
            ? resource.image.startsWith('/') ? resource.image : `/${resource.image}`
            : '/rpc.jpg';

          return (
            <div
              key={resource.row}
              style={{
                flex: `0 0 ${CARD_WIDTH}px`,
                width: CARD_WIDTH,
                maxWidth: CARD_WIDTH,
                scrollSnapAlign: 'start',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <SmallPopup
                image={imgSrc}
                resourceName={resource.resourceName}
                description={resource.description}
                website={resource.website || '#'}
              />
            </div>
          );
        })}
      </div>
      </div>

      <button
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
        style={arrowStyle(canScrollRight)}
        aria-label="Scroll right"
      >›</button>
    </div>
  );
}

const arrowStyle = (active: boolean): CSSProperties => ({
  flexShrink: 0,
  width: 40,
  height: 40,
  borderRadius: '50%',
  border: '1px solid var(--input-border)',
  background: 'var(--card-bg)',
  color: active ? 'var(--foreground)' : 'var(--input-border)',
  fontSize: 22,
  cursor: active ? 'pointer' : 'default',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 1,
  opacity: active ? 1 : 0.35,
  transition: 'opacity 0.2s ease, color 0.2s ease',
});
