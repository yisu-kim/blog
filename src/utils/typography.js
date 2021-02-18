import Typography from "typography"

const typography = new Typography({
  googleFonts: [
    {
      name: "Noto Serif KR",
      styles: ["400", "700"],
    },
    {
      name: "Noto Sans KR",
      styles: ["400", "700"],
    },
    {
      name: "Fira Code",
      styles: ["400"],
    },
  ],
})

export default typography
