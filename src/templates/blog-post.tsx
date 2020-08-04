import React from 'react';
import { Link, graphql, PageProps } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import styled from 'styled-components';
import { rhythm, scale } from '../utils/typography';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';

import { BlogPostPageQuery, Mdx } from '../types/graphql';

export type PageContext = {
  previous: Mdx;
  next: Mdx;
};

export type BlogPostTemplateProps = PageProps<BlogPostPageQuery, PageContext>;

const BlogPost = styled.article({
  '& > header > h1': {
    marginTop: rhythm(1),
    marginBottom: 0,
  },
  '& > header > small': {
    ...scale(-1 / 5),
    display: 'block',
    marginBottom: rhythm(1),
  },
  '& > hr': {
    marginBottom: rhythm(1),
  },
  '& > footer': {
    margin: `${rhythm(1.5)} 0`,
    padding: rhythm(1),
    border: 'solid rgba(0, 0, 0, 0.2) 1px',
    borderLeft: 'none',
    borderRight: 'none',
  },
});

const PrevNext = styled.nav({
  '& > ul': {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    listStyle: 'none',
    padding: 0,
  },
});

const BlogPostTemplate: React.FC<BlogPostTemplateProps> = props => {
  const { data, pageContext, location } = props;
  const { mdx: post, site } = data;

  if (!site) {
    throw new Error('missing site data');
  }
  if (!post) {
    throw new Error('missing post data');
  }

  const siteTitle = site.siteMetadata.title;
  const { previous, next } = pageContext;

  const title = siteTitle || post.frontmatter.title;

  return (
    <Layout location={location} title={title}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <BlogPost>
        <header>
          <h1>{post.frontmatter.title}</h1>
          <small>{post.frontmatter.date}</small>
        </header>
        <section>
          <MDXRenderer>{post.body}</MDXRenderer>
        </section>
        <footer>
          <Bio />
        </footer>
      </BlogPost>

      <PrevNext>
        <ul>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </PrevNext>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostPage($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
