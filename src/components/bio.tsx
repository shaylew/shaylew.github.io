/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

import styled from 'styled-components';
import { rhythm, scale } from '../utils/typography';

import { BioStaticQuery, nullToPartial } from '../types/graphql';

const Wrapper = styled.div({
  ...scale(-0.15),
});

const Name = styled.b({
  ...scale(0),
});

const BioImage = styled(Image)({
  marginRight: rhythm(1 / 2),
  marginBottom: 0,
  minWidth: 50,
  borderRadius: `100%`,
  '& image': {
    borderRadius: `50%`,
  },
  float: 'left',
});

const Summary = styled.span({});

function capitalize(s: string): string {
  return s.length === 0 ? s : s[0].toUpperCase() + s.slice(1);
}

const Bio: React.FC = () => {
  const data = useStaticQuery<BioStaticQuery>(graphql`
    query BioStatic {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 64, height: 64) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
            pronouns
          }
          social {
            twitter
          }
        }
      }
    }
  `);

  if (!data.site) {
    throw new Error('missing site data');
  }
  const avatar = data?.avatar?.childImageSharp?.fixed || undefined;
  const avatarFixed = avatar && nullToPartial(avatar);
  const { author, social } = data.site.siteMetadata;
  const { pronouns, name, summary } = nullToPartial(author);

  const titleCaseNominal = capitalize((pronouns && pronouns[0]) ?? 'they');

  return (
    <Wrapper>
      <BioImage fixed={avatarFixed} alt={author.name} />
      <Name>{name}</Name> <Summary>{summary}</Summary>
      {` `}
      {social.twitter && (
        <a href={`https://twitter.com/${social.twitter}`}>
          {titleCaseNominal} can also be found on Twitter.
        </a>
      )}
    </Wrapper>
  );
};

export default Bio;
