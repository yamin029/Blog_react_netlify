import { useContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom'
import { DataContext } from "./DataContext";
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

  const handleDelete = async (id) => {
    try {
      await api.delete(`posts/${id}`)
      const newListPost = posts.filter(post => (post.id).toString() != id);
      setPosts(newListPost)
      navigate('/')
    } catch (error) {
      console.log(`err:${error.message}`)
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody }
    try {
      const response = await api.post('/posts', newPost)
      setPosts([...posts, response.data])
      setPostTitle('')
      setPostBody('')
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editPostBody }
    try {
      const response = await api.put(`/posts/${id}`, updatedPost)
      setPosts(posts.map((post) => post.id === id ? { ...response.data } : post))
      setEditTitle('');
      setEditPostBody('');
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <DataContext.Provider
      value={{
        width
      }}
    >
      {children}
    </DataContext.Provider>
  )
}