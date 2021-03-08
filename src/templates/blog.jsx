import React from "react"
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
  Typography,
} from "@material-ui/core"
import Img from "gatsby-image"
import Pagination from "../components/pagination"

const useStyles = makeStyles(theme => ({
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
}))

export default function BlogIndex({ data, location, pageContext }) {
  const classes = useStyles()
  const {
    site: { siteMetadata: { title: siteTitle } = `Title` },
    allMarkdownRemark: { nodes: posts },
  } = data

  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/" : `/page/${currentPage - 1}`
  const nextPage = `/page/${currentPage + 1}`
  const prev = !isFirst && {
    to: prevPage,
    text: `Prev Page`,
  }
  const next = !isLast && {
    to: nextPage,
    text: `Next Page`,
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      {posts.map(post => {
        const {
          excerpt,
          fields: { slug },
          frontmatter: { date, title, description, tags, thumbnail },
        } = post

        return (
          <Card className={classes.card}>
            <CardActionArea
              component={Link}
              to={slug}
              className={classes.cardArea}
            >
              <CardContent className={classes.cardDetails}>
                <Typography component="h2" variant="h5">
                  {title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {date}
                </Typography>
                <Typography variant="subtitle1" paragraph>
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
              {tags.length > 0 &&
                tags.map(tag => (
                  <Chip
                    size="small"
                    label={`#${tag}`}
                    className={classes.chip}
                    component={Link}
                    to={`/tags/${kebabCase(tag)}/`}
                    clickable
                    color="secondary"
                  />
                ))}
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
    site {
      siteMetadata {
        title
      }
    }
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
