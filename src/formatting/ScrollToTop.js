import React ,{ useEffect } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

  return null;
};

export default ScrollToTop; 