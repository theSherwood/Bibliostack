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
    boxShadow: "0 0 10px 3px rgba(0, 0, 0, 0.25)",
    padding: 0,
    width: "min-content",
    margin: theme.spacing.unit,
    filter: "saturate(0.4)",
    transition: "transform 100ms ease-in, filter 100ms ease-in",
    "&:hover": {
      transform: "scale(1.25)",
      filter: "saturate(1)"
    }
  },
  countrypicker: {
    margin: theme.spacing.unit,
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
  },
  buttonOverlay: {
    position: "absolute"
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
              aria-label={"country code: " + code}
            >
              <Icon size="24" />
              <div className={classes.buttonOverlay} />
            </button>
          );
        })}
        <button
          className={`${classes.invsblebtn} primary`}
          onClick={() => handleClick(countryCode)}
          aria-label={"country code: " + countryCode}
        >
          <CountryIcon size="24" />
          <div className={classes.buttonOverlay} />
        </button>
      </div>
    </div>
  );
};

export default withStyles(styles)(CountryPicker);
