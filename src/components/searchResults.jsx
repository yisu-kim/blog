import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import flexSearch from "../utils/flexSearch"
import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  results: {
    marginTop: theme.spacing(2),
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "34ch",
  },
  item: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  itemText: {
    "& span": {
      fontSize: "small",
    },
  },
}))

export default function SearchResults({ searchQuery }) {
  const classes = useStyles()

  const data = useStaticQuery(graphql`
    query {
      localSearchPages {
        index
        store
      }
    }
  `)

  const {
    localSearchPages: { index, store },
  } = data

  const results = flexSearch(searchQuery, index, store).slice(0, 3)
  const unflattenResults = results =>
    results.map(post => {
      const { slug, title, tags } = post
      return {
        fields: { slug },
        frontmatter: { title, tags },
      }
    })
  const posts = searchQuery && unflattenResults(results)

  return (
    <>
      {searchQuery && (
        <Paper className={classes.results} elevation={1}>
          {posts.length > 0 ? (
            <List component="ol">
              {posts.map(post => {
                const {
                  fields: { slug },
                  frontmatter: { title, tags },
                } = post

                return (
                  <ListItem
                    key={slug}
                    component={Link}
                    to={slug}
                    className={classes.item}
                    button
                  >
                    <ListItemText
                      primary={title}
                      secondary={tags.map(tag => `#${tag}`).join(" ")}
                      className={classes.itemText}
                    />
                  </ListItem>
                )
              })}
            </List>
          ) : (
            <List>
              <ListItem>
                <ListItemText>Sorry, no blog posts found. :(</ListItemText>
              </ListItem>
            </List>
          )}
        </Paper>
      )}
    </>
  )
}
