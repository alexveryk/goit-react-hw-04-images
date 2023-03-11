import React from 'react';
import PropTypes from 'prop-types';
import { ButtonLoadMore } from './Button.styled';

export const Button = ({ onChange }) => {
  return (
    <ButtonLoadMore type="button" onClick={onChange}>
      Load More...
    </ButtonLoadMore>
  );
};

Button.propTypes = {
  onChange: PropTypes.func.isRequired,
};
