import { MdImageSearch } from 'react-icons/md';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [imageName, setImageName] = useState('');

  const handleChange = event => {
    setImageName(event.target.value.toLowerCase());
  };

  const hadleSubit = event => {
    event.preventDefault();
    if (imageName.trim() === '') {
      return toast.warn('Enter a name for the image');
    }
    onSubmit(imageName);
    setImageName('');
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={hadleSubit}>
        <SearchFormButton type="submit">
          <MdImageSearch />
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={imageName}
        />
      </SearchForm>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
