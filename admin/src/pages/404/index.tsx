import React from 'react'
import img from '@/assets/404.png'
import './index.css'
const NotFount: React.FC = () => {
  return <div className='img-container'>
    <img className='img' src={img} />
  </div>
}

export default NotFount