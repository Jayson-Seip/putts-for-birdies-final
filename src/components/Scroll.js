import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//To scroll to the top of the page when the user navigates to a new page
const Scroll = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default Scroll;
