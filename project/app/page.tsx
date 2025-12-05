import React from 'react'
import ExploreBtn from './components/ExploreBtn'

const page = () => {
  return (
    <section>
    <h1 className='text-center'>The Hub for Every day <br/> Event you Can't Miss</h1>
    <p className='text-center ml-5'>Hackthon, Meetup and conferance All in one place</p>
    <ExploreBtn/>

    <div className='mt-20 space-y-7'>
      <h3>Featured Events</h3>

      <ul className='events'>
        {[1,2,3,4,5].map((events) => (
          <li key={events}>Events</li>
        ))}
      </ul>
    </div>
    </section>
    
  )
}

export default page