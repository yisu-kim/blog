import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import {
  AppBar,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  SwipeableDrawer,
  Toolbar,
} from "@material-ui/core"
import SearchBar from "./searchBar"
import MenuIcon from "@material-ui/icons/Menu"
import HomeIcon from "@material-ui/icons/Home"
import LabelIcon from "@material-ui/icons/Label"
import GitHubIcon from "@material-ui/icons/GitHub"

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  list: {
    width: 250,
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

export default function Header({ setSearchQuery, source }) {
  const classes = useStyles()
  const [state, setState] = useState({
    isDrawerOpen: false,
  })

  const toggleDrawer = open => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }

    setState({ ...state, isDrawerOpen: open })
  }

  const list = menuItems => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map(menu => (
          <ListItem button key={menu.text} component={Link} to={menu.url}>
            <ListItemIcon>{menu.icon}</ListItemIcon>
            <ListItemText primary={menu.text} />
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <SwipeableDrawer
          open={state.isDrawerOpen}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {list([
            { text: "Home", url: "/", icon: <HomeIcon /> },
            { text: "All tags", url: "/tags", icon: <LabelIcon /> },
          ])}
        </SwipeableDrawer>
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
  setSearchQuery: PropTypes.func.isRequired,
  source: PropTypes.string,
}
