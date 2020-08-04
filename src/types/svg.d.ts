declare module '*.inline.svg' {
  const content: import('react').FC<import('react').SVGAttributes<SVGElement>>;
  export default content;
}
