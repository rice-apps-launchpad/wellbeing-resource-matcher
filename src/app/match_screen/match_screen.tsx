import BigPopup from "@/components/big-popup/big-popup";
import {Match} from "@/data/chat-message";
import ResourceGrid from "@/components/resource-grid";

export default function MatchLayout(match: Match) {
    return (
        <main style={{
            display: "flex",
            flexDirection: "column",
            padding: "40px 20px",
            gap: "40px",
            backgroundColor: "#f8f9fa",
            minHeight: "100vh",
        }}>
            {/* Top Featured Match */}
            <section style={{ maxWidth: "800px", margin: "0 auto", width: "100%" }}>
                <BigPopup
                    imageSrc={match.imageSrc}
                    title={match.title}
                    description={match.description}
                />
            </section>

            <section style={{ maxWidth: "1000px", margin: "0 auto", width: "100%" }}>
                <h2 style={{ marginBottom: "20px", fontSize: "24px", fontWeight: "bold", color: "#00205B" }}>
                    All other resources
                </h2>

                <ResourceGrid />
            </section>
        </main>
    );
}