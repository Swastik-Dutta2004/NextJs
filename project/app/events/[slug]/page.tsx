import React from 'react'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


const page = async({params}:{params: Promise <{slug: string}>}) => {
    const {slug} = await params;
    const request = await fetch(`${BASE_URL}/api/events/${slug}`)
    const {data} = await request.json();


  return (
    <section>
        <h1>Events Details: <br />{slug}</h1>
    </section>
  )
}

export default page