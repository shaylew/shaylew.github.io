import Typography from 'typography';
import Wordpress2016 from 'typography-theme-wordpress-2016';

Wordpress2016.overrideThemeStyles = (): object => {
  return {
    html: {
      overflowY: 'auto',
      boxSizing: 'border-box',
    },
    'a.gatsby-resp-image-link': {
      boxShadow: `none`,
    },
    p: {
      marginBottom: '1rem',
    },
    a: {
      color: '#194a01',
    },
    'a:hover': {
      color: '#388a10',
    },
    'h1:first-child, h2:first-child, h3:first-child': {
      marginTop: 0,
    },
  };
};

delete Wordpress2016.googleFonts;

const typography = new Typography(Wordpress2016);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
