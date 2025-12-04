import React from 'react'

const page = async ({Params}: {Params: Promise <{id: string}>}) => {
  const {id} = await Params
  return (
    <div>
      <h1>Showing the details of user# {id}</h1>
    </div>
  )
}

export default page