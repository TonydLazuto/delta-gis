import { TextField } from '@mui/material'
// import { useState } from 'react'
import '../../../styles/subSideMenu.scss';

const SearchPost = () => {
  // const [searchSource, setSearchSource] = useState('SIG') // SIG ou DANY
  // const [searchNature, setSearchNature] = useState('Poste') // Poste ou Artere

  return (
    <div className='subSideSearch'>
      <h3>SIG</h3>
      <h3>Poste</h3>
      <TextField
        id='standard-basic'
        hiddenLabel
        placeholder={`Rechercher un Poste sur SIG`}
        style={{
          backgroundColor: 'white',
          width: '50%',
        }}
      />
    </div>
  )
}

export default SearchPost

