import { Box, Button, InputAdornment, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import '../../../styles/subSideMenu.scss';
import '../../../styles/searchPost.scss';
import '../../../styles/postCard.scss';
import React, { useState } from 'react';
import { usePostsStore } from '../../../stores/postStore';
import { DanyPoste, SIGPoste } from '../../../interfaces/interfaces';
import { Search } from '@mui/icons-material';

interface PostData {
  gdoPoste: string
  artere1: string
  artere2: string
  fonction: string
  adresse: string
  date_de_MEX: string
  lat: number
  long: number
}

const SearchPost = () => {
  const [searchSource, setSearchSource] = useState('SIG') // SIG ou DANY
  const [searchNature, setSearchNature] = useState('Poste') // Poste ou Artere
  const [searchPost, setSearchPost] = useState('')
  const [postData, setPostData] = useState<PostData>({
    gdoPoste: 'PlaceHolder',
    artere1: 'PlaceHolder',
    artere2: 'PlaceHolder',
    fonction: 'PlaceHolder',
    adresse: 'PlaceHolder',
    date_de_MEX: 'PlaceHolder',
    lat: 0,
    long: 0
  })
  const [blur, setBlur] = useState(true);

  const danyPosts = usePostsStore((state) => state.danyPosts);
  const sigPosts = usePostsStore((state) => state.SIGPosts);

  const handleChangeSource = (event: SelectChangeEvent<string>) => {
    event.preventDefault()
    setSearchSource(event.target.value as 'SIG' | 'DANY')
  }
  const handleChangeNature = (event: SelectChangeEvent<string>) => {
    event.preventDefault()
    setSearchNature(event.target.value as 'Poste' | 'Artere')
  }

  const instanceOfSIGPoste = (post: SIGPoste | DanyPoste): post is SIGPoste => {
    if (post) console.log('poste :', post.poste)
    return true;
  }

  const handleChangePostSIG = (post: SIGPoste) => {
    const { poste, artere_1, artere_2, fonction, adresse, date_de_MEX, lat, long } = post
    setPostData(prevState => ({
      ...prevState,
      gdoPoste: poste,
      artere1: artere_1,
      artere2: artere_2,
      fonction: fonction,
      adresse: adresse,
      date_de_MEX: date_de_MEX,
      lat: lat,
      long: long
    }))
  }
  const handleChangePostDany = (post: DanyPoste) => {
    const { poste, artere_1, artere_2, fonction, adresse, lat, long } = post
    setPostData(prevState => ({
      ...prevState,
      gdoPoste: poste,
      artere1: artere_1,
      artere2: artere_2,
      fonction: fonction,
      adresse: adresse,
      date_de_MEX: '',
      lat: lat,
      long: long
    }))
  }

  const handleSubmit = (e: React.MouseEvent<SVGSVGElement, MouseEvent> | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchPost.trim() === '') return;
    const posts = searchSource === 'SIG' ? sigPosts : danyPosts
    const post = posts.find(post => post.poste === searchPost)
    if (post) {
      if (instanceOfSIGPoste(post)) {
        handleChangePostSIG(post)
      }
      else {
        handleChangePostDany(post)
      }
      setBlur(false)
      console.log('Post found:', post)
    }
    else {
      usePostsStore.getState().setSnackbarState(true);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchPost(e.target.value)
  }

  const selectStyle = {
    width: '25%',
    '& fieldset': {
      border: 'none', // Supprime la bordure du fieldset
    },
  }
  const textFieldStyle = {
    backgroundColor: 'white',
    width: '100%',
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none', // Supprime la bordure
    },
    "& input::placeholder": {
      fontSize: "70%"
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

  const sendCoordToMapLeaflet = (lat: number, long: number) => {
    if (blur) return;
    if (!lat || !long) {
      console.log('No coordinates on this Post');
      usePostsStore.getState().setSnackbarState(true);
      return;
    }
    usePostsStore.getState().sendCoordToMapLeaflet(lat, long);
  };

  return (
    <div className='subSideContainer searchPostContainer'>
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
        <Box component="form" sx={{ width: '50%' }} onSubmit={e => handleSubmit(e)}>
          <TextField
            id='standard-basic'
            hiddenLabel
            placeholder={`Rechercher un ${searchNature} sur ${searchSource}`}
            sx={textFieldStyle}
            style={{ borderRadius: '1.2em' }}
            variant="outlined"
            onChange={handleChange}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end" sx={{
                    cursor: 'pointer'
                  }}>
                    <Search onClick={e => handleSubmit(e)} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
      </div>
      <div className={`searchPostCardContainer fade-in-top-normal-delay ${blur ? 'blur' : ''}`}>
        <h3>
          <span>Poste HTA/BT</span>
        </h3>
        <div className="searchPostCard">
          <div className="searchPostField">
            <h4>NomDuPoste</h4>
            <h4>{postData.gdoPoste}</h4>
          </div>
          <div className="searchPostField">
            <h5>Adresse</h5>
            <div>{postData.adresse}</div>
          </div>
          <div className="searchPostField">
            <h5>Arteres</h5>
            <div>
              {postData.artere1}
              {postData.artere2 && <>, {postData.artere2}</>}
            </div>
          </div>
          <div className="searchPostField">
            <h5>Fonction</h5>
            <div>{postData.fonction}</div>
          </div>
          {postData.date_de_MEX && (
            <div className="searchPostField">
              <h5>Date de MEX</h5>
              <div>{postData.date_de_MEX}</div>
            </div>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={() => sendCoordToMapLeaflet(postData.lat, postData.long)}
            sx={{
              marginBottom: '1em',
              alignSelf: 'center',
              height: '2.5em',
              fontSize: '0.8em',
              marginTop: '0.7em',
            }}
          >
            Aller sur la carte
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SearchPost

