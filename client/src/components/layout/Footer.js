import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  footer: {
    position: "absolute",
    bottom: "0px",
    left: "0px",
    right: "0px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  type: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit
  }
});

function Footer({ classes }) {
  return (
    <footer className={classes.footer}>
      <span className={classes.type}>
        Copyright &copy; 2019{" "}
        <a
          href="https://github.com/theSherwood"
          title="Freepik"
          target="_blank"
          rel="noopener noreferrer"
        >
          Adam Sherwood
        </a>
      </span>
      <span className={classes.type}>
        <span>
          Icons made by{" "}
          <a
            href="https://www.freepik.com/"
            title="Freepik"
            target="_blank"
            rel="noopener noreferrer"
          >
            Freepik
          </a>{" "}
          from{" "}
          <a
            href="https://www.flaticon.com/"
            title="Flaticon"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.flaticon.com
          </a>
        </span>
      </span>
    </footer>
  );
}

export default withStyles(styles)(Footer);
