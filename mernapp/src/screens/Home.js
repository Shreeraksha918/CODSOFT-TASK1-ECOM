import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';


export default function Home() {
  const [search,setSearch]=useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setFoodCat(data.foodCategory); // Set foodCategory data
        setFoodItem(data.food_items); // Set food_items data
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div><Navbar /></div>
      <div> <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" id="carousel">
          <div className='carousel-caption' style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
            </div>

          </div>
          <div className="carousel-item active">
            <img src="https://source.unsplash.com/random/300×300/?burgur" className="d-block w-100 img-fluid" style={{ objectFit: "cover", height: "600px" }} alt="Burger"/>
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/300×300/?pastry" className="d-block w-100 img-fluid" style={{ objectFit: "cove", height: "600px" }} alt="Pastry" />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/300×300/?barbeque"className="d-block w-100 img-fluid" style={{ objectFit: "cove", height: "600px" }} alt="Burger" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div></div>
      <div className='container'>
        {
          foodCat.length !== 0
            ? foodCat.map((data) => {
              return (
                <div className='row mb-3' key={data._id}>
                  <div className='fs-3 m-3 fw-bold'>
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem.length !== 0 ? foodItem.filter((item) => (item.CategoryName === data.CategoryName)&& (item.name.toLowerCase().includes(search.toLocaleLowerCase()))) 
                    .map(filterItems => {
                      return (
                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                          <Card foodItem={filterItems}
                            options={filterItems.options[0]}
                      
                          />
                        </div>
                      )
                    })

                    : <div>No such data found</div>}
                </div>
              )
            }) : <div>""""""""""""""""""</div>
        }
      </div>
      <div><Footer /></div>
    </div >
  );
}
