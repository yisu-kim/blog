import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import kebabCase from "lodash/kebabCase"
import Pagination from "../components/pagination"

const Tag = ({ pageContext, data, location }) => {
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
      text: `Prev Page`,
    }
  }

  let next
  if (!isLast) {
    next = {
      to: nextPage,
      text: `Next Page`,
    }
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={tag} />
      <article itemScope itemType="http://schema.org/Article">
        <header>
          <h1 itemProp="headline">{tagHeader}</h1>
          <Link to="/tags" className="post-list-item-tag">
            All tags
          </Link>
        </header>
        <hr />
        <section>
          <ol className="post-list">
            {edges.map(({ node }) => {
              const {
                excerpt,
                fields: { slug },
                frontmatter: { date, title, description },
              } = node
              return (
                <li key={slug}>
                  <article
                    className="post-list-item"
                    itemScope
                    itemType="http://schema.org/Article"
                  >
                    <header>
                      <h2>
                        <Link to={slug} itemProp="url">
                          <span itemProp="headline">{title}</span>
                        </Link>
                      </h2>
                      <small>{date}</small>
                    </header>
                    <section>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: description || excerpt,
                        }}
                        itemProp="description"
                      />
                    </section>
                  </article>
                </li>
              )
            })}
          </ol>
        </section>
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
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
