import React, { useState } from 'react'
import { Link,useNavigate} from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

export default function Navbar() {
  const [cartView,setCartView]=useState(false)
  let data=useCart();
  const navigate=useNavigate()
  const handlelogout= ()=>{
    localStorage.removeItem("authtoken");
    navigate('/login')

  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-warning">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic fw-bold text-white " to="#">YAMATO</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item p-2">
                <Link className="nav-link active fs-3 fw-bold text-white " aria-current="page" to="/">Home</Link>
              </li>
              {localStorage.getItem("authtoken") &&
                <li className="nav-item p-2">
                  <Link className="nav-link active fs-3 fw-bold" aria-current="page" to="/myOrder">My Orders</Link>
                </li>
              }
            </ul>
            {!localStorage.getItem("authtoken") ?
              <div className='d-flex'>
                <Link className="btn bg-white text-success mx-1 fw-bold fs-4" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1 fw-bold fs-4" to="/createuser">SignUp</Link>
              </div>
              :
              <div>
                <div className='btn bg-white text-success mx-2 fw-bold fs-4' onClick={()=>{setCartView(true)}}>
                  My Cart{" "}
                <Badge pill bg="danger">{data.length}</Badge>
                </div>
                {cartView?<Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}

                <div className='btn bg-white text-danger mx-2 fw-bold fs-4' onClick={handlelogout}>Logout</div>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}
