import React from 'react';
import { graphql, PageProps } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

import { NotFoundPageQuery } from '../types/graphql';

const NotFoundPage: React.FC<PageProps<NotFoundPageQuery>> = props => {
  const { data, location } = props;
  const siteTitle = data.site?.siteMetadata.title || undefined;
  const title = siteTitle ? `Page Not Found - ${siteTitle}` : 'Page Not Found';

  return (
    <Layout location={location} title={title}>
      <SEO title="404: Not Found" />
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query NotFoundPage {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
