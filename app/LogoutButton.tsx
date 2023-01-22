'use client'

function LogoutButton() {
  const signout = () => {
    console.log('logout')
  }
  return (
    <button
      onClick={signout}
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md'>
      Sign out
    </button>
  )
}

export default LogoutButton