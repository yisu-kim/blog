import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { Container, CssBaseline, ThemeProvider } from "@material-ui/core"
import muiTheme from "../mui-theme"
import Header from "./header"
import Footer from "./footer"

config.autoAddCss = false

export default function Layout({ children }) {
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
        <Header title={title} source={source} />
        <Container maxWidth="sm">{children}</Container>
        <Footer name={name} />
      </ThemeProvider>
    </>
  )
}
