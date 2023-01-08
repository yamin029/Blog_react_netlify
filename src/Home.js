import React from 'react'
import Feed from './Feed'

const Home = ({ posts, fetchError, isLoading }) => {
  // console.log(fetchError)
  return (
    <main className='Flex-1 Home'>
      {isLoading && <p style={{ color: 'green' }}>Loading data ...</p>}
      {fetchError && <p style={{ color: 'red' }}>{fetchError.message}</p>}
      {!fetchError && !isLoading && (posts.length ? (<Feed posts={posts}></Feed>) : (<p style={{ color: "red" }}>No Post to Display</p>))}
    </main>
  )
}

export default Home