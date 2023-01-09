import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { DataContext } from './context/DataContext'
import { useContext } from 'react'
import { format } from 'date-fns'

const UpdatePost = () => {
    const { posts,api, navigate, setPosts } = useContext(DataContext);
    const [editTitle, setEditTitle] = useState('');
    const [editPostBody, setEditPostBody] = useState('');
    const { id } = useParams()
    const post = posts.find(post => post.id.toString() === id);
    useEffect(() => {
        if (post) {
            setEditTitle(post.title)
            setEditPostBody(post.body)
        }
    }, [post, setEditTitle, setEditPostBody])

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
        <main className='Flex-1'>
            <h2>Update Post</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
            }} className="newPostForm">
                <label htmlFor="postTitle">Title: </label>
                <input
                    type="text"
                    id='postTitle'
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                />

                <label htmlFor="postBody">Body</label>
                <textarea
                    required
                    id='postBody'
                    value={editPostBody}
                    onChange={(e) => setEditPostBody(e.target.value)}
                />

                <input type="submit" value="Update" className='btnSubmit' onClick={()=> handleUpdate(post.id)} />
            </form>
        </main>
    )
}

export default UpdatePost