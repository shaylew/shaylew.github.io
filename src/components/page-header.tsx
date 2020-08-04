import React from 'react';
import { Link, PageProps } from 'gatsby';

import styled from 'styled-components';
import { rhythm, scale } from '../utils/typography';

export type PageHeaderProps = {
  title: string;
  location: PageProps['location'];
};

const HeaderLink = styled(Link)({
  boxShadow: `none`,
  color: `inherit`,
});

const Header = styled.header({
  padding: `${rhythm(1.5)} ${rhythm(3)} ${rhythm(0.5)}`,
  marginBottom: rhythm(0.5),
  display: 'flex',
  alignItems: 'baseline',
  '& h1': {
    ...scale(1.5),
    flex: 1,
    margin: 0,
  },
  '& h2': {
    flex: 1,
    fontFamily: `Montserrat, sans-serif`,
    margin: 0,
  },
});

const Nav = styled.nav({
  display: 'flex',
});

const NavItem = styled.div({
  // textDecoration: 'underline',
  padding: `0 ${rhythm(0.25)}`,
});

const headerEntries: { title: string; slug: string }[] = [
  // { title: 'Blog', slug: '/blog' },
  // { title: 'Blog', slug: '/' },
  // { title: 'About', slug: '/about' },
];

const PageHeader: React.FC<PageHeaderProps> = props => {
  const { title } = props;

  const headerLink = <HeaderLink to={`/`}>{title}</HeaderLink>;
  return (
    <Header>
      <h2>{headerLink}</h2>
      <Nav>
        {headerEntries.map(item => {
          return (
            <NavItem key={item.slug}>
              <Link to={item.slug}>{item.title}</Link>
            </NavItem>
          );
        })}
      </Nav>
    </Header>
  );
};

export default PageHeader;
