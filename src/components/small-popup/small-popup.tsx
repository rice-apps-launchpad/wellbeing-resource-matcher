const styles = {
  card: {
    width: "80%",
    height: "250px",
    borderRadius: "40px",
    overflow: "hidden",
    display: "flex" as "flex",
    flexDirection: "column" as "column",
    boxShadow: "0 25px 50px -12px rgba(0 ,0, 0, 0, 0.25)",
    backgroundColor: "#00205B" ,
  },

  imageContainer: {
    // changed width
    width: "80%",
    overflow: "hidden",
    display: "flex" as "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    height: "100%",
    width: "100%",
    objectfit: "cover" as "cover"
  },

  textContainer: {
    padding: "60 px",
    display: "flex",
    flexDirection: "column" as "column",
    gap: "20px",
  },

  title: {
    color: "white",
    fontSize: "20px",
    marginTop: "15px",
    marginLeft:"25px",
    marginRight:"25px", 
    fontFamily: "serif",
    fontWeight: "bold" as "bold",
    lineHeight: "1.1"
  },

  description: {
    color: "white",
    fontSize: "15px",
    textDecoration: "underline",
    marginBottom: "25px",
    marginLeft:"25px",
    marginRight:"25px", 
    fontFamily: "inter"
  
  },
};


interface SmallProps {
    image: string;
    title: string;
    descrip: string;
  
};

export default function SmallPopup({
    image,
    title,
    descrip
}: SmallProps){
  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <img 
        src={image} 
        alt={title} 
        style={styles.image} />
      </div>

      <div style={styles.textContainer}>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.description}>{descrip}</p>
      </div>
    </div>
  );
}


