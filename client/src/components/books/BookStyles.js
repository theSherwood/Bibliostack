export default theme => ({
  root: {
    width: "100%",
    height: "max-content",
    opacity: "0",
    transition: "opacity 200ms ease-in",
    "&.book-enter-active": {
      border: ""
    },
    "&.book-enter-done": {
      opacity: "1"
    }
  },
  expandpanel: {
    background: "transparent",
    boxShadow: "none"
  },
  summary: {
    boxShadow:
      "0px 1px 5px 0px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 3px 1px -2px rgba(0,0,0,0.12)",
    background: "transparent",
    "&:hover": {
      background: "rgba(255,255,255,.3)"
    },
    // background: "rgba(255,255,255,0.3) !important",
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    borderRadius: "10000px",
    [theme.breakpoints.down(600)]: {
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      borderRadius: "15px"
    }
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20
  },
  details: {
    alignItems: "center",
    paddingBottom: "10px"
  },
  column: {
    flexBasis: "33.33%"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  gridItem: {
    [theme.breakpoints.down(600)]: {
      paddingLeft: theme.spacing.unit,
      paddingTop: 2,
      paddingBottom: 2
    }
  },
  grow: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    "&&": {
      paddingRight: 0
    }
  },
  textField: {
    width: "100%",
    "& div::before": {
      borderBottom: "solid 1px white"
    }
  },
  ul: {
    padding: 0,
    width: "100%",
    marginBottom: 0
  },
  li: {
    listStyleType: "none"
  },
  actions: {
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    flex: "0 1 0",
    [theme.breakpoints.down(600)]: {
      flexWrap: "wrap"
    },
    marginLeft: theme.spacing.unit
  },
  placeCenter: {
    display: "grid",
    placeItems: "center"
  },
  less: {
    transform: "rotate(180deg)"
  },
  iconButton: {
    color: "transparent",
    "&:hover": {
      background: "rgba(255,255,255,0.3)"
    },
    "&:active": {
      background: "rgba(255,255,255,0.3)"
    },
    "&:focus": {
      background: "rgba(255,255,255,0.3)"
    }
  }
});
