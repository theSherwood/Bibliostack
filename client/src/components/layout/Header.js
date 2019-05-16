// import React from "react";
// import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { logoutUser } from "../../actions/authActions";

// function Header(props) {
//   const { auth } = props;

//   const onLogoutClick = e => {
//     props.logoutUser();
//   };
//   return (
//     <header style={{ background: "steelblue" }}>
//       <div>
//         <h4 style={{ display: "inline-block" }}>Header</h4>
//       </div>
//     </header>
//   );
// }

// Header.propTypes = {
//   auth: PropTypes.object.isRequired,
//   logoutUser: PropTypes.func.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth
// });

// export default connect(
//   mapStateToProps,
//   { logoutUser }
// )(Header);

import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Collapse from "@material-ui/core/Collapse";
import Paper from "@material-ui/core/Paper";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function Header(props) {
  const { classes } = props;

  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            BiblioStack
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
        <Collapse in={!isCollapsed}>
          {/* <Paper elevation={4} className={classes.paper}>
            
          </Paper> */}
          <ul>
            <li>words words</li>
            <li>words words</li>
            <li>words words</li>
            <li>words words</li>
          </ul>
        </Collapse>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
