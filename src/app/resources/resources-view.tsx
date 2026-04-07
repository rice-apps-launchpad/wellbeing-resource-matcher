'use client';

import {useEffect, useState} from 'react';
import {callSheetsGroupedByCategory, FullResource} from '@/app/sheets/backend';
import CardDeck from '@/components/card-deck/card-deck';
import {CATEGORY_LABELS} from '@/app/landing/landing-content';
import {Noto_Serif} from 'next/font/google';

const notoSerif = Noto_Serif({subsets: ['latin']});

export default function ResourcesView() {
  const [categories, setCategories] = useState<{ category: string; resources: FullResource[] }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    callSheetsGroupedByCategory().then(data => {
      setCategories(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div style={{padding: 24, color: 'var(--foreground)', opacity: 0.6}}>
        Loading resources...
      </div>
    );
  }

  return (
    <div style={{padding: '24px 20px', boxSizing: 'border-box', overflowX: 'hidden', width: '100%'}}>
      {categories.map(({category, resources}) => (
        <div key={category} style={{marginBottom: 48}}>
          <h2
            className={notoSerif.className}
            style={{
              color: 'var(--section-heading)',
              fontSize: 22,
              fontWeight: 'bold',
              margin: '0 0 16px 0',
            }}
          >
            {CATEGORY_LABELS[category] ?? category}
          </h2>
          <CardDeck resources={resources}/>
        </div>
      ))}
    </div>
  );
}
