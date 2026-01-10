import Hello from '../Components/Hello';

const page = () => {
  console.log("Hey how are you");
  
  return (
    <main>
      <Hello/>

      <div className='text-5xl text-orange-500'>Welcome to nextJs Project</div>
    </main>
  )
}

export default page