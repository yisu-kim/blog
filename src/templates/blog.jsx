import React from "react"
import kebabCase from "lodash/kebabCase"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Pagination from "../components/pagination"
import Img from "gatsby-image"

export default function BlogIndex({ data, location, pageContext }) {
  const {
    site: { siteMetadata: { title: siteTitle } = `Title` },
    allMarkdownRemark: { nodes: posts },
  } = data

  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/" : `/page/${currentPage - 1}`
  const nextPage = `/page/${currentPage + 1}`

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
      <SEO title="All posts" />
      <ol className="post-list">
        {posts.map(post => {
          const {
            excerpt,
            fields: { slug },
            frontmatter: { date, title, description, tags, thumbnail },
          } = post

          return (
            <li key={slug} className="post-list-item">
              <article itemScope itemType="http://schema.org/Article">
                <div className="post-list-item-content">
                  <header>
                    <h2>
                      <Link to={slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h2>
                    <small>{date}</small>
                    {tags &&
                      tags.map(tag => (
                        <a
                          key={kebabCase(tag)}
                          href={`/tags/${kebabCase(tag)}/`}
                          className="post-list-item-tag"
                        >
                          #{tag}
                        </a>
                      ))}
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: description || excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                </div>
                {thumbnail && (
                  <Img
                    fixed={thumbnail.childImageSharp.fixed}
                    alt={`thumbnail of ${title}`}
                  />
                )}
              </article>
            </li>
          )
        })}
      </ol>
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
