import { useEffect } from 'react';
import { usePostsStore } from '../../stores/postStore';
import '../../styles/list.scss';

const List = () => {
  const danyPosts = usePostsStore((state) => state.danyPosts);
  const sigPosts = usePostsStore((state) => state.SIGPosts);
  useEffect(() => {
    usePostsStore.getState().getDanyPosts();
    usePostsStore.getState().getSIGPosts();
  }, [])
  
  const sendCoordToMapLeaflet = (lat: number, long: number) => {
    if (!lat || !long) {
      console.error('No coordinates on this Post');
      return;
    }
    usePostsStore.getState().sendCoordToMapLeaflet(lat, long);
  };
  return (
    <div className="listContainer">
      <h3>Postes Danyweb</h3>
      {danyPosts.map((post) => (
        <button
          className="postListItem"
          key={post.poste}
          onClick={() => sendCoordToMapLeaflet(post.lat, post.long)}
        >
          <p>{post.poste}</p>
          <p>{post.fonction}</p>
          <p>
            {post.artere_1}, {post.artere_2}
          </p>
        </button>
      ))}
      <h3>Postes SIG</h3>
      {sigPosts.map((post) => (
        <button
          className="postListItem"
          key={post.poste}
          onClick={() => sendCoordToMapLeaflet(post.lat, post.long)}
        >
          <p>{post.poste}</p>
          <p>{post.fonction}</p>
          <p>
            {post.artere_1}, {post.artere_2}
          </p>
        </button>
      ))}
    </div>
  );
};

export default List;
