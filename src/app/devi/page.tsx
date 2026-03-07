import BigPopup from "@/components/big-popup/big-popup";
import SmallPopup from "@/components/small-popup/small-popup";

export default function Page() {
    const otherResources = [
        { title: "Registrar", image: "/registrar.jpg", descrip: "https://registrar.rice.edu/" },
        { title: "Lovett Hall", image: "/lovett.jpg", descrip: "Idk what to say about this" },
        { title: "CCD", image: "/ccd.jpeg", descrip: "View more details" },
        { title: "Student Health", image: "/oaa.jpg", descrip: "View more details" }, 
        { title: "Petitions & Special Requests", image: "/lovett.jpg", descrip: "https://dou.rice.edu/student-resources/academic/petitions-special-requests" },
        {title: "Another Resource here", image: "/ccd.jpeg", descrip: "More stuff about it"}
    ];

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
            <section style={{ maxWidth: "1000px", margin: "0 auto", width: "100%" }}>
                <BigPopup 
                    imageSrc="/oaa.jpg" 
                    title="Office of Academic Advising" 
                    description = "The Office of Academic Advising at Rice University strives for an unparalleled environment for undergraduates to explore opportunities, identify, goals, and implement plans to reach those goals." 
                />
            </section>

          
            <section style={{ maxWidth: "1000px", margin: "0 auto", width: "100%" }}>
                <h2 style={{ marginBottom: "20px", fontSize: "24px", fontWeight: "bold", color: "#00205B" }}>
                    Other Matches
                </h2>
                
                <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "1fr 1fr",
                    gap: "25px",
                    width: "100%"
                }}>
                    {otherResources.map((res, index) => (
                        <SmallPopup 
                            key={index}
                            image={res.image}
                            title={res.title}
                            descrip={res.descrip}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}