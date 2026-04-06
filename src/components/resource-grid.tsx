'use client';

import { useEffect, useState } from 'react';
import SmallPopup from "@/components/small-popup/small-popup";
import { callSheets } from "@/app/sheets/backend";

const gridContainer: React.CSSProperties = {
  display: "grid",
  textAlign: "start",
  gridTemplateColumns: "repeat(auto-fit, 380px)",
  justifyContent: "center",
  gap: "48px",
  width: "100%",
};

export default function ResourceGrid() {
  const [resources, setResources] = useState<{ title: string; descrip: string; image: string }[]>([]);
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
    <div style={gridContainer}>
      {resources.map((resource, index) => (
        <SmallPopup
          key={index}
          image={resource.image.startsWith('/') ? resource.image : `/${resource.image}`}
          title={resource.title}
          descrip={resource.descrip}
        />
      ))}
    </div>
  );
}