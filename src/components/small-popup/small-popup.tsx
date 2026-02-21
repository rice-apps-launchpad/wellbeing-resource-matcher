import Image from 'next/image';
import {Inter, Noto_Serif} from 'next/font/google';

// https://nextjs.org/docs/app/getting-started/fonts
const inter = Inter({ subsets: ['latin'] });
const notoSerif = Noto_Serif({ subsets: ['latin'] });

const styles = {
  card: {
    width: "100%",
    borderRadius: "25px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#00205B",
  },

  imageContainer: {
    width: "100%",
    aspectRatio: "3 / 1",
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
    paddingTop: "20px",
    paddingBottom: "30px",
    paddingLeft: "30px",
    paddingRight: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  title: {
    color: "white",
    fontSize: "24px",
    fontWeight: "bold",
    lineHeight: "1.1",
  },

  description: {
    color: "white",
    fontSize: "15px",
    textDecoration: "underline",
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
        <h2 className={notoSerif.className} style={styles.title}>{title}</h2>
        <p className={inter.className} style={styles.description}>{descrip}</p>
      </div>
    </div>
  );
}


