const styles = {
    container: {
        height: "100vh",
        width: "100vw",
        display: "flex",
    },

    left:{
        flex: "1 1 auto",
        minWidth: 0,
        overflow: "auto",
        padding: "24px",
    },

    chat: {
        width: "380px",
        flex: "0 0 380px",
        flexShrink: 0,
        flexDirection: "column",
        display: "flex",
    },
};

export default function DesktopLayout({ leftContent, chatContent }) {
    return (
        <div style={styles.container}>
            <div style={styles.left}>{leftContent}</div>
            <div style={styles.chat}>{chatContent}</div>
        </div>
    );
}

