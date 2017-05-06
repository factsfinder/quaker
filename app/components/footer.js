import React from 'react';

const Footer = (props) => {
  return (
    <div className="footer">
      <footer>
        <p>Designed and Developed by <a href="https://factsfinder.me">Phanindra Veera</a></p>
        <p>Developed with &#10084; using React and Redux. Find the code at <a href="https://github.com/factsfinder/quaker.git">Github</a> </p>
        <p></p>
        <p>Earthquakes data is obtained by the <a href="https://earthquake.usgs.gov/fdsnws/event/1/" target="_blank">United States Geological Survey's API</a></p>
      </footer>
    </div>
  );
}

export default Footer;
