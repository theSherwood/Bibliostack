export default theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 8,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    },
    [theme.breakpoints.down(400)]: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    [theme.breakpoints.down(400)]: {
      marginTop: theme.spacing.unit
    },
    background: "transparent",
    boxShadow: "none"
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    background: "transparent",
    borderRadius: "10000px",
    "&:hover": {
      background: "rgba(255,255,255,.3)"
    }
  },
  input: {
    "&::before": {
      borderBottom: "solid 1px white"
    }
  }
});
