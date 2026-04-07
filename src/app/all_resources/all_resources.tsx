'use client';

import ResourceGrid from "@/components/resource-grid";

const styles = {
  gridTitle: {
    color: "var(--resource-title)",
    textAlign: "center",
    fontFamily: "Noto Serif",
    maxWidth: "900px",
    margin: "0 auto",
    fontSize: "45px",
  },
  layoutWrapper: {
    width: "100%",
    margin: "0",
    padding: "40px",
    boxSizing: "border-box",
  },
} as const;

export default function All_resources() {
  return (
    <div style={styles.gridTitle}>
      <h1>
        <b>Resource Matcher</b>
      </h1>
      <div style={styles.layoutWrapper}>
        <ResourceGrid />
      </div>
    </div>
  );
}