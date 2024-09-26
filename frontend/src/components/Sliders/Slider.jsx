import './Sliders.css'
import slider_men from '../assets/men-1-banner.png'
import slider_women from '../assets/women-1-banner.png'
import slider_kids from '../assets/kids-1-banner.png'
import slider_footwear from '../assets/footwear-1-banner.png'
import slider_watches from'../assets/watches-1-banner.png'
import slider_jewellery from '../assets/jewellery-1-banner.png'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Slider() {

  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    let difference = +new Date(`10/01/${year}`) - +new Date();
  
    let timeLeft = {};
  
    if (difference > 0) {
      timeLeft = {
        Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Mins: Math.floor((difference / 1000 / 60) % 60),
        sec: Math.floor((difference / 1000) % 60)
      };
    }
  
    return timeLeft;
  }

const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
const [year] = useState(new Date().getFullYear());

useEffect(() => {
  const timer = setTimeout(() => {
    setTimeLeft(calculateTimeLeft());
  }, 1000);

  return () => clearTimeout(timer);
});

// ...

const timerComponents = [];

Object.keys(timeLeft).forEach((interval) => {
  if (!timeLeft[interval]) {
    return;
  }

  timerComponents.push(
    <span>
      {timeLeft[interval]} {interval}{" "}
    </span>
  );
});

// ...




  return (
    <>
      <div className='banner-containers'>
        <div id="demo" className="carousel slide " data-bs-ride="carousel">

          {/* <!-- Indicators/dots --> */}
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
            <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
            <button type="button" data-bs-target="#demo" data-bs-slide-to="3"></button>
            <button type="button" data-bs-target="#demo" data-bs-slide-to="4"></button>
            <button type="button" data-bs-target="#demo" data-bs-slide-to="5"></button>
          </div>
          
          {/* <!-- The slideshow/carousel --> */}
          <div className="carousel-inner">
            <Link to='/mens'><div className="carousel-item active">
              <div className="mens-banner">
                <div className="row">
                  <div className="col-md-8">
                    <div className="men-left">
                    <h1>Men's 50% Offer</h1>
                    <h3><span>{timeLeft.Hours}</span> Hours <span>{timeLeft.Mins}</span> Mins</h3>

                    <button>Explore Now</button>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="men-right">
                    <img src={slider_men} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* <img src="https://www.w3schools.com/bootstrap5/la.jpg" alt="Los Angeles" className="d-block" style={{width:"100%"}}/>
              <div className="carousel-caption">
                <h3>Los Angeles</h3>
                <p>We had such a great time in LA!</p>
              </div> */}
            </div></Link>
            <Link to='/womens'><div className="carousel-item">
              <div className="mens-banner">
                <div className="row">
                  <div className="col-md-8">
                    <div className="men-left">
                    <h1>Tops 60% Offer</h1>
                    <h3><span>{timeLeft.Hours}</span> Hours <span>{timeLeft.Mins}</span> Mins <span>{timeLeft.sec}</span> Sec</h3>
                    <button>Explore Now</button>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="men-right">
                    <img src={slider_women} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div></Link>
            <Link to='/kids'> <div className="carousel-item">
              <div className="mens-banner">
                <div className="row">
                  <div className="col-md-8">
                    <div className="men-left">
                    <h1>Kids 40% Offer</h1>
                    <h3><span>{timeLeft.Hours}</span> Hours <span>{timeLeft.Mins}</span> Mins <span>{timeLeft.sec}</span> Sec</h3>
                    <button>Explore Now</button>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="men-right">
                    <img src={slider_kids} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div></Link>
            <Link to='/Footwear'><div className="carousel-item">
              <div className="mens-banner">
                <div className="row">
                  <div className="col-md-8">
                    <div className="men-left">
                    <h1>Shoes 70% Offer</h1>
                    <h3><span>{timeLeft.Hours}</span> Hours <span>{timeLeft.Mins}</span> Mins <span>{timeLeft.sec}</span> Sec</h3>
                    <button>Explore Now</button>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="men-right">
                    <img src={slider_footwear} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div></Link>
            <Link to='/Watches'><div className="carousel-item">
              <div className="mens-banner">
                <div className="row">
                  <div className="col-md-6">
                    <div className="men-left">
                    <h1>Watch 50% Offer</h1>
                    <h3><span>{timeLeft.Hours}</span> Hours <span>{timeLeft.Mins}</span> Mins <span>{timeLeft.sec}</span> Sec</h3>
                    <button>Explore Now</button>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="men-right">
                    <img src={slider_watches} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div></Link>
            <Link to='/jewellery'><div className="carousel-item">
              <div className="mens-banner">
                <div className="row">
                  <div className="col-md-8">
                    <div className="men-left">
                    <h1>Necklace 50% Offer</h1>
                    <h3><span>{timeLeft.Hours}</span> Hours <span>{timeLeft.Mins}</span> Mins <span>{timeLeft.sec}</span> Sec</h3>
                    <button>Explore Now</button>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="men-right">
                    <img src={slider_jewellery} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div></Link>
          </div>
          
          {/* <!-- Left and right controls/icons --> */}
          <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span >
          </button>
        </div>
      </div>

  {/* <div className='banner-containers'>
      <div className="mens-banner">
        <div className="row">
          <div className="col-md-8">
            <div className="men-left">
            <h1>FLAT 50% OFFER</h1>
            <h3><span>12</span> Hours <span>20</span> Mins</h3>
            <button>Explore Now</button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="men-right">
            <img src={slider_men} alt="" />
            </div>
          </div>
        </div>
      </div>
  </div> */}
    </>
  )
}

export default Slider