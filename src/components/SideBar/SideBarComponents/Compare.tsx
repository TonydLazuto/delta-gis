import { useComparedPostStore } from '../../../stores/comparedPostStore';
import '../../../styles/compareCard.scss';
import generatorIcon from '../../../assets/generator.png';
import sigGeneratorIcon from '../../../assets/sigGenerator.png';
import mapIcon from '../../../assets/map.png';
import searchIcon from '../../../assets/search.png';

const Compare = () => {
  const comparedSIGPost = useComparedPostStore((state) => state.SIGPost);
  const comparedDanyPost = useComparedPostStore((state) => state.danyPost);

  return (
    <div className="compareContainer">
      {comparedSIGPost && comparedDanyPost ? (
        <div className="compareCardContainer fade-in-right-normal">
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
        <div className="compareCardContainer compareCardContainerTemplate vibrate-1-normal">
          <h3>
            Comment comparer des postes ?
          </h3>
          <div className="compareCard compareCardTemplate">
            <div className='compareField compareFieldTemplate'>
              <p>
                <span style={{ marginRight: "0.2em" }}>Selectionnez un</span>
                <img src={sigGeneratorIcon} className='iconPost' alt="sigGeneratorIcon" />
                <span style={{ margin: "0 0.2em", textDecoration: "underline" }}>Poste</span>
                <img src={generatorIcon} className='iconPost' alt="generatorIcon" /><br />
              </p>
              <p>
                <span>à comparer sur la </span>
                <img src={mapIcon} className='iconPost' alt="mapIcon" />
                <span style={{ marginLeft: "0.2em", textDecoration: "underline" }}>Carte</span><br />
              </p>
              <p>
                <span>ou dans la </span>
                <img src={searchIcon} className='iconPost' alt="searchIcon" />
                <span style={{ marginLeft: "0.2em", textDecoration: "underline" }}>Recherche</span>.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Compare;
