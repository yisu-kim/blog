import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Button, Container, makeStyles, Typography } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(8),
    "& p": {
      marginTop: theme.spacing(6),
    },
  },
  homeButton: {
    marginTop: theme.spacing(2),
    width: "auto",
  },
}))

const NotFoundPage = ({ data, location }) => {
  const classes = useStyles()
  const {
    site: {
      siteMetadata: { title },
    },
  } = data

  return (
    <Layout location={location} title={title}>
      <SEO title="404: Not Found" />
      <Container className={classes.container}>
        <Typography variant="h1" color="primary">
          404
        </Typography>
        <Typography variant="h3" color="primary">
          Page Not Found
        </Typography>
        <Typography>
          You just hit a route that doesn't exist... the sadness.
        </Typography>
        <div>
          <Button
            component={Link}
            to="/"
            className={classes.homeButton}
            variant="outlined"
            color="secondary"
          >
            Return to Home
          </Button>
        </div>
      </Container>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
