import { useState } from 'react' 
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { VideoHome } from './components/video-home'
import { UserLogin } from './components/user-login'
import { RegisterUser } from './components/register-user'
import { UserDash } from './components/user-dash'
import { AdminLogin } from './components/admin-login'
import { AdminDash } from './components/admin-dash'
import { AdminAddVideo } from './components/admin-add-video'
import { AdminEditVideo } from './components/admin-edit-video'
import { AdminDeleteVideo } from './components/admin-delete-video'

function App() {
  

  return (
    <div className='container-fluid' style={{backgroundImage: `url(./public/image/video-library.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",}}>
     <BrowserRouter>
     <header>
        <h2 className='text-center mt-2'><Link to="/" className='text-dark'>Video Tutorials</Link></h2>
      </header>
      <section>
        <Routes>
          <Route path='/' element={ <VideoHome />}></Route>
          <Route path='/user-login' element={<UserLogin />}></Route>
          <Route path='/user-register' element={<RegisterUser />}></Route>
          <Route path='/user-dash' element={<UserDash />}></Route>
          <Route path='/admin-login' element={<AdminLogin />}></Route>
          <Route path='/admin-dash' element={<AdminDash />}></Route>
          <Route path='/add-video' element={<AdminAddVideo />}></Route>
          <Route path='/edit-video/:id' element={<AdminEditVideo />}></Route>
          <Route path='/delete-video/:id' element={<AdminDeleteVideo />}></Route>
        </Routes>
      </section>
     </BrowserRouter>
    </div>
  )
}

export default App
