import React from "react";
import { withStyles, Typography, Link } from "@material-ui/core";

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
  typo: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit
  }
});

function Footer({ classes }) {
  return (
    <footer className={classes.footer}>
      <Typography className={classes.typo}>
        Copyright &copy; 2019 Adam Sherwood
      </Typography>
      <Typography className={classes.typo}>
        <span>
          Icons made by{" "}
          <Link href="https://www.freepik.com/" title="Freepik">
            Freepik
          </Link>{" "}
          from{" "}
          <Link href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </Link>
        </span>
      </Typography>
    </footer>
  );
}

export default withStyles(styles)(Footer);
