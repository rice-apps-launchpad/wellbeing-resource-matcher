import React, { useState } from "react";

const styles: Record<string, React.CSSProperties> = {
    container: {
        height: "100vh",
        width: "100vw",
        display: "flex",
        overflow: "hidden",
    },

    left:{
        flex: "1 1 auto",
        minWidth: 0,
        overflow: "auto",
    },

    chat: {
        width: "400px",
        minWidth: "400px",
        maxWidth: "400px",
        flex: "0 0 400px",
        flexShrink: 0,
        flexDirection: "column",
        display: "flex",
        overflow: "hidden",
    },
};


type DesktopLayoutProps = {
    leftContent: React.ReactNode;
    chatContent: React.ReactNode;
};


export default function DesktopLayout({ leftContent, chatContent }: DesktopLayoutProps) {
    return (
        <div style={styles.container}>
            <div style={styles.left}>{leftContent}</div>
            <div style={styles.chat}>{chatContent}</div>
        </div>
    ); 
}

