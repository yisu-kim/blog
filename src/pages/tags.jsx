import React from "react"
import PropTypes from "prop-types"
import kebabCase from "lodash/kebabCase"
import { Link, graphql } from "gatsby"
import SEO from "../components/seo"
import Layout from "../components/layout"
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

const Tags = ({ data, location }) => {
  const classes = useStyles()
  const {
    site: { siteMetadata: { title: siteTitle } = `Title` },
    allMarkdownRemark: { group: tags },
  } = data

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All tags" />
      <article
        className={classes.container}
        itemScope
        itemType="http://schema.org/Article"
      >
        <header className={classes.header}>
          <Typography variant="h4" component="h1" itemProp="headline">
            All Tags
          </Typography>
        </header>
        <Divider />
        <Container itemProp="articleBody">
          <List>
            {tags.map(tag => {
              const { fieldValue, totalCount } = tag
              return (
                <li key={fieldValue}>
                  <ListItem
                    component={Link}
                    to={`/tags/${kebabCase(fieldValue)}/`}
                    className={classes.tag}
                    button
                  >
                    <Typography className={classes.tagName}>
                      #{fieldValue}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      총 {totalCount}개의 포스트
                    </Typography>
                  </ListItem>
                </li>
              )
            })}
          </List>
        </Container>
      </article>
    </Layout>
  )
}

Tags.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
