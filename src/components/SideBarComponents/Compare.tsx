import { useComparedPostStore } from '../../stores/comparedPostStore';
import '../../styles/compareCard.scss';

const Compare = () => {
  const comparedSIGPost = useComparedPostStore((state) => state.SIGPost);
  const comparedDanyPost = useComparedPostStore((state) => state.danyPost);

  return (
    <div className="compareContainer">
      {comparedSIGPost && comparedDanyPost ? (
        <div className="compareCardContainer">
          <h3>
            <span>Comparaison de poste</span>
            <p>
              <span className="headerBandDany">Dany</span>
              <span> / </span>
              <span className="headerBandSIG">SIG</span>
            </p>
          </h3>
          <div className="compareCard">
            <div className="compareField">
              <h4>NomDuPoste</h4>
              <h4>{comparedDanyPost.poste || comparedSIGPost.poste}</h4>
            </div>
            <div className="compareField">
              <h5>Adresse</h5>
              <div>
                <p className="DanyText">{comparedDanyPost.adresse}</p>
                <p>/</p>
                <p className="SIGText">{comparedSIGPost.adresse}</p>
              </div>
            </div>
            <div className="compareField">
              <h5>Arteres</h5>
              <div>
                <p className="DanyText">
                  {comparedDanyPost.artere_1}, {comparedDanyPost.artere_2}
                </p>
                {comparedSIGPost.artere_1 && <>
                <p>/</p>
                <p className="SIGText">
                  {comparedSIGPost.artere_1}, {comparedSIGPost.artere_2}
                </p>
                </>}
              </div>
            </div>
            <div className="compareField">
              <h5>Fonction</h5>
              <div>
                <p className="DanyText">{comparedDanyPost.fonction}</p>
                <p>/</p>
                <p className="SIGText">{comparedSIGPost.fonction}</p>
              </div>
            </div>
            {comparedSIGPost.date_de_MEX && (
              <div className="compareField">
                <h5>Date de MEX</h5>
                <div>{comparedSIGPost.date_de_MEX}</div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <h3>
          Selectionnez un Poste a comparer sur la Carte ou dans la Recherche
        </h3>
      )}
    </div>
  );
};

export default Compare;
