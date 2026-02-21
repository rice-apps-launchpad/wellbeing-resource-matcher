import SmallPopup from "@/components/small-popup/small-popup";

const styles = {
  layoutWrapper: {
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
    padding: "40px",
    backgroundColor: "#ffffff",
    boxSizing: "border-box",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "48px",
    width: "100%",
  },
} as const;

export default function Page() {
  return (
    <div style={styles.layoutWrapper}>
      {/* TODO: Grid */}
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
  )
}