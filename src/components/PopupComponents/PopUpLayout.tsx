import { Popup } from 'react-leaflet';
import { useComparedPostStore } from '../../stores/comparedPostStore';
import { usePostsStore } from '../../stores/postStore';
import CompareMsg from './CompareMsg';
import PostCard from './PostCard';

interface PopUpLayoutProps {
  gdoPoste?: string;
  artere1?: string;
  artere2?: string;
  fonction?: string;
  adresse?: string;
  date_de_MEX?: string;
}

const PopUpLayout = ({
  gdoPoste,
  artere1,
  artere2,
  fonction,
  adresse,
  date_de_MEX,
}: PopUpLayoutProps) => {
  const comparedSIGPost = useComparedPostStore((state) => state.SIGPost);
  const comparedDanyPost = useComparedPostStore((state) => state.danyPost);
  const danyPosts = usePostsStore((state) => state.danyPosts);
  const SIGPosts = usePostsStore((state) => state.SIGPosts);

  const handleCompare = () => {
    const danyPost = danyPosts.find((danyPost) => danyPost.poste === gdoPoste);
    const SIGPost = SIGPosts.find((SIGPost) => SIGPost.poste === gdoPoste);
    if (danyPost === undefined && SIGPost === undefined) {
      console.log(
        `Error: Poste ${gdoPoste} not found in either DANY or SIG list`
      );
      return;
    }
    if (
      comparedSIGPost !== undefined &&
      comparedDanyPost !== undefined &&
      (comparedSIGPost.poste === gdoPoste ||
        comparedDanyPost.poste === gdoPoste)
    ) {
      // STOP Comparing
      useComparedPostStore.getState().setDanyPost(undefined);
      useComparedPostStore.getState().setSIGPost(undefined);
      console.log('Reset compared posts');
      return;
    } else {
      // START Comparing
      if (danyPost !== undefined) {
        useComparedPostStore.getState().setDanyPost(danyPost);
      }
      if (SIGPost !== undefined) {
        useComparedPostStore.getState().setSIGPost(SIGPost);
      }
    }
  };

  return (
    <Popup>
      <div className="popup">
      <div className="postHeader">
        <h2>Poste HTA/BT</h2>
      </div>
        <PostCard
          gdoPoste={gdoPoste}
          artere1={artere1}
          artere2={artere2}
          fonction={fonction}
          adresse={adresse}
          date_de_MEX={date_de_MEX}
        />
        <CompareMsg
          comparedSIGPost={comparedSIGPost}
          comparedDanyPost={comparedDanyPost}
          gdoPoste={gdoPoste}
          handleCompare={handleCompare}
        />
      </div>
    </Popup>
  );
};

export default PopUpLayout;
