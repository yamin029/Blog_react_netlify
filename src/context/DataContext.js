import { useContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import api from '../api/posts'
import useWindowSize from '../hooks/useWindowSize'
import useAxiosFetch from '../hooks/useAxiosFetch'

// const DataContext = useContext({})

export const DataProvider = ({ children }) => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('')
    const [posts, setPosts] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [searchResult, setSearchResult] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editPostBody, setEditPostBody] = useState('');
    const { width } = useWindowSize()
    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/postss')

    useEffect(() => {
        setPosts(data)
    }, [data])

    useEffect(() => {
        const filterSearchResult = posts.filter(post => (
            post.title.toLowerCase().includes(search.toLowerCase())
            || post.body.toLowerCase().includes(search.toLowerCase())
        ));
        setSearchResult(filterSearchResult.reverse())
    }, [search, posts])

    return (
        <DataContext.Provider
            value={{}}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataContext