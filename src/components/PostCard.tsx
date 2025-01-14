import '../styles/postCard.scss';

interface PostCardProps {
  gdoPoste?: string;
  artere1?: string;
  artere2?: string;
  fonction?: string;
  adresse?: string;
  date_de_MEX?: string;
}

const PostCard = ({
  gdoPoste,
  artere1,
  artere2,
  fonction,
  adresse,
  date_de_MEX,
}: PostCardProps) => {

  return (
    <div className="postCard">
      <div className="postTitle">
        <h3>NomDuPoste</h3>
        <h4>{gdoPoste}</h4>
      </div>
      <div className="postField">
        <h5>Adresse</h5>
        <div>{adresse}</div>
      </div>
      <div className="postField">
        <h5>Arteres</h5>
        <div>
          {artere1}
          {artere2 && <>, {artere2}</>}
        </div>
      </div>
      <div className="postField">
        <h5>Fonction</h5>
        <div>{fonction}</div>
      </div>
      {date_de_MEX && (
        <div className="postField">
          <h5>Date de MEX</h5>
          <div>{date_de_MEX}</div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
