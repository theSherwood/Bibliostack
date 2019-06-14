import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import IconAU from "./IconAU";
import IconCA from "./IconCA";
import IconUK from "./IconUK";
import IconUS from "./IconUS";

const styles = theme => ({
  invsblebtn: {
    outline: "none",
    background: "transparent",
    border: "none",
    borderRadius: "100%",
    boxShadow: "0 0 15px 5px rgba(0, 0, 0, 0.25)",
    padding: 0,
    width: "min-content",
    margin: "0px 10px",
    transform: "scale(1.5, 1.5)"
  },
  countrypicker: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  }
});

const countries = {
  "EBAY-US": IconUS,
  "EBAY-ENCA": IconCA,
  "EBAY-GB": IconUK,
  "EBAY-AU": IconAU
};

const getIcon = countryCode => countries[countryCode] || countries["EBAY-US"];

const CountryPicker = ({ countryCode, updateCountryCode, classes }) => {
  const [showIcons, setShowIcons] = useState(false);

  const CountryIcon = getIcon(countryCode);

  const handleClick = code => {
    if (showIcons) updateCountryCode(code);
    setShowIcons(!showIcons);
  };

  return (
    <div className={classes.countrypicker}>
      <button
        className={classes.invsblebtn}
        onClick={() => handleClick(countryCode)}
      >
        <CountryIcon size="24" />
      </button>

      {showIcons
        ? Object.entries(countries)
            .filter(([code, Icon]) => code !== countryCode)
            .map(([code, Icon]) => (
              <button
                className={classes.invsblebtn}
                onClick={() => handleClick(code)}
              >
                <Icon size="24" />
              </button>
            ))
        : null}

      {/* <div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> */}
    </div>
  );
};

export default withStyles(styles)(CountryPicker);
