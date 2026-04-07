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
    setActiveTab('ask');
  };

  const handleSessionTerminate = () => {
    setHasChatStarted(false);
    setActiveTab('ask');
  };

  const showResourcesPanel = !isLaptop && !hasChatStarted && activeTab === 'resources';

  return (
    <div style={{
      position: 'fixed', inset: 0, overflow: 'hidden',
      display: 'flex',
      flexDirection: isLaptop ? 'row' : 'column',
    }}>

      {/* Desktop: left content panel */}
      {isLaptop && (
        <div style={{flex: '1 1 auto', minWidth: 0, overflow: 'auto'}}>
          {match
            ? <MatchLayout {...match} />
            : <LandingContent onExampleClick={handleExampleClick} showCategoryDecks={true}/>
          }
        </div>
      )}

      {/* Mobile: tab bar + resources, rendered above the chat in column flex */}
      {!isLaptop && !hasChatStarted && (
        <>
          <div style={{
            display: 'flex',
            flexShrink: 0,
            borderBottom: '1px solid var(--input-border)',
            backgroundColor: 'var(--chat-panel-bg)',
          }}>
            <button style={tabBtnStyle(activeTab === 'ask')} onClick={() => setActiveTab('ask')}>Ask</button>
            <button style={tabBtnStyle(activeTab === 'resources')} onClick={() => setActiveTab('resources')}>Resources</button>
          </div>
          {activeTab === 'resources' && (
            <div style={{flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden', backgroundColor: 'var(--chat-panel-bg)'}}>
              <ResourcesView/>
            </div>
          )}
        </>
      )}

      {/* Single ChatPage instance — always mounted so state is preserved across layout changes */}
      <div style={{
        ...(isLaptop
          ? {width: 400, minWidth: 400, maxWidth: 400, flex: '0 0 400px'}
          : {flex: 1, minHeight: 0}
        ),
        display: showResourcesPanel ? 'none' : 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        <ChatPage
          isLaptop={isLaptop}
          setMatch={setMatch}
          pendingQuestion={pendingQuestion}
          clearPendingQuestion={() => setPendingQuestion('')}
          onFirstMessage={() => setHasChatStarted(true)}
          onSessionTerminate={handleSessionTerminate}
          landingSlot={
            !isLaptop && !hasChatStarted
              ? <LandingContent onExampleClick={handleExampleClick} showCategoryDecks={false}/>
              : undefined
          }
        />
      </div>

    </div>
  );
}
