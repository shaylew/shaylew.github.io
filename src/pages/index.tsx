import React from 'react';
import { Redirect } from '@reach/router';

const Index: React.FC = () => {
  return <Redirect noThrow to="/about" />;
};

export default Index;
