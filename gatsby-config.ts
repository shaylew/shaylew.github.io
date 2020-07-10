export const siteMetadata = {
  title: `Shay : [Idea] -> Code`,
  author: {
    name: `Shay Lewis`,
    pronouns: ['they', 'them', 'their', 'theirs', 'themself'],
    summary: `who teleports around and conjures water.`,
  },
  description: `A starter blog demonstrating what Gatsby can do.`,
  siteUrl: `https://gatsby-starter-blog-demo.netlify.app/`,
  social: {
    twitter: `shaylews`,
    linkedin: 'shaylewis',
    github: 'shaylew',
  },
};

// used in .md and .mdx files.
const gatsbyMarkdownPlugins = [
  {
    resolve: `gatsby-remark-images`,
    options: {
      maxWidth: 590,
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
];

export const plugins = [
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
      path: `${__dirname}/content/top-level`,
      name: `top-level`,
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
    resolve: `gatsby-plugin-mdx`,
    options: {
      extensions: ['.mdx', '.md'],
      gatsbyRemarkPlugins: gatsbyMarkdownPlugins,
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
  {
    resolve: 'gatsby-plugin-react-svg',
    options: {
      rule: {
        include: /\.inline\.svg$/,
        omitKeys: ['xmlnsSerif'],
      },
    },
  },
  // `gatsby-plugin-feed`,
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      /* eslint-disable @typescript-eslint/camelcase */
      name: `Gatsby Starter Blog`,
      short_name: `Shay :: Dev`,
      start_url: `/`,
      background_color: `#ffffff`,
      theme_color: `#663399`,
      display: `minimal-ui`,
      icon: `content/assets/favicon.png`,
    },
  },
  `gatsby-plugin-react-helmet`,
  {
    resolve: `gatsby-plugin-typography`,
    options: {
      pathToConfigModule: `src/utils/typography`,
    },
  },
  {
    resolve: `gatsby-plugin-graphql-codegen`,
    options: {
      fileName: 'graphql.gen.ts',
      codegenConfig: {
        documentPaths: ['./src/**/*.{ts,tsx}', './gatsby-node.ts'],
        // What we want, for idiomatic typescript:
        // - use optional properties to indicate "graphql value may be null"
        // - get `undefined` (or missing) properties as appropriate in queries.

        // Unfortunately, what we're currently able to get is the reverse:
        // graphql is going to give us `null` always, so our typings had better
        // respect that. But it's never going to give us undefined so there's
        // no point making typescript worry about missing properties.
        avoidOptionals: true,
      },
    },
  },
];
