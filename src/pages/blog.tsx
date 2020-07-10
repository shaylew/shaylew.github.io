import React from 'react';
import { PageProps, Link, graphql } from 'gatsby';

import styled from 'styled-components';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

import { BlogPageQuery } from '../types/graphql';

const PostSummary = styled.article({
  marginBottom: rhythm(2),
});

const PostHeader = styled.header({
  '& h3': {
    marginBottom: rhythm(0.25),
  },
  '& a': {
    boxShadow: 'none',
  },
});

const BlogIndex: React.FC<PageProps<BlogPageQuery>> = props => {
  const { data, location } = props;
  const siteTitle = data.site?.siteMetadata.title;
  const posts = data.allMdx.edges;

  const title = 'All Posts' + (siteTitle ? ` - ${siteTitle}` : '');

  return (
    <Layout location={location} title={title}>
      <SEO title="All posts" />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;
        return (
          <PostSummary key={node.fields.slug}>
            <PostHeader>
              <h3>
                <Link to={node.fields.slug}>{title}</Link>
              </h3>
              <small>{node.frontmatter.date}</small>
            </PostHeader>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              ></p>
            </section>
          </PostSummary>
        );
      })}
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query BlogPage {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { postType: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
