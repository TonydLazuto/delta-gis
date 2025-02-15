import './App.scss'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import L, { Icon, LatLngTuple } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'
import SearchBar from './components/SearchBar'
import SideBarMenu from './components/SideBar/SideBarMenu'
import { MarkerClusterGroupProps } from './interfaces/interfaces'
import PopUpLayout from './components/PopupComponents/PopUpLayout'
import generatorIcon from './assets/generator.png'
import sigGeneratorIcon from './assets/sigGenerator.png'
import { usePostsStore } from './stores/postStore'
import ListenPost from './components/ListenPost'

const App = () => {

  const EnedisPosition: LatLngTuple = [48.883910, 2.322440]

  const sigPosts = usePostsStore((state) => state.SIGPosts)
  const danyPosts = usePostsStore((state) => state.danyPosts)

  useEffect(() => {
    usePostsStore.getState().getSIGPosts()
    usePostsStore.getState().getDanyPosts()
  }, [])

  const createClusterCustomIcon = (cluster: any) => {
    return L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: 'marker-cluster-custom',
      iconSize: L.point(40, 40, true),
    });
  }

  const danyIcon = new Icon({
    iconUrl: generatorIcon,
    iconSize: [25, 25],
  })

  const sigIcon = new Icon({
    iconUrl: sigGeneratorIcon,
    iconSize: [25, 25],
  })

  const MarkerClusterGroupCustom: React.FC<MarkerClusterGroupProps> = (props) => {
    return <MarkerClusterGroup {...props} />;
  };

  return (
    <div className='app-container'>

      <SideBarMenu />

      <MapContainer center={EnedisPosition} zoom={12} placeholder>
      <SearchBar />
      <ListenPost />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroupCustom
          chunkedLoading
          showCoverageOnHover={false}
          spiderfyDistanceMultiplier={2}
          iconCreateFunction={createClusterCustomIcon}
        >
          {sigPosts?.map((sigPoste, index) => (
            <Marker
              key={index}
              position={[sigPoste.lat, sigPoste.long]}
              icon={sigIcon}
            >
              <PopUpLayout
                gdoPoste={sigPoste.poste}
                artere1={sigPoste.artere_1}
                artere2={sigPoste.artere_2}
                fonction={sigPoste.fonction}
                adresse={sigPoste.adresse}
                date_de_MEX={sigPoste.date_de_MEX}
              />
            </Marker>
          ))}
          {danyPosts?.map((danyPoste, index) => (
            <Marker
              key={index}
              position={[danyPoste.lat, danyPoste.long]}
              icon={danyIcon}
            >
              <PopUpLayout
                gdoPoste={danyPoste.poste}
                artere1={danyPoste.artere_1}
                artere2={danyPoste.artere_2}
                fonction={danyPoste.fonction}
                adresse={danyPoste.adresse}
              />
            </Marker>
          ))}
        </MarkerClusterGroupCustom>
      </MapContainer>
    </div>
  )
}

export default App
