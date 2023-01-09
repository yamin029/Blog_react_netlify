import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { DataContext } from './context/DataContext'
import { useContext } from 'react'
import api from './api/posts'

const PostPage = () => {
  const { posts, setPosts, navigate} = useContext(DataContext)
  const { id } = useParams();
  const post = posts.find(post => (post.id).toString() === id)
  const handleDelete = async (id) => {
    try {
      await api.delete(`posts/${id}`)
      const newListPost = posts.filter(post => (post.id).toString() !== id.toString());
      setPosts(newListPost)
      navigate('/')
    } catch (error) {
      console.log(`err:${error.message}`)
    }

  }

  return (
    <main className='Flex-1 postPage'>
      <div className='post_body_top'>
        {post &&
          <>
            <h2 >{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
            <div className='postBody'>{post.body}</div>
            <button onClick={() => (handleDelete(post.id))} className="deleteButton">
              Delete
            </button>
            <Link to={`/edit/${post.id}`}>
            <button className="updateButton">
              Update
            </button>
            </Link>
          </>
        }
        {!post &&
          <>
            <h2 >Post Not Found</h2>
            <p className='postDate'>Well, that's disappointing</p>
            <p className='postBody'>
              <Link to='/'>Visit out home page</Link>
            </p>
          </>
        }
      </div>
    </main>
  )
}

export default PostPage