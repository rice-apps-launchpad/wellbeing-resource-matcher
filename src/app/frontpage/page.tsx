const styles = {
  // bubble
    bubble: {
      maxWidth: "200px",
      display: "inline-block",
      borderRadius: "10px",
      padding: "4px",
      overflowWrap: "break-word",
    },

    userBubble: {
      color: "white",
      backgroundColor: "#3E5C93",
      border: "1px solid #3E5C93",
    },

    aiBubble: {
      color: "black",
      backgroundColor: "#FFFFFF",
      border: "1px solid #BEBFBF",
    },
} as const;

export default function MessageBubble() {
  return (
    <div>
    <div style={{...styles.bubble, ...styles.userBubble}}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt?
    </div>
    <div style={{...styles.bubble, ...styles.aiBubble}}>
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem: 
      Office of Academic Advising. 
      udantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi.
    </div>
    </div>
  );
}