import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import { useEffect, useState } from 'react';
import List from './SideBarComponents/List';
import Compare from './SideBarComponents/Compare';
import SearchPost from './SideBarComponents/SearchPost';
import '../../styles/subSideMenu.scss';
import { useComparedPostStore } from '../../stores/comparedPostStore';

const SideBarMenu = () => {
  const [subMenu, setSubMenu] = useState('list')
  const comparedSIGPost = useComparedPostStore((state) => state.SIGPost)
  const comparedDanyPost = useComparedPostStore((state) => state.danyPost)

  useEffect(() => {
    if (comparedSIGPost !== undefined || comparedDanyPost !== undefined) {
      setSubMenu('compare')
    }
  },[comparedSIGPost, comparedDanyPost])

  const selectSubMenu = (subMenu: string) => {
    setSubMenu(subMenu)
  }
  return (
    <div className='sideBarMenu'>
        <h2><ElectricBoltIcon />Postes HTA/BT</h2>
        <div className='subSideMenu'>
          <button
            onClick={() => selectSubMenu('list')}
            className={subMenu === 'list' ? 'button-active' : ''}
          >
            Liste
          </button>
          <button
            onClick={() => selectSubMenu('compare')}
            className={subMenu === 'compare' ? 'button-active' : ''}
          >
            Comparateur
          </button>
          <button
            onClick={() => selectSubMenu('searchPost')}
            className={subMenu === 'searchPost' ? 'button-active' : ''}
          >
            Recherche
          </button>
        </div>
        {subMenu === 'list' && <List />}
        {subMenu === 'compare' && <Compare />}
        {subMenu === 'searchPost' && <SearchPost />}
    </div>
  )
}

export default SideBarMenu