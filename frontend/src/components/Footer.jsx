import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

function Footer() {
  const currDate = new Date();

  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <div className='col-lg-3 col-md-6 col-sm-6'>
              <div className="footer__about">
                <Link to='/'><h1 className="brandName">All fashion</h1></Link>
                <p>
                  The customer is at the heart of our unique business model, which includes design.
                </p>
                <img src={require(`../assets/img/xpayment.png`)} alt=""/>
              </div>
            </div>
            <div className='col-lg-2 offset-lg-1 col-md-3 col-sm-6'>
              <div className="footer__help">
                <h6>Help & Support</h6>
                <ul>
                  <li><Link to='/'>Shipping</Link></li>
                  <li><Link to='/'>Returns and Refunds</Link></li>
                  <li><Link to='/'>Size Guide</Link></li>
                  <li><Link to='/'>Feedback</Link></li>
                </ul>
              </div>
            </div>
            <div className='col-lg-2 col-md-3 col-sm-6'>
              <div className="footer__help">
                <h6>Customer Service</h6>
                <ul>
                  <li><Link to='/contact'>Contact Us</Link></li>
                  <li><Link to='/'>Payment Methods</Link></li>
                  <li><Link to='/'>Coupons</Link></li>
                </ul>
              </div>
            </div>
            <div className='col-lg-3 offset-lg-1 col-md-6 col-sm-6'>
              <div className="footer__help">
                <h6>Newsletter</h6>
                <p>
                  Be the first to know about new arrivals, look books, sales & promos!
                </p>
                <div className="input-group mb-3">
                  <input type="text" className="form-control" placeholder="Your email" aria-label="Your email" aria-describedby="basic-addon2" />
                  <div className="input-group-append">
                    <button className="btn" type="button">
                      <span><FontAwesomeIcon icon={faEnvelope} /></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className='col-lg-12 text-center'>
              <div className='footer__copyright__text'>
                <p>
                  {currDate.getFullYear()} | Gilberto Espejel
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer