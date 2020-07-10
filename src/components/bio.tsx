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
  // display: `flex`,
  padding: rhythm(1.5),
});

const Name = styled.h1({
  ...scale(1.5),
  marginBottom: rhythm(1.5),
  marginTop: 0,
  textAlign: 'center',
  color: '#9abc66',
});

const BioImage = styled(Image)({
  marginRight: rhythm(1 / 2),
  marginBottom: 0,
  minWidth: 50,
  borderRadius: `100%`,
  '& image': {
    borderRadius: `50%`,
  },
});

const Bio: React.FC = () => {
  const data = useStaticQuery<BioStaticQuery>(graphql`
    query BioStatic {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
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

  return (
    <Wrapper>
      <Name>{author.name}</Name>
      <BioImage fixed={avatarFixed} alt={author.name} />
      <p>
        Written by <strong>{name}</strong> {summary}
        {` `}
        <a href={`https://twitter.com/${social.twitter}`}>
          You should follow {pronouns ? pronouns[1] : 'them'} on Twitter
        </a>
      </p>
    </Wrapper>
  );
};

export default Bio;
