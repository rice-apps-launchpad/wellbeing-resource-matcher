import SmallPopup from "@/components/small-popup/small-popup";

export default function MobileScreen() {
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
                padding: "16px 12px",
                gap: "40px",
                minHeight: "auto", 
                overflowY: "auto",
                maxHeight: "100%",
            }}>
                {/* Top Featured Match */}              
                <section style={{ maxWidth: "1000px", margin: "0 auto", width: "100%" }}>
                    <h2 style={{ marginBottom: "20px", fontSize: "24px", fontWeight: "bold", color: "#00205B" }}>
                        Matches
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