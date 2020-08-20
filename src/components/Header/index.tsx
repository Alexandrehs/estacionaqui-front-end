import React from 'react';

import {Container} from './styles';

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({
  title
}) => {
  return (
    <Container>
      <h1>{title}</h1>
    </Container>
  );
}

export default Header;