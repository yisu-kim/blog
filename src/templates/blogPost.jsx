import React from "react"
import kebabCase from "lodash/kebabCase"
import { graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Pagination from "../components/pagination"

const BlogPostTemplate = ({ data, location }) => {
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

  let prev
  if (prevPost) {
    prev = {
      to: prevPost.fields.slug,
      text: prevPost.frontmatter.title,
      secondText: `Previous`,
    }
  }

  let next
  if (nextPost) {
    next = {
      to: nextPost.fields.slug,
      text: nextPost.frontmatter.title,
      secondText: `Next`,
    }
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={title} description={description || excerpt} />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{title}</h1>
          <p>
            <span className="blog-post-date">{date}</span>
            {tags &&
              tags.map(tag => (
                <a href={`/tags/${kebabCase(tag)}/`} className="blog-post-tag">
                  #{tag}
                </a>
              ))}
          </p>
        </header>
        <hr />
        <section
          dangerouslySetInnerHTML={{ __html: html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <Pagination prev={prev} next={next} />
    </Layout>
  )
}

export default BlogPostTemplate

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
