import React from 'react'

const layout = ({children} : {children : React.ReactNode}) => {
  return (
    <div>
        <p>This is from dashboard</p>
        {children}
    </div>
  )
}

export default layout