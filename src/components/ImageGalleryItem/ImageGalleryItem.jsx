import { Modal } from 'components/Modal/Modal';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageItem, ImageGalleryLiImage } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
    originalImage: '',
  };

  toogleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  openModal = evt => {
    this.toogleModal();
    const galleryImg = evt.target.nodeName;
    const originalImage = evt.target.dataset.source;

    if (galleryImg !== 'IMG') {
      return;
    }
    this.setState({
      originalImage,
    });
    return originalImage;
  };

  render() {
    const { images } = this.props;
    const { originalImage, showModal } = this.state;

    return (
      <>
        {images.map(image => {
          return (
            <ImageItem key={image.id}>
              <ImageGalleryLiImage
                src={image.webformatURL}
                alt={image.tags}
                onClick={this.openModal}
                data-source={image.largeImageURL}
              />
            </ImageItem>
          );
        })}

        {showModal && <Modal onClose={this.toogleModal} url={originalImage} />}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
    })
  ),
};
