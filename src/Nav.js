import React from 'react'
import { Link } from 'react-router-dom'
// import { DataContext } from './context/DataContext'
// import { useContext } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useEffect } from 'react'

const Nav = () => {
    // const {search, setSearch} = useContext(DataContext)
    const posts = useStoreState((state)=> state.posts)
    const search = useStoreState((state)=> state.search)
    const setSearch = useStoreActions((actions)=> actions.setSearch)
    const setSearchResult = useStoreActions((actions)=> actions.setSearchResult)

    useEffect(() => {
        const filterSearchResult = posts.filter(post => (
          post.title.toLowerCase().includes(search.toLowerCase())
          || post.body.toLowerCase().includes(search.toLowerCase())
        ));
        setSearchResult(filterSearchResult.reverse())
      }, [search, posts, setSearchResult])

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