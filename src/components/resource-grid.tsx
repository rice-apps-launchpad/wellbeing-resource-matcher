'use client';

import { useEffect, useState } from 'react';
import SmallPopup from "@/components/small-popup/small-popup";
import { callSheetsWithRows, FullResource } from "@/app/sheets/backend";

const gridContainer: React.CSSProperties = {
  display: "grid",
  textAlign: "start",
  gridTemplateColumns: "repeat(auto-fit, 380px)",
  justifyContent: "center",
  gap: "48px",
  width: "100%",
};

export default function ResourceGrid() {
  const [resources, setResources] = useState<FullResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadResources() {
      try {
        const data = await callSheetsWithRows();
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
    <div style={gridContainer}>
      {resources.map((resource) => (
        <SmallPopup
          key={resource.row}
          image={resource.image.startsWith('/') ? resource.image : `/${resource.image}`}
          resourceName={resource.resourceName}
          description={resource.description}
          website={resource.website || '#'}
        />
      ))}
    </div>
  );
}
