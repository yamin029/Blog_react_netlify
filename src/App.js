import Header from './Header'
import Nav from './Nav'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import Footer from './Footer'
import { Routes, Route } from 'react-router-dom'
import UpdatePost from './UpdatePost'
import { DataProvider } from './context/DataProvider'

function App() {
  return (
    <div className="App">
      <Header title={"React.js Blog"}></Header>
      <DataProvider>
        <Nav></Nav>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='post' element={<NewPost></NewPost>}></Route>
          <Route path='/post/:id' element={<PostPage></PostPage>}></Route>
          <Route path='/edit/:id' element={<UpdatePost></UpdatePost>}></Route>
          <Route path='/about' element={<About></About>}></Route>
          <Route path='*' element={<Missing></Missing>}></Route>
        </Routes>
        <Footer></Footer> 
      </DataProvider>
    </div>
  );
}

export default App;
