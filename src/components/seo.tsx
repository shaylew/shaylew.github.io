import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

import { SeoStaticQuery } from '../types/graphql';

export type Metadata =
  | { property: string; content: string }
  | { name: string; content: string };

export type SEOProps = {
  title: string;
  description?: string;
  lang?: string;
  meta?: Metadata[];
};

const SEO: React.FC<SEOProps> = props => {
  const { title, description = '', lang = 'en', meta = [] } = props;

  const data = useStaticQuery<SeoStaticQuery>(
    graphql`
      query SEOStatic {
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
          }
        }
      }
    `
  );

  if (!data.site) {
    throw new Error('site metadata not found');
  }

  const site = data.site;
  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.social.twitter,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  );
};

export default SEO;
