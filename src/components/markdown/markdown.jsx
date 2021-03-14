import { makeStyles } from "@material-ui/core"
import React from "react"
import muiTheme from "../../mui-theme"

import "./markdown.css"

const useStyles = makeStyles(theme => {
  theme = { ...muiTheme }
  return {
    markdown: {
      "& h2": {
        position: "relative",
        marginLeft: -1 * theme.spacing(1.5),
        paddingLeft: theme.spacing(1.5),
      },
      "& h2::before": {
        position: "absolute",
        bottom: 0,
        left: 0,
        content: "''",
        width: theme.spacing(0.7),
        height: "90%",
        borderRadius: theme.spacing(1),
        background: `linear-gradient(
            ${theme.palette.primary.main} 20%,
            ${theme.palette.secondary.main} 100%
          )`,
      },
      "& code:not(.gatsby-highlight code)": {
        ...theme.typography.body2,
        padding: `${theme.spacing(0.25)}px ${theme.spacing(0.5)}px`,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
      },
      '& .gatsby-highlight pre[class*="language-"]': {
        borderRadius: theme.spacing(1),
      },
      '& .gatsby-highlight code[class*="language-"]': {
        ...theme.typography.body2,
        fontFamily: theme.typography.code.fontFamily,
      },
      "& .gatsby-highlight span.token.comment": {
        color: theme.typography.code.comment.color,
      },
    },
  }
})

export default function Markdown({ className, children }) {
  const classes = useStyles()
  return (
    <div className={`${className} ${classes.markdown} markdown-body`}>
      {children}
    </div>
  )
}
