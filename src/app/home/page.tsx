'use client';
import MatchLayout from "@/app/match_screen/match_screen"
import ChatPage from "@/app/chat/chat"
import AllResources from "@/app/all_resources/all_resources"
import {useState, useEffect} from "react";
import {Match} from "@/data/chat-message"

export default function Page() {
  const [isLaptop, setLaptop] = useState(false)

  /**
   * If a match is found, match will have the data that corresponds
   * to `interface Match`.
   *
   * Otherwise, it will be undefined.
   */
  const [match, setMatch] = useState<Match>();

  useEffect(() => {
    const handleResize = () => {
      setLaptop(window.innerWidth >= window.innerHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{height: "100vh", width: "100vw", display: "flex", overflow: "hidden"}}>
      {/* Left panel: only visible on desktop */}
      {isLaptop && (
        <div style={{flex: "1 1 auto", minWidth: 0, overflow: "auto"}}>
          {match
            ? <div><MatchLayout {...match}/></div>
            : <div><AllResources/></div>}
        </div>
      )}

      {/* Chat panel: always rendered, never unmounted */}
      <div style={isLaptop
        ? {width: "400px", minWidth: "400px", maxWidth: "400px", flex: "0 0 400px", display: "flex", flexDirection: "column", overflow: "hidden"}
        : {width: "100%", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden"}
      }>
        <ChatPage isLaptop={isLaptop} setMatch={setMatch}/>
      </div>
    </div>
  );
}
