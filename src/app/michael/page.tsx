import SmallPopup from "@/components/small_popup/small_popup"
export default function Page() {
    return(
      
       <SmallPopup image = "lovett.jpg" title = "Petitions & Special Requests" descrip = "https://dou.rice.edu/student-resources/academic/petitions-special-requests"/>
    )
}



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