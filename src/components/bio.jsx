/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import "@fortawesome/fontawesome-svg-core/styles.css"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            github
          }
        }
      }
    }
  `)

  const {
    site: {
      siteMetadata: { author: { name, summary } = {}, social: { github } = {} },
    },
  } = data

  return (
    <div className="bio">
      <p>
        {name && (
          <span>
            Written by <strong>{name}</strong> {summary || null}
          </span>
        )}
        {github && (
          <a
            href={`https://github.com/${github}`}
            aria-label="Github"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
        )}
      </p>
    </div>
  )
}

export default Bio
