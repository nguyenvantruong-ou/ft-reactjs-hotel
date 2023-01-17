import { useEffect, useState } from "react";
import "../index.css";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <>
      <div
        onClick={scrollToTop}
        style={{ display: visible ? "inline" : "none" }}
        className="back-to-top"
        value="Top"
      >
        <i class="fa fa-angle-double-up" aria-hidden="true"></i>
      </div>
    </>
  );
};

export default ScrollToTopButton;
