'use client';
import MatchLayout from "@/app/match_screen/match_screen"
import ChatPage from "@/app/chat/chat"
import LandingContent from "@/app/landing/landing-content"
import ResourcesView from "@/app/resources/resources-view"
import {CSSProperties, useEffect, useState} from "react";
import {Match} from "@/data/chat-message"

type Tab = 'ask' | 'resources';

function tabBtnStyle(active: boolean): CSSProperties {
  return {
    flex: 1,
    padding: '14px 0',
    border: 'none',
    backgroundColor: active ? '#00205B' : 'transparent',
    color: active ? 'white' : 'var(--foreground)',
    fontWeight: active ? 'bold' : 'normal',
    fontSize: 16,
    cursor: 'pointer',
    transition: 'background 0.2s ease, color 0.2s ease',
  };
}

export default function Page() {
  const [isLaptop, setLaptop] = useState(false)
  const [match, setMatch] = useState<Match>();
  const [hasChatStarted, setHasChatStarted] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('ask');
  const [pendingQuestion, setPendingQuestion] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setLaptop(window.innerWidth >= window.innerHeight);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleExampleClick = (question: string) => {
    setPendingQuestion(question);
    // Switch to Ask tab so the input is visible (mobile)
    setActiveTab('ask');
  };

  const handleSessionTerminate = () => {
    setHasChatStarted(false);
    setActiveTab('ask');
  };

  return (
    <div style={{position: 'fixed', inset: 0, overflow: 'hidden'}}>

      {/* ── Desktop layout ── */}
      {isLaptop && (
        <div style={{display: 'flex', height: '100%'}}>
          {/* Left panel */}
          <div style={{flex: '1 1 auto', minWidth: 0, overflow: 'auto'}}>
            {match
              ? <MatchLayout {...match} />
              : <LandingContent onExampleClick={handleExampleClick} showCategoryDecks={true}/>
            }
          </div>
          {/* Chat panel */}
          <div style={{
            width: 400, minWidth: 400, maxWidth: 400, flex: '0 0 400px',
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
          }}>
            <ChatPage
              isLaptop={true}
              setMatch={setMatch}
              pendingQuestion={pendingQuestion}
              clearPendingQuestion={() => setPendingQuestion('')}
              onFirstMessage={() => setHasChatStarted(true)}
              onSessionTerminate={handleSessionTerminate}
            />
          </div>
        </div>
      )}

      {/* ── Mobile layout ── */}
      {!isLaptop && (
        <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>

          {/* Tab bar — hidden once chat has started */}
          {!hasChatStarted && (
            <div style={{
              display: 'flex',
              flexShrink: 0,
              borderBottom: '1px solid var(--input-border)',
              backgroundColor: 'var(--chat-panel-bg)',
            }}>
              <button style={tabBtnStyle(activeTab === 'ask')} onClick={() => setActiveTab('ask')}>
                Ask
              </button>
              <button style={tabBtnStyle(activeTab === 'resources')} onClick={() => setActiveTab('resources')}>
                Resources
              </button>
            </div>
          )}

          {/* Resources tab */}
          {!hasChatStarted && activeTab === 'resources' && (
            <div style={{
              flex: 1,
              minHeight: 0,
              overflowY: 'auto',
              overflowX: 'hidden',
              backgroundColor: 'var(--chat-panel-bg)'
            }}>
              <ResourcesView/>
            </div>
          )}

          {/* Ask tab / active chat — always mounted so ChatPage state is preserved */}
          <div style={{
            flex: 1,
            minHeight: 0,
            display: (!hasChatStarted && activeTab === 'resources') ? 'none' : 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}>
            <ChatPage
              isLaptop={false}
              setMatch={setMatch}
              pendingQuestion={pendingQuestion}
              clearPendingQuestion={() => setPendingQuestion('')}
              onFirstMessage={() => setHasChatStarted(true)}
              onSessionTerminate={handleSessionTerminate}
              landingSlot={
                !hasChatStarted
                  ? <LandingContent onExampleClick={handleExampleClick} showCategoryDecks={false}/>
                  : undefined
              }
            />
          </div>

        </div>
      )}

    </div>
  );
}
