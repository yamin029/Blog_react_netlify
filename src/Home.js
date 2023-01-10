import React from 'react'
import Feed from './Feed'
import { useStoreState } from 'easy-peasy'

const Home = ({isLoading, fetchError}) => {
  const searchResult = useStoreState((state)=> state.searchResult)
  return (
    <main className='Flex-1 Home'>
      {isLoading && <p style={{ color: 'green' }}>Loading data ...</p>}
      {fetchError && <p style={{ color: 'red' }}>{fetchError.message}</p>}
      {!fetchError && !isLoading && (searchResult.length ? (<Feed posts={searchResult}></Feed>) : (<p style={{ color: "red" }}>No Post to Display</p>))}
    </main>
  )
}

export default Home