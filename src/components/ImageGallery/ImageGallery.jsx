import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';

import PropTypes from 'prop-types';

export const ImageGallery = ({ imageName }) => {
  return (
    <ImageGalleryList>
      <ImageGalleryItem images={imageName} />
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  imageName: PropTypes.string.isRequired,
};
