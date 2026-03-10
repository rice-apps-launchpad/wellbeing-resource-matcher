'use client';
import DesktopLayout from "@/components/layout";
import MatchLayout from "@/app/devi/page"
import ChatPage from "@/app/chat/page"
import {useState, useEffect} from "react";

export default function Page() {
  // new for laptop-mobile screen changing
  // set to false initially -> if screen detects a laptop view-> switch
  const [isLaptop, setLaptop] = useState(false)

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
        <ChatPage isLaptop={isLaptop} setIsLaptop={setLaptop}/>
      </main>
    );
  }

  return (
    <DesktopLayout
      leftContent={<div><MatchLayout/></div>}
      chatContent={<div><ChatPage isLaptop={isLaptop} setIsLaptop={setLaptop}/></div>}
    />
  );
}
