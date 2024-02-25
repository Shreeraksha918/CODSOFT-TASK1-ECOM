
import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function SignUp() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });
    let navigate=useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
        });
        const json = await response.json();
        console.log(json);
        if (!json.success) {
            alert("Enter valid credentials");
        }
        if (json.success) {
            localStorage.setItem("userEmail", credentials.email);
            localStorage.setItem("authtoken", json.token); // Assuming token is returned
            navigate("/"); // Redirect to dashboard or any other route with navbar
          }
    };

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    return (
        <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '100vh' }}>
        <div>
        <Navbar />
        </div>
            <div className='container'>
                <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
                <h2 className="text-white mb-3" style={{margin: 'auto', width: 'fit-content'}}>SIGN UP</h2>
                    <div className="m-3">
                        <label htmlFor="name" className="form-label text-white fs-5 fw-bold">Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                    </div>
                    <div className="m-3">
                        <label htmlFor="email" className="form-label text-white fs-5 fw-bold">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="m-3">
                        <label htmlFor="password" className="form-label text-white fs-5 fw-bold">Password</label>
                        <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
                    </div>
                    <div className="m-3">
                        <label htmlFor="geolocation" className="form-label text-white fs-5 fw-bold">Address</label>
                        <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} />
                    </div>
                    <div className="m-3">
                    <button type="submit" className="btn btn-primary text-white fs-5 fw-bold">Submit</button>
                    <Link to='/login' className='m-3 btn btn-danger text-white fs-5 fw-bold'>Already a user</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
