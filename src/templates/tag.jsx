import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Tag = ({ pageContext, data, location }) => {
  const { tag } = pageContext
  const {
    site: { siteMetadata: { title: siteTitle } = `Title` },
    allMarkdownRemark: { edges, totalCount },
  } = data
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={tag} />
      <article itemScope itemType="http://schema.org/Article">
        <header>
          <h1 itemProp="headline">{tagHeader}</h1>
        </header>
        <hr />
        <section itemProp="articleBody">
          <ul>
            {edges.map(({ node }) => {
              const {
                fields: { slug },
                frontmatter: { title },
              } = node
              return (
                <li key={slug}>
                  <Link to={slug}>{title}</Link>
                </li>
              )
            })}
          </ul>
        </section>
        <hr />
        <footer>
          <Link to="/tags">All tags</Link>
        </footer>
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
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
