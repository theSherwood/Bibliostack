import React from "react";

const countryCode = {
  "EBAY-US": "",
  "EBAY-ENCA": "",
  "EBAY-GB": "",
  "EBAY-AU": ""
};

const CountryPicker = () => {
  return (
    <div>
      <select>
        {Object.keys(countryCode).map(code => (
          <option>{code}</option>
        ))}
      </select>
    </div>
  );
};

export default CountryPicker;
