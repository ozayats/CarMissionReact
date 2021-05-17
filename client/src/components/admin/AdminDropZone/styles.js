export const dropZone = {
  baseStyle: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
    padding: "40px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#c6d1de",
    borderStyle: "dashed",
    backgroundColor: "#282832",
    color: "#c6d1de",
    outline: "none",
    cursor: "pointer",
    textAlign: "center",
    transition: "border .24s ease-in-out",
  },
  activeStyle: {
    borderColor: "#2196f3",
  },
  acceptStyle: {
    borderColor: "#00e676",
    color: "#00e676",
  },
  rejectStyle: {
    borderColor: "#ff1744",
    color: "#ff1744",
  },
};

export const previewStyles = {
  thumbsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  thumb: {
    display: "inline-flex",
    justifyContent: "center",
    maxWidth: 250,
    height: 100,
    padding: 4,
    boxSizing: "border-box",
  },
  thumbInner: {
    display: "flex",
    justifyContent: "center",
    minWidth: 0,
  },
  img: {
    display: "block",
    width: "auto",
    height: "100%",
    backgroundColor: "white",
  },
};
