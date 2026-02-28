import SmallPopup from "@/components/small-popup/small-popup";

const styles = {
  gridTitle: {
    color: "#7C7E7F",
    textAlign: "center",
    fontFamily: "Noto Serif",
    maxWidth: "900px",
    fontSize: "45px",
  },
  layoutWrapper: {
    width: "100%",
    margin: "0",
    padding: "40px",
    boxSizing: "border-box",
  },
  gridContainer: {
    display: "grid",
    textAlign: "start",
    gridTemplateColumns: "repeat(auto-fit, 380px)",
    justifyContent: "start",
    gap: "48px",
    width: "100%",
  },
} as const;

export default function Page() {
  return (
    <div style={styles.gridTitle}>
      <h1>
        <b>Resource Matcher</b>
      </h1>
      <div style={styles.layoutWrapper}>
        <div style={styles.gridContainer}>
          <SmallPopup
            image="/ccd.jpeg"
            title="Office of Academic Advising"
            descrip="https://oaa.rice.edu"
          />
          <SmallPopup
            image="/ccd.jpeg"
            title="Petitions & Special Requests"
            descrip="https://dou.rice.edu/student-resources..."
          />
          <SmallPopup
            image="/ccd.jpeg"
            title="Office of the Registrar"
            descrip="Description text here"
          />
          <SmallPopup
            image="/ccd.jpeg"
            title="Center for Career Development"
            descrip="Description text here"
          />
        </div>
      </div>
    </div>
  );
}
