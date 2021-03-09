import React from "react"
import { Link } from "gatsby"
import { Button, makeStyles, Typography } from "@material-ui/core"
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore"
import NavigateNextIcon from "@material-ui/icons/NavigateNext"

const useStyles = makeStyles(theme => ({
  pagination: {
    display: "flex",
    marginTop: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
    },
  },
  prevPage: {
    textTransform: "none",
    marginRight: "auto",
    maringLeft: theme.spacing(2),
    justifyContent: "flex-start",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  prevPageText: {
    marginLeft: theme.spacing(1),
  },
  nextPage: {
    textTransform: "none",
    marginLeft: "auto",
    marginRight: theme.spacing(2),
    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  nextPageText: {
    textAlign: "right",
    marginRight: theme.spacing(1),
  },
  pageTitle: {
    width: "20ch",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}))

function Pagination({ prev, next }) {
  const classes = useStyles()

  return (
    <nav className={classes.pagination}>
      {prev && (
        <Button
          className={classes.prevPage}
          component={Link}
          to={prev.to}
          startIcon={<NavigateBeforeIcon />}
        >
          <div className={classes.prevPageText}>
            <Typography color="textSecondary">Previous</Typography>
            {prev.title && (
              <Typography className={classes.pageTitle}>
                {prev.title}
              </Typography>
            )}
          </div>
        </Button>
      )}
      {next && (
        <Button
          className={classes.nextPage}
          component={Link}
          to={next.to}
          endIcon={<NavigateNextIcon />}
        >
          <div className={classes.nextPageText}>
            <Typography color="textSecondary">Next</Typography>
            {next.title && (
              <Typography className={classes.pageTitle}>
                {next.title}
              </Typography>
            )}
          </div>
        </Button>
      )}
    </nav>
  )
}

export default Pagination
