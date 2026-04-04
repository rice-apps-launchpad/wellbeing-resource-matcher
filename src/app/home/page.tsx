'use client';
import DesktopLayout from "@/components/layout";
import MatchLayout from "@/app/devi/page"
import ChatPage from "@/app/chat/page"
import AllResources from "@/app/all_resources/all_resources"
import {useState, useEffect} from "react";
import {Match} from "@/data/chat-message"

export default function Page() {
  // new for laptop-mobile screen changing
  // set to false initially -> if screen detects a laptop view-> switch
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


  if (!isLaptop) {
    return (
      <main className="w-full h-screen">
        <ChatPage isLaptop={isLaptop} setIsLaptop={setLaptop} setMatch={setMatch}/>
      </main>
    );
  }

  return (
    <DesktopLayout
      leftContent={match
        ? <div><MatchLayout {...match}/></div>
        : <div><AllResources/></div>}
      chatContent={<div><ChatPage isLaptop={isLaptop} setIsLaptop={setLaptop} setMatch={setMatch}/></div>}
    />
  );
}
