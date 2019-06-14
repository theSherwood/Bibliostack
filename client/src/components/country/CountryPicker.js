import React from "react";
import IconAU from "./IconAU";
import IconCA from "./IconCA";
import IconUK from "./IconUK";
import IconUS from "./IconUS";

const countries = {
  "EBAY-US": IconUS,
  "EBAY-ENCA": IconCA,
  "EBAY-GB": IconUK,
  "EBAY-AU": IconAU
};

const getIcon = countryCode => countries[countryCode] || countries["EBAY-US"];

const CountryPicker = ({ countryCode, updateCountryCode }) => {
  return (
    <div>
      {Object.entries(countries).map(([code, Svg]) => (
        <Svg size="24" />
      ))}

      {/* <div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> */}
    </div>
  );
};

export default CountryPicker;
