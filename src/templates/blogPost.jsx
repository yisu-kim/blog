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
import muiTheme from "../mui-theme"
import "../markdown.css"

const useStyles = makeStyles(theme => {
  theme = { ...muiTheme }
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
      "& h2": {
        position: "relative",
        marginLeft: -1 * theme.spacing(1.5),
        paddingLeft: theme.spacing(1.5),
      },
      "& h2::before": {
        position: "absolute",
        bottom: 0,
        left: 0,
        content: "''",
        width: theme.spacing(0.7),
        height: "90%",
        borderRadius: theme.spacing(1),
        background: `linear-gradient(
          ${theme.palette.primary.main} 20%,
          ${theme.palette.secondary.main} 100%
        )`,
      },
      "& code:not(.gatsby-highlight code)": {
        ...theme.typography.body2,
        padding: `${theme.spacing(0.25)}px ${theme.spacing(0.5)}px`,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
      },
      '& .gatsby-highlight pre[class*="language-"]': {
        borderRadius: theme.spacing(1),
      },
      '& .gatsby-highlight code[class*="language-"]': {
        ...theme.typography.body2,
        fontFamily: theme.typography.code.fontFamily,
      },
      "& .gatsby-highlight span.token.comment": {
        color: theme.typography.code.comment.color,
      },
    },
  }
})

export default function BlogPostTemplate({ data, location }) {
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
    <Layout location={location} title={siteTitle}>
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
        <section
          className={`${classes.post} markdown-body`}
          dangerouslySetInnerHTML={{ __html: html }}
          itemProp="articleBody"
        />
        <Divider />
        <footer>
          <Bio />
        </footer>
      </article>
      <Pagination prev={prev} next={next} />
    </Layout>
  )
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

BlogPostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}
