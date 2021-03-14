import React from "react"
import PropTypes from "prop-types"
import kebabCase from "lodash/kebabCase"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { makeStyles } from "@material-ui/core/styles"
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Hidden,
  List,
  ListItem,
  Typography,
} from "@material-ui/core"
import Img from "gatsby-image"
import Pagination from "../components/pagination"
import muiTheme from "../mui-theme"

const useStyles = makeStyles(theme => {
  theme = { ...muiTheme }
  return {
    card: {
      marginTop: theme.spacing(2),
    },
    cardArea: {
      display: "flex",
    },
    cardDetails: {
      flex: 1,
    },
    cardMedia: {
      width: 160,
      margin: "auto",
      textAlign: "center",
    },
    tags: {
      display: "flex",
      flexDirection: "row",
    },
    tag: {
      marginLeft: theme.spacing(1),
      padding: 0,
      width: "auto",
    },
  }
})

export default function BlogIndex({ data, pageContext }) {
  const classes = useStyles()
  const {
    allMarkdownRemark: { nodes: posts },
  } = data

  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/" : `/page/${currentPage - 1}`
  const nextPage = `/page/${currentPage + 1}`
  const prev = !isFirst && {
    to: prevPage,
  }
  const next = !isLast && {
    to: nextPage,
  }

  return (
    <Layout>
      <SEO title="All posts" />
      {posts.map(post => {
        const {
          excerpt,
          fields: { slug },
          frontmatter: { date, title, description, tags, thumbnail },
        } = post

        return (
          <Card key={slug} className={classes.card}>
            <CardActionArea
              component={Link}
              to={slug}
              className={classes.cardArea}
            >
              <CardContent className={classes.cardDetails}>
                <Typography component="h2" variant="h5">
                  {title}
                </Typography>
                <Typography paragraph variant="subtitle2" color="textSecondary">
                  {date}
                </Typography>
                <Typography variant="body2">
                  {description || excerpt}
                </Typography>
              </CardContent>
              {thumbnail && (
                <Hidden xsDown>
                  <CardMedia className={classes.cardMedia} title={title}>
                    <Img
                      fixed={thumbnail.childImageSharp.fixed}
                      alt={`thumbnail of ${title}`}
                    />
                  </CardMedia>
                </Hidden>
              )}
            </CardActionArea>
            <CardActions>
              <List className={classes.tags}>
                {tags &&
                  tags.map(tag => (
                    <ListItem key={kebabCase(tag)} className={classes.tag}>
                      <Chip
                        component={Link}
                        to={`/tags/${kebabCase(tag)}/`}
                        size="small"
                        label={`#${tag}`}
                        clickable
                      />
                    </ListItem>
                  ))}
              </List>
            </CardActions>
          </Card>
        )
      })}
      <Pagination prev={prev} next={next} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
          thumbnail {
            childImageSharp {
              fixed(width: 100) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`

BlogIndex.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
}
