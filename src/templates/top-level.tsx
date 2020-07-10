import React from 'react';
import { PageProps, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { TopLevelPageQuery } from '../types/graphql';

import Layout from '../components/layout';
import MDXLayout from './mdx';
import SEO from '../components/seo';

const TopLevel: React.FC<PageProps<TopLevelPageQuery>> = props => {
  const { data, location } = props;
  const { mdx, site } = data;

  if (!site) {
    throw new Error('missing site data');
  }
  if (!mdx) {
    throw new Error('missing post data');
  }

  const { body, frontmatter } = mdx;
  const title = frontmatter.title;

  return (
    <Layout location={location} title={title}>
      <SEO title={title} />
      <MDXLayout>
        <MDXRenderer>{body}</MDXRenderer>
      </MDXLayout>
    </Layout>
  );
};

export default TopLevel;

export const pageQuery = graphql`
  query TopLevelPage($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`;
