'use client';

import {CSSProperties, useEffect, useState} from 'react';
import {callSheetsGroupedByCategory, FullResource} from '@/app/sheets/backend';
import ResourceRow from '@/components/resource-row/resource-row';
import {Noto_Serif} from 'next/font/google';

const notoSerif = Noto_Serif({subsets: ['latin']});

// ── Category pills data (desktop example questions) ──────────────────────────
const CATEGORY_EXAMPLES = [
  {
    label: 'Academic',
    icon: '🎓',
    questions: [
      'I need help in building a 4-year academic plan.',
      'Where can I get tutoring for my classes?',
      'I need help with course selection.',
      'I\'m struggling with a specific subject.',
    ],
  },
  {
    label: 'Wellbeing',
    icon: '💚',
    questions: [
      'Where can I get mental health counseling?',
      'I\'m struggling with stress and anxiety.',
      'I need someone to talk to.',
      'I\'m having trouble sleeping due to anxiety.',
    ],
  },
  {
    label: 'Financial',
    icon: '💰',
    questions: [
      'I need help with financial aid.',
      'Where can I find scholarships at Rice?',
      'I\'m struggling to pay for textbooks.',
      'How do I apply for emergency funding?',
    ],
  },
  {
    label: 'Student Life',
    icon: '🎉',
    questions: [
      'How do I get involved in clubs and activities?',
      'I need help adjusting to campus life.',
      'Where can I find student organizations?',
    ],
  },
  {
    label: 'Tech Support',
    icon: '💻',
    questions: [
      'I need help with my laptop or campus tech.',
      'How do I connect to campus Wi-Fi?',
      'I\'m having trouble with my Rice account.',
    ],
  },
  {
    label: 'Transportation',
    icon: '🚌',
    questions: [
      'How do I get around campus?',
      'What transportation options are available?',
      'Where can I find parking information?',
    ],
  },
];

// ── Flat example questions for mobile ────────────────────────────────────────
const MOBILE_EXAMPLE_QUESTIONS = [
  'I need help in building a 4-year academic plan.',
  'Where can I get mental health counseling?',
  'I need help with financial aid.',
  'How do I get tutoring for my classes?',
];

// ── Resource category labels ─────────────────────────────────────────────────
export const CATEGORY_LABELS: Record<string, string> = {
  'Academic': 'Need academic help?',
  'Financial': 'Looking for financial support?',
  'Student Life': 'Explore student life',
  'Wellbeing/Health/Safety': 'Need wellbeing or health support?',
  'Parking and Transportation': 'Getting around campus',
  'Information Technology': 'Having tech issues?',
  'Campus Bookstore': 'Need books or supplies?',
};

interface LandingContentProps {
  onExampleClick: (question: string) => void;
  showCategoryDecks?: boolean;
}

export default function LandingContent({onExampleClick, showCategoryDecks = false}: LandingContentProps) {
  const [categories, setCategories] = useState<{ category: string; resources: FullResource[] }[]>([]);
  const [openPill, setOpenPill] = useState<string | null>(null);

  useEffect(() => {
    if (!showCategoryDecks) return;
    callSheetsGroupedByCategory().then(setCategories);
  }, [showCategoryDecks]);

  return (
    <div style={{padding: showCategoryDecks ? '48px 40px' : '32px 20px', boxSizing: 'border-box'}}>
      <h1
        className={notoSerif.className}
        style={{
          color: 'var(--section-heading)',
          fontSize: showCategoryDecks ? 'clamp(36px, 4vw, 56px)' : 34,
          fontWeight: 'bold',
          margin: '0 0 10px 0',
          lineHeight: 1.1,
        }}
      >
        What can we help you with?
      </h1>
      <p style={{
        color: 'var(--resource-title)',
        fontSize: 15,
        margin: '0 0 32px 0',
        lineHeight: 1.6,
        maxWidth: 500,
      }}>
        Tell us what you need, and we'll match you with the right Rice resource.

        Not sure what to ask? See some examples below:
      </p>

      {/* ── Desktop: Claude-style category pills ── */}
      {showCategoryDecks && (
        <div style={{marginBottom: 52}}>
          {/* Pill row */}
          <div style={{display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16}}>
            {CATEGORY_EXAMPLES.map(({label, icon}) => {
              const isOpen = openPill === label;
              return (
                <button
                  key={label}
                  onClick={() => setOpenPill(isOpen ? null : label)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '10px 18px',
                    borderRadius: 100,
                    border: `1px solid ${isOpen ? '#00205B' : 'var(--input-border)'}`,
                    background: isOpen ? '#00205B' : 'var(--card-bg)',
                    color: isOpen ? 'white' : 'var(--foreground)',
                    cursor: 'pointer',
                    fontSize: 14,
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          {/* Dropdown panel */}
          {openPill && (() => {
            const cat = CATEGORY_EXAMPLES.find(c => c.label === openPill)!;
            return (
              <div style={{
                borderRadius: 16,
                background: 'var(--card-bg)',
                border: '1px solid var(--input-border)',
                overflow: 'hidden',
                maxWidth: 560,
              }}>
                {/* Panel header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 20px',
                  borderBottom: '1px solid var(--input-border)',
                }}>
                  <span style={{
                    fontWeight: 600,
                    fontSize: 15,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    color: 'var(--foreground)'
                  }}>
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </span>
                  <button
                    onClick={() => setOpenPill(null)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: 18,
                      color: 'var(--foreground)',
                      opacity: 0.5,
                      lineHeight: 1
                    }}
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>
                {/* Questions */}
                {cat.questions.map((q, i) => (
                  <button
                    key={q}
                    onClick={() => {
                      onExampleClick(q);
                      setOpenPill(null);
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '16px 20px',
                      background: 'none',
                      border: 'none',
                      borderBottom: i < cat.questions.length - 1 ? '1px solid var(--input-border)' : 'none',
                      cursor: 'pointer',
                      fontSize: 15,
                      color: 'var(--foreground)',
                      transition: 'background 0.1s ease',
                    } as CSSProperties}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(128,128,128,0.08)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                  >
                    {q}
                  </button>
                ))}
              </div>
            );
          })()}
        </div>
      )}

      {/* ── Mobile: flat example question chips ── */}
      {!showCategoryDecks && (
        <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
          {MOBILE_EXAMPLE_QUESTIONS.map(q => (
            <button
              key={q}
              onClick={() => onExampleClick(q)}
              style={{
                textAlign: 'left',
                background: 'var(--card-bg)',
                border: '1px solid var(--input-border)',
                borderRadius: 16,
                padding: '13px 18px',
                fontSize: 15,
                color: 'var(--foreground)',
                cursor: 'pointer',
                transition: 'opacity 0.15s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* ── Desktop: category resource rows ── */}
      {showCategoryDecks && categories.map(({category, resources}) => (
        <div key={category} style={{marginBottom: 48}}>
          <h2
            className={notoSerif.className}
            style={{
              color: 'var(--section-heading)',
              fontSize: 24,
              fontWeight: 'bold',
              margin: '0 0 16px 0',
            }}
          >
            {CATEGORY_LABELS[category] ?? category}
          </h2>
          <ResourceRow resources={resources}/>
        </div>
      ))}
    </div>
  );
}
