'use client';

import { useEffect, useState } from 'react';
import SmallPopup from "@/components/small-popup/small-popup";
import { callSheets } from "@/app/sheets/backend";

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
  const [resources, setResources] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadResources() {
      try {
        const data = await callSheets();
        setResources(data);
      } catch (error) {
        console.error("Failed to fetch resources:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadResources();
  }, []);

  if (isLoading) return <div style={{ padding: "40px" }}>Loading Rice Resources...</div>;

  return (
    <div style={styles.layoutWrapper}>
      <div style={styles.gridContainer}>
        {resources.map((resource, index) => (
          <SmallPopup
            key={index}
            image={resource.image.startsWith('/') ? resource.image : `/${resource.image}`}
            title={resource.title}
            descrip={resource.descrip}
          />
        ))}
      </div>
    </div>
  );
}