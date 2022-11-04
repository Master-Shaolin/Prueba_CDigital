import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion/dist/framer-motion';

function Contact() {
  const initialState = { name: '', email: '', message: '' }
  const [formValues, setFormValues] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [formBlink, setformBlink] = useState(false);

  useEffect(() => {
    if(Object.keys(formErrors).length === 0 && isSubmit ) {
      setFormValues(initialState);
    }
  },[formErrors])

  useEffect(() => {
    if(Object.keys(formErrors).length === 0 && isSubmit ) {
      setformBlink(true);
      setTimeout(()=>{
        setformBlink(false);
      },200)
    }
  },[isSubmit])

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({...formValues, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  }

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!values.name) {
      errors.name = 'Name is required!'
    }
    if(!values.email) {
      errors.email = 'Email is required!'
    } else if(!regex.test(values.email)) {
      errors.email = 'Email is not valid!'
    }
    if(!values.message) {
      errors.message = 'Message is required!'
    }
    return errors;
  }

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{ delay: 0.2 }}
    >
      <nav className='breadcrumb-container' aria-label="breadcrumb">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <h4>Contact</h4>
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Contact</li>
              </ol>
            </div>
          </div>
        </div>
      </nav>
      <div className="container" id='contactContainer'>
        <div className="row">
          <div className="col-md-12">
            <h3 className='text-center' ><strong>Contact us</strong></h3>
            <p className='text-center'>
              <span>Business Hours: Mon - Fri (08:00 - 18:00), Tel: (202) 555 0108, Email: support@allfashion.com</span><br />
              <span>Questions? Comments? Get in touch with you by filling out the email form below. We will get back to them within 24 hours.</span>
            </p>
            <div className={`alert alert-success contact-alert ${ Object.keys(formErrors).length === 0 && isSubmit ? 'show' : '' }`} role="alert">
              Thanks for contacting us. We'll get back to you as soon as possible.
            </div>
            <form onSubmit={(e) => handleSubmit(e)} className={`${ formBlink ? 'fade-out' : '' }`}>
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor='name'><strong>Name</strong></label>
                  <input type="text" name='name' id='name' className="form-control"
                    value={formValues.name}
                    onChange={(e) => handleChange(e)}/>
                  <p className="form-error">
                    { formErrors.name }
                  </p>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor='email'><strong>Email</strong></label>
                  <input type="text" name='email' id='email' className="form-control"
                    value={formValues.email}
                    onChange={(e) => handleChange(e)}/>
                  <p className="form-error">
                    { formErrors.email }
                  </p>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor='message'><strong>Message</strong></label>
                <textarea type="text" name='message' id='message' className="form-control"
                  value={formValues.message}
                  onChange={(e) => handleChange(e)}>
                </textarea>
                <p className="form-error">
                    { formErrors.message }
                  </p>
              </div>
              <button type="submit" className="btn btn-dark"><strong>Send</strong></button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Contact