import React from 'react'
import { Link } from 'react-router-dom'

const Missing = () => {
  return (
    <main className='Flex-1 postPage'>
    <div className='post_body_top'>
        <>
          <h2 >Post Not Found</h2>
          <p className='postDate'>Well, that's disappointing</p>
          <p className='postBody'>
            <Link to='/'>Visit out home page</Link>
          </p>
        </>
    </div>
  </main>
  )
}

export default Missing