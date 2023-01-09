import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { DataContext } from "./DataContext";
import api from '../api/posts'
import useAxiosFetch from '../hooks/useAxiosFetch'

export const DataProvider = ({ children }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('')
  const [posts, setPosts] = useState([]);
  const [searchResult, setSearchResult] = useState('');

  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts')

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
      value={{
        navigate,
        search,
        setSearch,
        searchResult,
        posts,
        setPosts,
        fetchError,
        isLoading, 
        api
      }}
    >
      {children}
    </DataContext.Provider>
  )
}