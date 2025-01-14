import { useMapEvents } from "react-leaflet"

// TODO: use state to convert location in adress with a reverse getGeocode and fill the search bar
// pb going through the searchBar in MapContainer

const GetAdressOnClickMap = () => {
    const map = useMapEvents({
      click: () => {
        map.locate()
      },
      locationfound: (location) => {
        // console.log('location found:', location)
      },
    })
    return null
  }

  export default GetAdressOnClickMap