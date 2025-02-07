import { useState, useEffect } from "react";


  // Helper functions to manage media query
const getOuterRadius = () => {
  if (typeof window !== "undefined") {
    return window.innerWidth <= 768 ? "80%" : "90%";
  }
  return "75%";
};

const getCx = () => {
  if (typeof window !== "undefined") {
      return window.innerWidth <= 768 ? 150 : 250; 
  }
  return 250;
};
  
const handleHideTickMarks = () => {
  if (typeof window !== "undefined") {
    return window.innerWidth <= 768;
  }
  return false;
};
  


const useRadarMediaQuery = () => {
  // States
  const [outerRadius, setOuterRadius] = useState(getOuterRadius());
  const [cx, setCx] = useState(getCx());
  const [isTickMarksHidden, setIsTickMarksHidden] = useState(handleHideTickMarks());

  useEffect(() => {
    const handleResize = () => {
      setOuterRadius(getOuterRadius());
      setCx(getCx());
      setIsTickMarksHidden(handleHideTickMarks());
    };


    window.addEventListener("resize", handleResize);


    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { outerRadius, cx, isTickMarksHidden };
};

export default useRadarMediaQuery;
