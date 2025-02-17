
import { Search } from '@mui/icons-material';
import { Box, InputAdornment, TextField } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { geocode } from '../utils/csvParser';
import { Marker, Popup, useMap } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';

const SearchBar = () => {

  const [searchAddress, setSearchAddress] = useState('')
  const [showMarker, setShowMarker] = useState(false)
  const [coordMarker, setCoordMarker] = useState<LatLngTuple>([0, 0])
  const map = useMap()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchAddress(e.target.value)
  }
  const handleSubmit = useCallback((e: React.MouseEvent<SVGSVGElement, MouseEvent> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (searchAddress.trim() === '') return;
    console.log('searchAddress:', searchAddress)
    geocode(searchAddress).then((newCoord) => {
      setCoordMarker(newCoord)
      setShowMarker(true)
      map.setView(newCoord, 17, { animate: true })
    })
  }, [searchAddress, map]);

  useEffect(() => {
    if (showMarker) {
      setTimeout(() => {
        setShowMarker(false)
        setCoordMarker([0, 0])
        //TODO: fade out marker
      }, 5000)
    }
  }, [showMarker])
  return (
    <div className='searchbarContainer'>
      <Box component="form" onSubmit={e => handleSubmit(e)} >
        <TextField
          id='outlined-basic'
          label='Rechercher une adresse'
          variant='outlined'
          style={{
            backgroundColor: 'white',
            width: '100%',
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end" sx={
                  {
                    cursor: 'pointer'
                  }
                }>
                  <Search onClick={(e) => handleSubmit(e)} />
                </InputAdornment>
              ),
            },
          }}
          onChange={handleChange}
        />
      </Box>
      {showMarker && (
        <Marker
          position={coordMarker}
        >
          <Popup>
            <div className='popup'>
              <div className='popupField'>{searchAddress}</div>
              <div className='popupField'>{coordMarker[0]}, {coordMarker[1]}</div>
            </div>
          </Popup>
        </Marker>
      )}
    </div>
  )
}

export default SearchBar