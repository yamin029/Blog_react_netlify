import React from 'react'
import {FaLaptop, FaTabletAlt, FaMobileAlt, FaMobile} from 'react-icons/fa';

const Header = ({title, width}) => {
  return (
    <header className='Header'>
      <h1>{title}</h1>
      {width<768?<FaMobileAlt></FaMobileAlt>:width<992?<FaTabletAlt></FaTabletAlt>:<FaLaptop></FaLaptop>}
    </header>
  )
}

export default Header