import { TextField } from '@mui/material'
// import { useState } from 'react'
import '../../../styles/subSideMenu.scss';
import '../../../styles/searchPost.scss';

const SearchPost = () => {
  // const [searchSource, setSearchSource] = useState('SIG') // SIG ou DANY
  // const [searchNature, setSearchNature] = useState('Poste') // Poste ou Artere

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
      <div className='fade-in-top-normal-delay'>
        <h3 className=''>TODO: card ou apparait les placeholder</h3>
      </div>
    </div>
  )
}

export default SearchPost

