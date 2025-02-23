import { useEffect, useState } from 'react';
import { usePostsStore } from '../../../stores/postStore';
import '../../../styles/list.scss';
import generatorIcon from '../../../assets/generator.png'
import sigGeneratorIcon from '../../../assets/sigGenerator.png'

const List = () => {
  const [subMenu, setSubMenu] = useState('Danyweb')
  const danyPosts = usePostsStore((state) => state.danyPosts);
  const sigPosts = usePostsStore((state) => state.SIGPosts);
  useEffect(() => {
    usePostsStore.getState().getDanyPosts();
    usePostsStore.getState().getSIGPosts();
  }, [])


  const sendCoordToMapLeaflet = (lat: number, long: number) => {
    if (!lat || !long) {
      console.log('No coordinates on this Post');
      usePostsStore.getState().setSnackbarState(true);
      return;
    }
    usePostsStore.getState().sendCoordToMapLeaflet(lat, long);
  };

  const selectSubMenu = (subMenu: string) => {
    setSubMenu(subMenu)
  }

  return (
    <div className="subSideContainer listContainer">
      <div className='listContainerSubMenu'>
        <button
          onClick={() => selectSubMenu('Danyweb')}
          className={subMenu === 'Danyweb' ? 'button-active' : ''}
        >
          <img src={generatorIcon} className='iconPost' alt="generatorIcon"/>
          <span>Postes Danyweb</span>
        </button>
        <button
        className={subMenu === 'SIG' ? 'button-active' : ''}
          onClick={() => selectSubMenu('SIG')}
        >
          <img src={sigGeneratorIcon} className='iconPost' alt="sigGeneratorIcon"/>
          <span>Postes SIG</span>
        </button>
      </div >
      <div className="listPosts">
        {
          subMenu === 'Danyweb' && (danyPosts.map((post) => (
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
          )))
        }
        {
          subMenu === 'SIG' && (sigPosts.map((post) => (
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
          )))
        }
      </div>
    </div >
  );
};

export default List;
