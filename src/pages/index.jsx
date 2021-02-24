import React, { useState } from "react"
import kebabCase from "lodash/kebabCase"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SearchBar from "../components/searchBar"
import flexSearch from "../utils/flexSearch"

const BlogIndex = ({ data, location }) => {
  const {
    site: { siteMetadata: { title: siteTitle } = `Title` },
    localSearchPages: { index, store },
    allMarkdownRemark: { nodes },
  } = data

  const [searchQuery, setSearchQuery] = useState(``)
  const results = flexSearch(searchQuery, index, store)

  const unflattenResults = results =>
    results.map(post => {
      const { excerpt, slug, title, date, description, tags } = post
      return {
        excerpt,
        fields: { slug },
        frontmatter: { title, date, description, tags },
      }
    })
  const posts = searchQuery ? unflattenResults(results) : nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <SearchBar setSearchQuery={setSearchQuery} />
        <p>Sorry, no blog posts found. :(</p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      <SearchBar setSearchQuery={setSearchQuery} />
      <ol className="post-list">
        {posts.map(post => {
          const {
            excerpt,
            fields: { slug },
            frontmatter: { date, title, description, tags },
          } = post

          return (
            <li key={slug} className="post-list-item">
              <article itemScope itemType="http://schema.org/Article">
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
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    localSearchPages {
      index
      store
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
        }
      }
    }
  }
`
