export default theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    [theme.breakpoints.up(700 + theme.spacing.unit * 3 * 2)]: {
      width: 700,
      marginLeft: "auto",
      marginRight: "auto"
    },
    [theme.breakpoints.down(600)]: {
      width: "100%",
      marginLeft: 0,
      marginRight: 0
    }
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    marginBottom: theme.spacing.unit * 6,
    [theme.breakpoints.down(600)]: {
      paddingTop: 0,
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      marginTop: 0
    },
    background: "transparent",
    boxShadow: "none"
  },
  avatar: {
    margin: theme.spacing.unit
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  book: {
    transition: "opacity 2000ms ease-in"
  }
});
