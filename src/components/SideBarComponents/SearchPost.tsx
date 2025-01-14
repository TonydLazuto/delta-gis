import { TextField } from '@mui/material'
import { useState } from 'react'
import '../../styles/subSideMenu.scss';

const SearchPost = () => {
  const [searchSource, setSearchSource] = useState('SIG') // SIG ou DANY
  const [searchNature, setSearchNature] = useState('Poste') // Poste ou Artere

  return (
    <div className='subSideSearch'>
      <h3>{searchNature}</h3>
      <h3>{searchSource}</h3>
      <TextField
        id='standard-basic'
        hiddenLabel
        placeholder={`Rechercher un ${searchNature} sur ${searchSource}`}
        style={{
          backgroundColor: 'white',
          width: '50%',
        }}
      />
    </div>
  )
}

export default SearchPost

