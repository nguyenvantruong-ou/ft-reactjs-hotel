import { useEffect, useState } from "react";
import "../index.css";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.location.href.length != 22)
      document.getElementsByClassName("background-header")[0].style.background =
        "black";
  }, []);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 100) {
      setVisible(true);
      document.getElementsByClassName("background-header")[0].style.position =
        "fixed";
      document.getElementsByClassName("background-header")[0].style.top = 0;
      document.getElementsByClassName("background-header")[0].style.background =
        "black";
      document.getElementsByClassName("background-header")[0].style.transition =
        "background 1s";
    } else if (scrolled <= 100) {
      setVisible(false);
      document.getElementsByClassName("background-header")[0].style.position =
        "relative";
      if (
        window.location.href.length == 22 ||
        window.location.href == "http://localhost:3000/#rooms"
      )
        document.getElementsByClassName(
          "background-header"
        )[0].style.background = "hsla(0, 0%, 0%, 0)";
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
