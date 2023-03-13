import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'react-loader-spinner';
import { getImages } from '../API/api';
import { ContainerApp } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { toast, ToastContainer } from 'react-toastify';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [imageName, setImageName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getImages(imageName, page);
        if (!response.total) {
          toast.error('No images found !', {
            position: toast.POSITION.TOP_LEFT,
          });
        }
        setImages(prevState => [...prevState, ...response.hits]);
        setTotalHits(response.total);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (imageName) {
      fetchData();
    }
  }, [imageName, page]);

  const handleFormSubmit = value => {
    setImageName(value);
    setImages([]);
    setPage(1);
  };

  const handlePageChange = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <ContainerApp>
      <Searchbar onSubmit={handleFormSubmit} />
      {loading && (
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
      <ImageGallery images={images} />

      {images.length < totalHits && <Button onChange={handlePageChange} />}

      <ToastContainer autoClose={2000} />
    </ContainerApp>
  );
};
