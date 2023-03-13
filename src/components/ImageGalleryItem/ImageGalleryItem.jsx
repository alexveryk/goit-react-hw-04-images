import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { ImageItem, ImageGalleryLiImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ images }) => {
  const [showModal, setShowModal] = useState(false);
  const [originalImage, setOriginalImage] = useState('');

  const toogleModal = () => {
    setShowModal(!showModal);
  };

  const openModal = evt => {
    toogleModal();
    const galleryImg = evt.target.nodeName;
    const originalImage = evt.target.dataset.source;
    if (galleryImg !== 'IMG') {
      return;
    }
    setOriginalImage(originalImage);
    return originalImage;
  };

  return (
    <>
      {images.map(image => {
        return (
          <ImageItem key={image.id}>
            <ImageGalleryLiImage
              src={image.webformatURL}
              alt={image.tags}
              onClick={openModal}
              data-source={image.largeImageURL}
            />
          </ImageItem>
        );
      })}

      {showModal && <Modal onClose={toogleModal} url={originalImage} />}
    </>
  );
};

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
