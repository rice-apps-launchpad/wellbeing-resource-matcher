import DesktopLayout from "@/components/layout";
import MatchLayout from "@/app/devi/page"
import ChatPage from "@/app/chat/page"
import { SetStateAction, useState } from "react";

export default function Page() {
  const [isLaptop, setLaptop] = useState(false)
  return (
    <DesktopLayout
      leftContent={<div><MatchLayout></MatchLayout></div>}
      chatContent={<div><ChatPage isLaptop={isLaptop} setIsLaptop={setLaptop}></ChatPage></div>}
    />
  );
}