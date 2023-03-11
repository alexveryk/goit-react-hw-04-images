import React, { Component } from 'react';
import { ProgressBar } from 'react-loader-spinner';
import { getImages } from '../API/api';
import { ContainerApp } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { toast, ToastContainer } from 'react-toastify';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    loading: false,
    totalHits: 0,
    imageName: '',
    error: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.imageName !== this.state.imageName
    ) {
      this.setState({ isLoading: true });
      try {
        const { imageName, page } = this.state;

        const fetchData = await getImages(imageName, page);
        if (!fetchData.total) {
          toast.error('No images found !', {
            position: toast.POSITION.TOP_LEFT,
          });
        }

        this.setState(({ images }) => ({
          images: [...images, ...fetchData.hits],
          totalHits: fetchData.total,
        }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleFormSubmit = value => {
    this.setState({
      imageName: value,
      images: [],
      page: 1,
    });
  };

  handlePageChange = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { isLoading, images, totalHits } = this.state;

    return (
      <ContainerApp>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {isLoading && (
          <ProgressBar
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            wrapperClass="progress-bar-wrapper"
            borderColor="#fff"
            barColor="#3f51b5"
          />
        )}
        <ImageGallery imageName={images} />

        {images.length < totalHits && (
          <Button onChange={this.handlePageChange} />
        )}

        <ToastContainer autoClose={2000} />
      </ContainerApp>
    );
  }
}
