import BigPopup from "@/components/big-popup/big-popup";
import {Match} from "@/data/chat-message";
import ResourceGrid from "@/components/resource-grid";
import Image from "next/image";
import {Inter, Noto_Serif} from "next/font/google";

const notoSerif = Noto_Serif({subsets: ["latin"]});
const inter = Inter({subsets: ["latin"]});

function OtherMatchCard({match}: { match: Match }) {
  return (
    <div style={{
      flex: "1 1 220px",
      minWidth: "180px",
      maxWidth: "320px",
      borderRadius: "16px",
      overflow: "hidden",
      backgroundColor: "#00205B",
      boxShadow: "0 10px 30px -8px rgba(0,0,0,0.25)",
      display: "flex",
      flexDirection: "column",
    }}>
      {match.imageSrc && (
        <div style={{width: "100%", height: "120px", position: "relative"}}>
          <Image src={match.imageSrc} alt={match.title} fill style={{objectFit: "cover"}}/>
        </div>
      )}
      <div style={{padding: "16px 20px", color: "white", display: "flex", flexDirection: "column", gap: "6px"}}>
        <h3 className={notoSerif.className} style={{fontSize: "18px", fontWeight: "bold", margin: 0}}>
          {match.title}
        </h3>
        <p className={inter.className} style={{fontSize: "13px", opacity: 0.85, margin: 0, lineHeight: "1.5"}}>
          {match.description}
        </p>
      </div>
    </div>
  );
}

export default function MatchLayout(match: Match) {
  return (
    <main style={{
      display: "flex",
      flexDirection: "column",
      padding: "40px 20px",
      gap: "40px",
      backgroundColor: "var(--match-screen-bg)",
      minHeight: "100vh",
    }}>
      {/* Top Featured Match */}
      <section style={{maxWidth: "800px", margin: "0 auto", width: "100%"}}>
        <BigPopup
          imageSrc={match.imageSrc}
          title={match.title}
          description={match.description}
        />
      </section>

      {/* Other AI-recommended matches */}
      {match.otherMatches && match.otherMatches.length > 0 && (
        <section style={{maxWidth: "800px", margin: "0 auto", width: "100%"}}>
          <h2 style={{marginBottom: "16px", fontSize: "20px", fontWeight: "bold", color: "var(--section-heading)"}}>
            Also consider:
          </h2>
          <div style={{display: "flex", gap: "16px", flexWrap: "wrap"}}>
            {match.otherMatches.map((m, i) => (
              <OtherMatchCard key={i} match={m}/>
            ))}
          </div>
        </section>
      )}

      <section style={{maxWidth: "1000px", margin: "0 auto", width: "100%"}}>
        <h2 style={{marginBottom: "20px", fontSize: "24px", fontWeight: "bold", color: "var(--section-heading)"}}>
          All other resources
        </h2>

        <ResourceGrid/>
      </section>
    </main>
  );
}