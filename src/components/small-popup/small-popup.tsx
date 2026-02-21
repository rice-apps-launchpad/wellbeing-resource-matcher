import Image from 'next/image';

const styles = {
  card: {
    width: "100%",
    borderRadius: "40px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#00205B",
  },

  imageContainer: {
    width: "100%",
    aspectRatio: "16 / 9",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  image: {
    objectFit: "cover",
  },

  textContainer: {
    padding: "60px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  title: {
    color: "white",
    fontSize: "20px",
    marginTop: "15px",
    marginLeft:"25px",
    marginRight:"25px",
    fontFamily: "serif",
    fontWeight: "bold",
    lineHeight: "1.1",
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
} as const;


interface SmallProps {
    image: string;
    title: string;
    descrip: string;

}

export default function SmallPopup({
    image,
    title,
    descrip
}: SmallProps){
  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <Image
        src={image}
        alt={title}
        fill
        style={styles.image} />
      </div>

      <div style={styles.textContainer}>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.description}>{descrip}</p>
      </div>
    </div>
  );
}


