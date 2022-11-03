import React ,{ useEffect } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

const ScrollToTop = ({ children, location: { pathname } }) => {
  useEffect(() => {
    document.getElementById('scrollhere').scrollIntoView();
  }, []);

  
  return children || null;
};

export default withRouter(ScrollToTop);