import React from 'react';

declare module '*.inline.svg' {
  const content: React.FC<React.SVGAttributes<SVGElement>>;
  export default content;
}
