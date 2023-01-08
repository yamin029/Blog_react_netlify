import React from 'react'
import { Link } from 'react-router-dom'
const Nav = ({ search, setSearch }) => {
    return (
        <nav className='Nav'>
            <form className='SearchForm' onSubmit={(e) => e.preventDefault()}></form>
            <input
            className='navInput'
                type="text"
                placeholder='Search Posts'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <ul>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/post'}>Post</Link></li>
                <li><Link to={'/about'}>About</Link></li>
            </ul>
        </nav>
    )
}

export default Nav