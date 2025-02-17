import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { usePostsStore } from '../stores/postStore';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Listen to posteStore when sendCoordToMapLeaflet() from <List />
const ListenPost = () => {
  const map = useMap();
  const mapCoord = usePostsStore((state) => state.mapCoord);
  const snackbarState = usePostsStore((state) => state.snackbarState);
  const danyPosts = usePostsStore((state) => state.danyPosts);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    usePostsStore.getState().setSnackbarState(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  useEffect(() => {
    if (mapCoord.length === 0 || mapCoord === undefined) {
      console.log('Error on coordinates when ListenPost');
      if (danyPosts.length !== 0) {
        usePostsStore.getState().setSnackbarState(true);
      }
      return;
    }
    map.setView({ lat: mapCoord[0], lng: mapCoord[1] }, 17, { animate: true });
  }, [mapCoord]);

  return <div>
    <Snackbar
      open={snackbarState}
      autoHideDuration={3000}
      onClose={handleClose}
      message="Ce poste n'a pas de Geometrie."
      action={action}
    />
  </div>;
};
export default ListenPost;
