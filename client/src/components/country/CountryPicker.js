import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import IconAU from "./IconAU";
import IconCA from "./IconCA";
import IconUK from "./IconUK";
import IconUS from "./IconUS";
import { red } from "@material-ui/core/colors";

const styles = theme => ({
  invsblebtn: {
    outline: "none",
    background: "transparent",
    border: "none",
    borderRadius: "100%",
    boxShadow: "0 0 15px 5px rgba(0, 0, 0, 0.25)",
    padding: 0,
    width: "min-content",
    margin: theme.spacing.unit,
    transition: "transform 100ms ease-in",
    "&:hover": {
      transform: "scale(1.25)"
    }
  },
  countrypicker: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    width: "max-content",
    "& .alternate": {
      transition: "transform 100ms ease-in",
      transform: "translateX(40px) scale(0.01)"
    },
    "&:hover .alternate": {
      transform: "scale(1)"
    },
    "&:hover .alternate:hover": {
      transform: "scale(1.25)"
    }
  },
  countrycontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
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
  const [alternateCountries, setAlternateCountries] = useState(
    Object.keys(countries).filter(code => code !== countryCode)
  );

  const CountryIcon = getIcon(countryCode);

  const handleClick = code => {
    if (showIcons) {
      const newAlternates = alternateCountries.map(country => {
        return country === code ? countryCode : country;
      });
      setAlternateCountries(newAlternates);
      updateCountryCode(code);
    }
    setShowIcons(!showIcons);
  };

  const handleMouseEnter = e => {
    setShowIcons(true);
  };

  const handleMouseLeave = e => {
    setShowIcons(false);
  };

  return (
    <div className={classes.countrycontainer}>
      <div
        className={classes.countrypicker}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {alternateCountries.map(code => {
          const Icon = getIcon(code);
          return (
            <button
              key={code}
              className={`${classes.invsblebtn} alternate`}
              onClick={() => handleClick(code)}
            >
              <Icon size="24" />
            </button>
          );
        })}
        <button
          className={`${classes.invsblebtn} primary`}
          onClick={() => handleClick(countryCode)}
        >
          <CountryIcon size="24" />
        </button>

        {/* <div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> */}
      </div>
    </div>
  );
};

export default withStyles(styles)(CountryPicker);
