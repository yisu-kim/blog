import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"

function Copyright({ name }) {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {`Copyright © ${name} ${new Date().getFullYear()}.`}
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  footer: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
  },
}))

export default function Footer({ name }) {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Copyright name={name} />
      </Container>
    </footer>
  )
}

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
}
