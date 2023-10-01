import React from "react";
import "./Footer.css";

function Footer() {
  function currentYear() {
    return new Date().getFullYear();
  }

  return (
    <div className="footer">
      <p>@copyright {currentYear()}</p>
      <p>
        Built by <a href="https://github.com/Jainex17">Jainex</a>
      </p>
    </div>
  );
}

export default Footer;
