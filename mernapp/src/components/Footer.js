import React from 'react'
import {Link} from 'react-router-dom'
export default function Footer() {
  return (
    <div><footer className="d-flex flex-wrap justify-content-center align-items-center py-3 my-4 border-top">
    <div className="d-flex align-items-center">
      <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
      
      </Link>
   
        <span className=" text-muted fs-4 fw-bold">© 2024 YOMATO, Inc</span>
        <span className="mx-4 text-muted fs-4 fw-bold">Made with &#10084; by Shreeraksha</span>
        <span className='text-muted fs-4 fw-bold'>Contact:shreeraksha918@gmail.com</span>
      </div>


  </footer>
  </div>
  )
}