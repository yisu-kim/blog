import React from "react"
import PropTypes from "prop-types"
import { graphql, useStaticQuery } from "gatsby"
import { Container, CssBaseline, ThemeProvider } from "@material-ui/core"
import muiTheme from "../mui-theme"
import Header from "./header"
import Footer from "./footer"

export default function Layout({ setSearchQuery, children }) {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          author {
            name
            summary
          }
          source
        }
      }
    }
  `)
  const {
    site: {
      siteMetadata: {
        title,
        author: { name },
        source,
      },
    },
  } = data

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={muiTheme}>
        <Header title={title} setSearchQuery={setSearchQuery} source={source} />
        <Container maxWidth="sm">{children}</Container>
        <Footer name={name} />
      </ThemeProvider>
    </>
  )
}

Layout.propTypes = {
  setSearchQuery: PropTypes.func.isRequired,
  children: PropTypes.node,
}
