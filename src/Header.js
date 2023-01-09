import React from 'react'
import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';
import { useContext } from 'react';
import { DataContext } from './context/DataContext';

const Header = ({ title }) => {
  const width = useContext(DataContext).width
  // console.log(width.width)
  return (
    <header className='Header'>
      <h1>{title}{Number(width)}</h1>
      {width < 768 ? <FaMobileAlt></FaMobileAlt> : width < 992 ? <FaTabletAlt></FaTabletAlt> : <FaLaptop></FaLaptop>}
    </header>
  )
}

export default Header