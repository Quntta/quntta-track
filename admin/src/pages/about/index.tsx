import React from 'react'
import { useParams } from 'react-router-dom'
const About: React.FC = () => {
  console.log('location', location)
  const params = useParams()
  console.log('params', params)
  return <div>About Page {params.id}</div>
}

export default About