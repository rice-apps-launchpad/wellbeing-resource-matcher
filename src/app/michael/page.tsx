import DesktopLayout from "@/components/layout";
import MatchLayout from "@/app/devi/page"
import ChatPage from "@/app/chat/page"

export default function Page() {
  return (
    <DesktopLayout
      leftContent={<div><MatchLayout></MatchLayout></div>}
      chatContent={<div><ChatPage></ChatPage></div>}
    />
  );
}