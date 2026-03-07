import BigPopup from "@/components/big-popup/big-popup"; 
import SmallPopup from "@/components/small-popup/small-popup";

export default function MatchResultsPage() {
  const matches = [
    { title: "Registrar", image: "/registrar.jpg", descrip: "View more details" },
    { title: "Lovett College", image: "/lovett.jpg", descrip: "View more details" },
    { title: "Center for Civic Leadership", image: "/ccl.jpeg", descrip: "View more details" },
  ];

  return (
    <main style={{ 
      padding: "20px", 
      display: "flex", 
      flexDirection: "column", 
      gap: "24px",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh"
    }}>
      
      {/* Top Match - Stays at the top */}
      <section>
        <BigPopup 
          imageSrc="/oaa.jpg" 
          title="Office of Academic Advising" 
          description="The Office of Academic Advising at Rice University strives for an unparalleled environment for undergraduates to explore opportunities, identify goals, and implement plans to reach their goals." 
        />
      </section>

      {/* Scrollable List of Other Matches */}
      <section style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
        gap: "20px",
        paddingBottom: "40px" 
      }}>
        {matches.map((item, index) => (
          <SmallPopup 
            key={index}
            title={item.title}
            image={item.image}
            descrip={item.descrip}
          />
        ))}
      </section>

    </main>
  );
}