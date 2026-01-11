import React from 'react'

const UserDetails = async ({params} : {params : Promise <{id: string}>}) => {
  const {id} = await params;
  return (
    <div>
      <h1 className='text-2xle4'>Its user # {id}</h1>
    </div>
  )
}

export default UserDetails