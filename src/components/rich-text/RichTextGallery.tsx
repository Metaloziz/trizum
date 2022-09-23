import React, { FC, useEffect } from 'react';

import Button from '@mui/material/Button';
import CollectionsIcon from '@mui/icons-material/Collections';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DoneIcon from '@mui/icons-material/Done';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { ImageT } from '../../app/types/ImagesTypes';
import { galleryService } from '../../app/services/galleryService';
import { observer } from 'mobx-react';
import imagesStore from '../../app/stores/imagesStore';
import { useSlate } from 'slate-react';
import { RichGalleryProps } from './RichTextTypes';
import { exists } from 'fs';
import styles from './RichText.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { BASE_URL } from 'constants/constants';

export const RichTextGallery: FC<RichGalleryProps> = observer(props => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { images, getImages, selectedImagePath, setSelectedImagePath } = imagesStore;
  useEffect(() => {
    if (open) getImages();
  }, [open]);
  const handleSelect = (event: any) => {
    setSelectedImagePath(event.target.src.replace(BASE_URL, '')); // TODO change on prod / remote
    // handleClose();
    props.callback();
  };
  const deleteImage = async (id: string) => {
    await galleryService.deleteImage(id);
    getImages();
  };
  return (
    <>
      <Button onClick={handleOpen}>
        <CollectionsIcon />
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 540,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 2,
          }}
        >
          <div className={styles.buttonContainer}>
            <Button
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';

                input.onchange = (e: Event) => {
                  if (e.target === null || !('files' in e.target)) return;
                  // @ts-ignore
                  const file = e.target.files[0];
                  const reader = new FileReader();
                  reader.onload = () => {
                    // @ts-ignore
                    const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
                    imagesStore.image64 = base64String;
                    imagesStore.uploadImage();
                  };
                  reader.readAsDataURL(file);
                };
                input.click();
              }}
            >
              <AddPhotoAlternateIcon />
            </Button>
            <Button
              onClick={() => {
                handleClose();
                // props.callback();
              }}
            >
              {/* <DoneIcon /> */}
              <CloseIcon sx={{ color: 'red' }} />
            </Button>
          </div>
          <ImageList sx={{ width: 500, height: 450 }} cols={3}>
            {images.map(image => (
              <ImageListItem key={image.id} onClick={handleSelect}>
                <div className={styles.delete}>
                  <Button onClick={() => deleteImage(image.id)}>
                    <DeleteForeverIcon />
                  </Button>
                </div>
                <img
                  className={styles.image}
                  src={`${BASE_URL}/${image.path}`} // TODO change on prod / remote
                  alt={image.id}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Modal>
    </>
  );
});
