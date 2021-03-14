/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import {
  Container,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core"
import GitHubIcon from "@material-ui/icons/GitHub"

const useStyles = makeStyles(theme => ({
  bio: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(3),
  },
  githubButton: {
    marginLeft: theme.spacing(1),
  },
}))

export default function Bio() {
  const classes = useStyles()
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            github
          }
        }
      }
    }
  `)

  const {
    site: {
      siteMetadata: { author: { name, summary } = {}, social: { github } = {} },
    },
  } = data

  return (
    <Container className={classes.bio}>
      <Typography variant="body2" component="span">
        Written by <strong>{name}</strong> {summary || null}
      </Typography>
      {github && (
        <IconButton
          className={classes.githubButton}
          href={`https://github.com/${github}`}
          aria-label="GitHub"
          color="inherit"
        >
          <GitHubIcon />
        </IconButton>
      )}
    </Container>
  )
}
