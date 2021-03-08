import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core"
import SearchBar from "./searchBar"
import MenuIcon from "@material-ui/icons/Menu"
import GitHubIcon from "@material-ui/icons/GitHub"

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    "& a": {
      color: theme.palette.common.black,
      textDecoration: "none",
    },
  },
  githubButton: {
    marginLeft: theme.spacing(2),
  },
}))

export default function Header({ title, setSearchQuery, source }) {
  const classes = useStyles()

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
        >
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6" noWrap>
          <Link to="/">{title}</Link>
        </Typography>
        <SearchBar setSearchQuery={setSearchQuery} />
        {source && (
          <IconButton
            edge="end"
            className={classes.githubButton}
            href={source}
            color="inherit"
            aria-label="GitHub repository"
          >
            <GitHubIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  source: PropTypes.string,
}
