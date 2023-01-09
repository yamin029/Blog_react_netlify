import React from 'react'
import { useState } from 'react'
import { DataContext } from './context/DataContext'
import { useContext } from 'react'
import api from './api/posts'
import { format } from 'date-fns'


const NewPost = () => {
  const { posts, navigate, setPosts } = useContext(DataContext)
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody }
    try {
      const response = await api.post('/posts', newPost)
      setPosts([...posts, response.data])
      console.log(posts)
      setPostTitle('')
      setPostBody('')
      navigate('/')
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <main className='Flex-1'>
      <h2>New Post</h2>
      <form onSubmit={(e) => handleSubmit(e)} className="newPostForm">
        <label htmlFor="postTitle">Title: </label>
        <input
          type="text"
          id='postTitle'
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />

        <label htmlFor="postBody">Body</label>
        <textarea
          id='postBody'
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />

        <input type="submit" value="Submit" className='btnSubmit' />
      </form>
    </main>
  )
}

export default NewPost