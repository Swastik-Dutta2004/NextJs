import React from 'react'

const page = async ({params}: {params: Promise <{id: string}>}) => {
  const {id} = await params
  return (
    <div>
      <h1>Showing the details of user# {id}</h1>
    </div>
  )
}

export default page