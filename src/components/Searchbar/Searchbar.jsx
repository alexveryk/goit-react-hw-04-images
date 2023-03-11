import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { MdImageSearch } from 'react-icons/md';
import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handleChange = event => {
    this.setState({ imageName: event.target.value.toLowerCase() });
  };

  hadleSubit = event => {
    const { onSubmit } = this.props;
    const { imageName } = this.state;

    event.preventDefault();
    if (imageName.trim() === '') {
      return toast.warn('Enter a name for the image');
    }

    onSubmit(imageName);
    this.setState({ imageName: '' });
  };

  render() {
    const { imageName } = this.state;

    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.hadleSubit}>
          <SearchFormButton type="submit">
            <MdImageSearch />
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={imageName}
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
