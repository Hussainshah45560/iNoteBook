import React from 'react'
import Notes from '../Components/Notes'

function Home(props) {
  const { showAlert } = props;

  // console.log("Props in Home:", props); // Debugging props

  
  return (
    <>
    <div className='container'>
      <Notes showAlert={showAlert}/>
    </div>
    </>
  )
}

export default Home
