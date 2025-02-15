import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { usePostsStore } from '../stores/postStore';

// Listen to posteStore when sendCoordToMapLeaflet() from <List />
const ListenPost = () => {
  const map = useMap();
  const mapCoord = usePostsStore((state) => state.mapCoord);

  useEffect(() => {
    if (mapCoord.length === 0 || mapCoord === undefined) {
      console.log('Error on coordinates when ListenPost');
      return;
    }
    map.setView({ lat: mapCoord[0], lng: mapCoord[1] }, 17, { animate: true });
  }, [mapCoord]);

  return <></>;
};
export default ListenPost;
