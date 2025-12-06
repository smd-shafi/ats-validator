import React, { useEffect } from "react";
import Lottie from "react-lottie-player";
import lottieJson from "./loading.json";

export default function Loading({ isLoading }) {
  useEffect(() => {
    // Disable scroll when loading
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div style={styles.overlay}>
      <Lottie
        loop
        play
        animationData={lottieJson}
      />
    </div>
  );
}

const styles = {
  overlay: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.6)", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    backdropFilter: "blur(3px)",
  },
};
