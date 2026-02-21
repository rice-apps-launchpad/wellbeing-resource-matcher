import SmallPopup from "@/components/small-popup/small-popup";

const styles = {
    gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px",
    padding: "10px",
},
}



export default function Page() {
  return (
    // TODO: Grid
    <div style={styles.gridContainer}>
      <SmallPopup image="/ccd.jpeg" title="Sample Resource" descrip="This is a description of a resource" />
      <SmallPopup image="/ccd.jpeg" title="Sample Resource" descrip="This is a description of a resource" />
      <SmallPopup image="/ccd.jpeg" title="Sample Resource" descrip="This is a description of a resource" />
      <SmallPopup image="/ccd.jpeg" title="Sample Resource" descrip="This is a description of a resource" />
    </div>
  )
}