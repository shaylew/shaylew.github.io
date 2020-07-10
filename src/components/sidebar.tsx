import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';

import { rhythm, scale } from '../utils/typography';
import { SidebarStaticQuery, nullToPartial } from '../types/graphql';

import TwitterIcon from '../images/icon-twitter.inline.svg';
import LinkedinIcon from '../images/icon-linkedin.inline.svg';
import GithubIcon from '../images/icon-github.inline.svg';

const Wrapper = styled.div({
  color: 'white',
  background: '#25291C',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -2,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const BgImage = styled(Image)({
  // @types/styled-components is not quite up for !important yet.
  // We really do need it here, because gatsby-image puts on an
  // inline style with `position: relative`.
  position: 'absolute !important' as 'absolute',
  zIndex: -1,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});

const SideBio = styled.div({
  margin: `${rhythm(3)} auto`,
  width: 'min-content',
  '& h1': {
    ...scale(1.5),
    whiteSpace: 'nowrap',
    textAlign: 'center',
    marginTop: 0,
    color: '#9abc66',
  },
  '& p': {
    ...scale(0.1),
    textAlign: 'justify',
  },
});

const Socials = styled.div({
  margin: `0 auto 0`,
  padding: `${rhythm(0.5)} 0`,
  width: '100%',
  display: 'flex',
  justifyContent: 'space-evenly',
  background: 'rgba(189, 194, 191, 0.4)',
});

const SocialIcon = styled.div({
  height: rhythm(2),
  width: rhythm(2),
  position: 'relative',
  '& a': {
    margin: 0,
    padding: 0,
    boxShadow: 'none',
    display: 'block',
  },
  '&::after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    background: 'white',
    borderRadius: '100%',
    opacity: 0,
  },
  '&:hover::after': {
    opacity: 1,
  },
});

const Social: React.FC<{ link: string }> = props => {
  const { link, children } = props;
  return (
    <SocialIcon>
      <a href={link}>{children}</a>
    </SocialIcon>
  );
};

const socialMedia = [
  { name: 'github', icon: GithubIcon, url: 'https://github.com/' },
  { name: 'linkedin', icon: LinkedinIcon, url: 'https://linkedin.com/in/' },
  { name: 'twitter', icon: TwitterIcon, url: 'https://twitter.com/' },
];

const Sidebar: React.FC = () => {
  const data = useStaticQuery<SidebarStaticQuery>(graphql`
    query SidebarStatic {
      sidebarBg: file(absolutePath: { regex: "/sidebar-pic.jpg/" }) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 95) {
            ...GatsbyImageSharpFluid
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
            github
            linkedin
          }
        }
      }
    }
  `);

  if (!data.site) {
    throw new Error('missing site metadata');
  }

  const { author, social } = data.site.siteMetadata;

  // Busywork to make the type system happy. The graphql schema says
  // these might come back null; the gatsby-image typings say they
  // can be undefined but null isn't allowed. (Making graphql do the
  // idiomatic things and return undefined in the first place is beyond
  // our present powers, it seems.)
  const imageNullable = data.sidebarBg?.childImageSharp?.fluid || undefined;
  const sidebarImage = imageNullable && nullToPartial(imageNullable);

  return (
    <Wrapper>
      {sidebarImage && <BgImage fluid={sidebarImage}></BgImage>}
      <SideBio>
        <h1>{author.name}</h1>
        <p>
          is a person whose website this is. They live in Brooklyn with their
          zero cats.
        </p>
      </SideBio>
      <Socials>
        {socialMedia.map(info => {
          const { name, url, icon } = info;
          const username = social[name];
          if (username) {
            return (
              <Social link={url + social[name]} key={name}>
                {React.createElement(icon)}
              </Social>
            );
          } else {
            return null;
          }
        })}
      </Socials>
    </Wrapper>
  );
};

export default Sidebar;
