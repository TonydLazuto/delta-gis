import { MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import '../../../styles/subSideMenu.scss';
import '../../../styles/searchPost.scss';
import { useState } from 'react';
import '../../../styles/postCard.scss';

const SearchPost = () => {
  const [searchSource, setSearchSource] = useState('SIG') // SIG ou DANY
  const [searchNature, setSearchNature] = useState('Poste') // Poste ou Artere
  const [gdoPoste, setGdoPoste] = useState('PlaceHolder')
  const [artere1, setArtere1] = useState('PlaceHolder')
  const [artere2, setArtere2] = useState('PlaceHolder')
  const [fonction, setFonction] = useState('PlaceHolder')
  const [adresse, setAdresse] = useState('PlaceHolder')
  const [date_de_MEX, setDate_de_MEX] = useState('PlaceHolder')

  const [blur, setBlur] = useState(true)

  const handleChangeSource = (event: SelectChangeEvent<string>) => {
    event.preventDefault()
    if (event.target.value === 'SIG') {
      setSearchSource('SIG')
    }
    else if (event.target.value === 'DANY') {
      setSearchSource('DANY')
    }
  }
  const handleChangeNature = (event: SelectChangeEvent<string>) => {
    event.preventDefault()
    if (event.target.value === 'Poste') {
      setSearchNature('Poste')
    }
    // else if (event.target.value === 'Artere') {
    //   setSearchNature('Artere')
    // }
  }
  const selectStyle = {
    width: '25%',
    '& fieldset': {
      border: 'none', // Supprime la bordure du fieldset
    },
  }
  const textFieldStyle = {
    backgroundColor: 'white',
    width: '50%',
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none', // Supprime la bordure
    },
    "& input::placeholder": {
      fontSize: "90%"
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        border: '1px solid #DADDFC',
        borderRadius: '1.2em'
      }, // Bordure au survol
      '&.Mui-focused fieldset': {
        border: '1px solid #DADDFC',
        borderRadius: '1.2em'
      }, // Bordure au focus
    },
  }

  return (
    <div className='searchPostContainer'>
      <div className='subSideSearch fade-in-top-normal'>
        <Select
          labelId="Source-simple-select-label"
          id="Source-simple-select"
          value={searchSource}
          label="Source"
          onChange={(event: SelectChangeEvent<string>) => handleChangeSource(event)}
          sx={selectStyle}
        >
          <MenuItem value='SIG'>SIG</MenuItem>
          <MenuItem value='DANY'>DANY</MenuItem>
        </Select>
        <Select
          labelId="Nature-simple-select-label"
          id="Nature-simple-select"
          value={searchNature}
          label="Nature"
          onChange={(event: SelectChangeEvent<string>) => handleChangeNature(event)}
          sx={selectStyle}
        >
          <MenuItem value='Poste'>Poste</MenuItem>
          <MenuItem disabled>Artere</MenuItem>
        </Select>
        <TextField
          id='standard-basic'
          hiddenLabel
          placeholder={`Rechercher un ${searchNature} sur ${searchSource}`}
          sx={textFieldStyle}
          style={{ borderRadius: '1.2em' }}
          variant="outlined"
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

