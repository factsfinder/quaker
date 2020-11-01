import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <footer>
        <p>
          Coded by{" "}
          <a className="link" href="https://factsfinder.github.io">
            Phanindra Veera
          </a>
        </p>
        <p>
          Developed with &#10084; using React. Find the code at{" "}
          <a className="link" href="https://github.com/factsfinder/quaker.git">
            Github
          </a>
        </p>
        <p></p>
        <p>
          Earthquakes data is obtained by the{" "}
          <a
            className="link"
            href="https://earthquake.usgs.gov/fdsnws/event/1/"
            target="_blank"
            rel="noreferrer"
          >
            United States Geological Survey's API
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Footer;
