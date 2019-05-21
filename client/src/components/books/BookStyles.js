export default theme => ({
  root: {
    width: "100%"
  },
  summary: {
    boxShadow:
      "0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)",
    [theme.breakpoints.down(600)]: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2
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
    width: "100%"
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
  }
});
