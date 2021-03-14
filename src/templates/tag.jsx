import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import kebabCase from "lodash/kebabCase"
import Pagination from "../components/pagination"
import {
  Container,
  Divider,
  List,
  ListItem,
  makeStyles,
  Typography,
} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(8),
  },
  header: {
    marginBottom: theme.spacing(2),
  },
  tag: {
    flexWrap: "wrap",
  },
  tagName: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
}))

const Tag = ({ pageContext, data, location }) => {
  const classes = useStyles()
  const { tag, currentPage, numPages } = pageContext
  const {
    site: { siteMetadata: { title: siteTitle } = `Title` },
    allMarkdownRemark: { edges, totalCount },
  } = data

  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1
      ? `/tags/${kebabCase(tag)}/`
      : `/tags/${kebabCase(tag)}/${currentPage - 1}`
  const nextPage = `/tags/${kebabCase(tag)}/${currentPage + 1}`

  let prev
  if (!isFirst) {
    prev = {
      to: prevPage,
    }
  }

  let next
  if (!isLast) {
    next = {
      to: nextPage,
    }
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={tag} />
      <article
        className={classes.container}
        itemScope
        itemType="http://schema.org/Article"
      >
        <header className={classes.header}>
          <Typography variant="h4" component="h1" itemProp="headline">
            {tagHeader}
          </Typography>
        </header>
        <Divider />
        <Container itemProp="articleBody">
          <List component="ol">
            {edges.map(({ node }) => {
              const {
                fields: { slug },
                frontmatter: { date, title },
              } = node
              return (
                <li key={slug}>
                  <ListItem
                    component={Link}
                    to={slug}
                    className={classes.tag}
                    button
                  >
                    <Typography className={classes.tagName}>{title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {date}
                    </Typography>
                  </ListItem>
                </li>
              )
            })}
          </List>
        </Container>
        <Pagination prev={prev} next={next} />
      </article>
    </Layout>
  )
}

Tag.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tag

export const pageQuery = graphql`
  query($tag: String, $skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
      limit: $limit
      skip: $skip
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
