import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import { useEffect, useState } from 'react';
import List from './SideBarComponents/List';
import Compare from './SideBarComponents/Compare';
import SearchPost from './SideBarComponents/SearchPost';
import '../../styles/subSideMenu.scss';
import { useComparedPostStore } from '../../stores/comparedPostStore';
import searchIcon from '../../assets/search.png';
import compareIcon from '../../assets/compare.png';
import listIcon from '../../assets/list.png';

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
            <img src={listIcon} className='iconPost' alt="listIcon"/>
            <span>Liste</span>
          </button>
          <button
            onClick={() => selectSubMenu('compare')}
            className={subMenu === 'compare' ? 'button-active' : ''}
          >
            <img src={compareIcon} className='iconPost' alt="compareIcon"/>
            <span>Comparateur</span>
          </button>
          <button
            onClick={() => selectSubMenu('searchPost')}
            className={subMenu === 'searchPost' ? 'button-active' : ''}
          >
            <img src={searchIcon} className='iconPost' alt="searchIcon"/>
            <span>Recherche</span>
          </button>
        </div>
        {subMenu === 'list' && <List />}
        {subMenu === 'compare' && <Compare />}
        {subMenu === 'searchPost' && <SearchPost />}
    </div>
  )
}

export default SideBarMenu