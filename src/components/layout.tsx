import React from 'react';
import { PageProps } from 'gatsby';

import styled from 'styled-components';
import { rhythm } from '../utils/typography';

import SidebarContents from './sidebar';
import PageHeader from './page-header';

export type LayoutProps = {
  title: string;
  location: PageProps['location'];
};

const Wrapper = styled.div({
  display: 'flex',
  background: '#E3E7D3',
});

const Sidebar = styled.div({
  position: 'sticky',
  top: 0,
  flex: 1,
  minWidth: rhythm(12),
  maxWidth: '35vw',
  height: '100vh',
  '&:after': {
    content: '""',
    height: '100%',
    position: 'absolute',
    top: 0,
    width: `${rhythm(0.5)}`,
    right: `-${rhythm(0.5)}`,
    boxShadow: `${rhythm(0.5)} 0 ${rhythm(0.5)} -${rhythm(0.5)} inset`,
  },
});

const Content = styled.div({
  padding: `${rhythm(1.5)} ${rhythm(3)} 0`,
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
});

const Main = styled.main({
  maxWidth: rhythm(24),
  flex: 1,
});

const Footer = styled.footer({
  textAlign: 'right',
  marginBottom: rhythm(0.5),
});

const Layout: React.FC<LayoutProps> = props => {
  const { location, title, children } = props;

  return (
    <Wrapper>
      <Sidebar>
        <SidebarContents />
      </Sidebar>
      <Content>
        <PageHeader title={title} location={location} />
        <Main>{children}</Main>
        <Footer>
          © {new Date().getFullYear()}, built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </Footer>
      </Content>
    </Wrapper>
  );
};

export default Layout;
