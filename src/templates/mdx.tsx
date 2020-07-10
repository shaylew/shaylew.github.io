import React from 'react';
import { Link } from 'gatsby';

import { MDXProvider } from '@mdx-js/react';
import styled from 'styled-components';
import { rhythm, scale } from '../utils/typography';

const Bigmoji = styled.span({
  ...scale(0.5),
  marginRight: rhythm(0.25),
});

const BigmojiList = styled.div({
  '& > ul > li': {
    display: 'block',
    marginBottom: 0,
    '&::first-letter': {
      ...scale(0.5),
      marginRight: rhythm(0.25),
    },
  },
});

const SkillList = styled.ul({
  '& > ul': {
    display: 'block',
    borderColor: 'inherit',
  },
  '& > ul > li': {
    display: 'inline',
    borderStyle: 'solid',
    borderWidth: '1.5px',
    borderColor: 'inherit',
    borderRadius: '2px',
    padding: `${rhythm(0.25)} ${rhythm(0.5)}`,
    margin: `0 ${rhythm(0.5)} 0 0`,
  },
});

const shortcodes = { Bigmoji, BigmojiList, SkillList, Link };

const MDX = styled.section({});

const Layout: React.FC = ({ children }) => (
  <MDX>
    <MDXProvider components={shortcodes}>{children}</MDXProvider>
  </MDX>
);

export default Layout;
