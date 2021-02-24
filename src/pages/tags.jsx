import React from "react"
import PropTypes from "prop-types"
import kebabCase from "lodash/kebabCase"
import { Link, graphql } from "gatsby"
import SEO from "../components/seo"
import Layout from "../components/layout"

const Tags = ({ data, location }) => {
  const {
    site: { siteMetadata: { title: siteTitle } = `Title` },
    allMarkdownRemark: { group: tags },
  } = data

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All tags" />
      <article itemScope itemType="http://schema.org/Article">
        <header>
          <h1 itemProp="headline">Tags</h1>
        </header>
        <hr />
        <section itemProp="articleBody">
          <ul>
            {tags.map(tag => {
              const { fieldValue, totalCount } = tag
              return (
                <li key={fieldValue}>
                  <Link to={`/tags/${kebabCase(fieldValue)}/`}>
                    {fieldValue} ({totalCount})
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
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
