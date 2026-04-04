'use client';

import {useEffect, useState} from 'react';
import SmallPopup from "@/components/small-popup/small-popup";
import {callSheets} from "@/app/sheets/backend";

const styles = {
  gridTitle: {
    color: "#7C7E7F",
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
  gridContainer: {
    display: "grid",
    textAlign: "start",
    gridTemplateColumns: "repeat(auto-fit, 380px)",
    justifyContent: "center",
    gap: "48px",
    width: "100%",
  },
} as const;

export default function All_resources() {
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

  if (isLoading) return <div style={{padding: "40px"}}>Loading Rice Resources...</div>;

  return (
    <div style={styles.gridTitle}>
      <h1>
        <b>Resource Matcher</b>
      </h1>
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
    </div>
  )
    ;
}
