import { createMuiTheme } from "@material-ui/core"

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: `#344955`,
    },
    secondary: {
      main: `#F9AA33`,
    },
  },
  typography: {
    fontFamily: '"Noto Serif KR"',
    h1: {
      fontFamily: '"Noto Sans KR"',
    },
    h2: {
      fontFamily: '"Noto Sans KR"',
    },
    h3: {
      fontFamily: '"Noto Sans KR"',
    },
    h4: {
      fontFamily: '"Noto Sans KR"',
    },
    h5: {
      fontFamily: '"Noto Sans KR"',
    },
    h6: {
      fontFamily: '"Noto Sans KR"',
    },
    code: {
      fontFamily: '"Fira Code", "Noto Sans KR"',
    },
  },
})

export default muiTheme
