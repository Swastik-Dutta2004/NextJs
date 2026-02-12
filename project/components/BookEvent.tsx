'use client';

import React, { useState } from 'react'

const BookEvent = () => {
  const [email, setEmail] = useState("")
  const [submitted, setsubmitted] = useState(false)

  const handleSubmit = (e : React.FormEvent) => {
    e.preventDefault()
    
    setTimeout(() => {
      setsubmitted(true);
    }, 1000);
  }

  return (
    <div id='book-event'>
      {submitted ? (
        <p className='text-sm'>Thank you for siging up!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>

            <input type="email" value={email} id='email' onChange={(e) => setEmail(e.target.value)} placeholder='Enter your Email address' />
          </div>

          <button type='submit' className='button-submit'>Submit</button>
        </form>
      )
      }
    </div>
  )
}

export default BookEvent