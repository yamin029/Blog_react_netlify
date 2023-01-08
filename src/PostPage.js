import React from 'react'
import { useParams, Link, json } from 'react-router-dom'

const PostPage = ({ posts, handleDelete, setPage}) => {
  const { id } = useParams();
  const post = posts.find(post => (post.id).toString() === id)
  // {page === 'view'?'sdf':'dfsd'}
  // console.log(typeof page)
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