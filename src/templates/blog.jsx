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
  Grid,
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
    root: {
      flexGrow: 1,
    },
    card: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      marginTop: theme.spacing(2),
    },
    cardArea: {
      flexGrow: 1,
    },
    cardDetails: {
      paddingBottom: 0,
      "& p": {
        margin: 0,
        paddingTop: theme.spacing(1),
      },
    },
    cardActions: {
      paddingTop: 0,
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
      <div className={classes.root}>
        <Grid container spacing={3} alignContent="center">
          {posts.map((post, index) => {
            const {
              excerpt,
              fields: { slug },
              frontmatter: { date, title, description, tags, thumbnail },
            } = post

            const PostCard = () => (
              <Card className={classes.card}>
                <CardActionArea
                  component={Link}
                  to={slug}
                  className={classes.cardArea}
                >
                  {thumbnail && (
                    <CardMedia title={title}>
                      <Img
                        fluid={thumbnail.childImageSharp.fluid}
                        alt={`thumbnail of ${title}`}
                      />
                    </CardMedia>
                  )}
                  <CardContent className={classes.cardDetails}>
                    <Typography
                      variant="subtitle2"
                      component="span"
                      color="textSecondary"
                    >
                      {date}
                    </Typography>
                    <Typography component="h2" variant="h5">
                      {title}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {description || excerpt}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardActions}>
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

            if (index === 0) {
              return (
                <Grid key={slug} item xs={12}>
                  <PostCard />
                </Grid>
              )
            }
            return (
              <Grid key={slug} item xs={12} sm={6}>
                <PostCard />
              </Grid>
            )
          })}
          <Pagination prev={prev} next={next} />
        </Grid>
      </div>
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
              fluid(maxWidth: 700) {
                ...GatsbyImageSharpFluid
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
