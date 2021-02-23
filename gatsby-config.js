module.exports = {
  siteMetadata: {
    title: `Digging.log`,
    author: {
      name: `Yisu Kim`,
      summary: ``,
    },
    description: `삽질 기록을 위한 개발 블로그`,
    siteUrl: `https://yisu-kim-blog.netlify.app/`,
    social: {
      github: `yisu-kim`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Digging.Log`,
        short_name: `Digging`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `standalone`,
        icon: "static/favicon-512x512.png",
        icons: [
          {
            src: `static/favicon-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
            purpose: `any maskable`,
          },
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        name: "pages",
        engine: "flexsearch",
        engineOptions: {
          encode: "icase",
          tokenize: function (str) {
            const cjkItems = str.replace(/[\0-\x7F]/g, "").split("")
            const asciiItems = str.replace(/[^\0-\x7F]/g, "").split(/\W+/)
            return cjkItems.concat(asciiItems)
          },
          threshold: 1,
          resolution: 3,
          depth: 2,
        },
        query: `
          {
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
                rawMarkdownBody
              }
            }
          }
        `,
        ref: "slug",
        index: ["title", "tags", "description", "body"],
        normalizer: ({ data }) =>
          data.allMarkdownRemark.nodes.map(node => ({
            title: node.frontmatter.title,
            excerpt: node.excerpt,
            date: node.frontmatter.date,
            slug: node.fields.slug,
            description: node.frontmatter.description,
            tags: node.frontmatter.tags,
            body: node.rawMarkdownBody,
          })),
      },
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: "Noto Serif KR",
              variants: ["400", "700"],
            },
            {
              family: "Noto Sans KR",
              variants: ["400", "700"],
            },
            {
              family: "Fira Code",
              variants: ["400"],
            },
          ],
        },
      },
    },
  ],
}
