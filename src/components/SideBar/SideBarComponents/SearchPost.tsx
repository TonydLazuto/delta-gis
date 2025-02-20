import { TextField } from '@mui/material'
// import { useState } from 'react'
import '../../../styles/subSideMenu.scss';
import '../../../styles/searchPost.scss';
import { useState } from 'react';
import '../../../styles/postCard.scss';

const SearchPost = () => {
  // const [searchSource, setSearchSource] = useState('SIG') // SIG ou DANY
  // const [searchNature, setSearchNature] = useState('Poste') // Poste ou Artere
  const [gdoPoste, setGdoPoste] = useState('PlaceHolder')
  const [artere1, setArtere1] = useState('PlaceHolder')
  const [artere2, setArtere2] = useState('PlaceHolder')
  const [fonction, setFonction] = useState('PlaceHolder')
  const [adresse, setAdresse] = useState('PlaceHolder')
  const [date_de_MEX, setDate_de_MEX] = useState('PlaceHolder')

  const [blur, setBlur] = useState(true)
  return (
    <div className='searchPostContainer'>
      <div className='subSideSearch fade-in-top-normal'>
        <h3>SIG</h3>
        <h3>Poste</h3>
        <TextField
          id='standard-basic'
          hiddenLabel
          placeholder={`Rechercher un Poste sur SIG`}
          style={{
            backgroundColor: 'white',
            width: '50%',
            // borderRadius: '5em',
            border: 'none',
          }}
        />
      </div>
      <div className={`searchPostCardContainer fade-in-top-normal-delay ${blur ? 'blur' : ''}`}>
        <h3>
          <span>Poste HTA/BT</span>
        </h3>
        <div className="searchPostCard">
          <div className="searchPostField">
            <h4>NomDuPoste</h4>
            <h4>{gdoPoste}</h4>
          </div>
          <div className="searchPostField">
            <h5>Adresse</h5>
            <div>{adresse}</div>
          </div>
          <div className="searchPostField">
            <h5>Arteres</h5>
            <div>
              {artere1}
              {artere2 && <>, {artere2}</>}
            </div>
          </div>
          <div className="searchPostField">
            <h5>Fonction</h5>
            <div>{fonction}</div>
          </div>
          {date_de_MEX && (
            <div className="searchPostField">
              <h5>Date de MEX</h5>
              <div>{date_de_MEX}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchPost

