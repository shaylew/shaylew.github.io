import path from 'path';
import { GatsbyNode } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = async ({
  actions,
}) => {
  const { createTypes } = actions;
  const typeDefs = `
    type Site implements Node {
      siteMetadata: SiteMetadata!
    }
    type SiteMetadata {
      author: Author!
      description: String!
      social: SocialMedia!
    }
    type SocialMedia {
      github: String
      linkedin: String
      twitter: String
    }
    type Author {
      name: String!
      pronouns: [String]
      summary: String
    }

    type Mdx implements Node {
      fields: MdxFields!
      frontmatter: MdxFrontmatter!
    }
    type MdxFields {
      slug: String!
      postType: String!
    }
    type MdxFrontmatter {
      title: String!
      path: String
      description: String
    }
  `;
  createTypes(typeDefs);
};

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions;

  const blogTemplate = path.resolve(`./src/templates/blog-post.tsx`);
  const pageTemplate = path.resolve(`./src/templates/top-level.tsx`);

  const result = await graphql<any>(
    `
      query GatsbyNodeMdx {
        allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
          edges {
            node {
              fields {
                slug
                postType
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  const pages = result.data.allMdx.edges;
  const posts = pages.filter(p => p.node.fields.postType === 'blog-post');
  const topPages = pages.filter(p => p.node.fields.postType === 'top-level');

  // Create blog post pages.
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: post.node.fields.slug,
      component: blogTemplate,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    });
  });

  // Create top-level pages.
  topPages.forEach(page => {
    createPage({
      path: page.node.fields.slug,
      component: pageTemplate,
      context: {
        slug: page.node.fields.slug,
      },
    });
  });
};

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    // Typings aren't generated yet while gatsby-node is running!
    const md = node as any;
    const postType = md.fileAbsolutePath.includes('/content/blog/')
      ? 'blog-post'
      : 'top-level';
    const slug = md.frontmatter.path || createFilePath({ node, getNode });
    createNodeField({ name: 'slug', node, value: slug });
    createNodeField({ name: 'postType', node, value: postType });
  }
};
