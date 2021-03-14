import React from "react"
import PropTypes from "prop-types"
import kebabCase from "lodash/kebabCase"
import { graphql, Link } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Pagination from "../components/pagination"
import {
  Chip,
  Divider,
  List,
  ListItem,
  makeStyles,
  Typography,
} from "@material-ui/core"
import Markdown from "../components/markdown"

const useStyles = makeStyles(theme => {
  return {
    container: {
      marginTop: theme.spacing(8),
    },
    date: {
      marginLeft: theme.spacing(0.5),
      marginBottom: theme.spacing(2),
    },
    tags: {
      display: "flex",
      flexDirection: "row",
    },
    tag: {
      marginRight: theme.spacing(1),
      padding: 0,
      width: "auto",
    },
    post: {
      margin: theme.spacing(1),
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
  }
})

export default function BlogPostTemplate({ data }) {
  const classes = useStyles()
  const {
    site: { siteMetadata: { title: siteTitle } = `Title` },
    markdownRemark: {
      excerpt,
      html,
      frontmatter: { date, title, description, tags },
    },
    previous: prevPost,
    next: nextPost,
  } = data

  const prev = prevPost && {
    to: prevPost.fields.slug,
    title: prevPost.frontmatter.title,
  }

  const next = nextPost && {
    to: nextPost.fields.slug,
    title: nextPost.frontmatter.title,
  }

  return (
    <Layout title={siteTitle}>
      <SEO title={title} description={description || excerpt} />
      <article
        className={classes.container}
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <Typography variant="h3" component="h1" itemProp="headline">
            {title}
          </Typography>
          <Typography className={classes.date} color="textSecondary">
            {date}
          </Typography>
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
        </header>
        <Divider />
        <Markdown className={classes.post}>
          <section
            dangerouslySetInnerHTML={{ __html: html }}
            itemProp="articleBody"
          />
        </Markdown>
        <Divider />
        <footer>
          <Bio />
        </footer>
      </article>
      <Pagination prev={prev} next={next} />
    </Layout>
  )
}

BlogPostTemplate.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
    markdownRemark: PropTypes.shape({
      excerpt: PropTypes.string.isRequired,
      html: PropTypes.string.isRequired,
      frontmatter: PropTypes.shape({
        date: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
      }),
    }),
    previous: PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired,
      }),
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
    next: PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired,
      }),
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
