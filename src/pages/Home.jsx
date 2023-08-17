import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, removeUser } from '../features/auth/userSlice'
import { useEffect } from 'react'

const Home = () => {
  const { user, isLoading } = useSelector((store) => store.user.user)
  const dispatch = useDispatch()
  console.log(user === undefined)
  // useEffect(async () => {
  //   await user
  // }, [user])
  return (
    <div className="bg-black min-h-screen ">
      {isLoading === true ? (
        <p>Loading</p>
      ) : (
        <>
          <div className="w-10/12 rounded-lg mx-auto flex justify-between">
            <h2 className="text-white text-4xl">Halo {user?.name}</h2>
            <button
              className="bg-white px-4 py-2 text-red-500 rounded-full text-2xl hover:text-white hover:bg-red-500 ease-in-out duration-500"
              onClick={() => {
                dispatch(logoutUser())
                // dispatch(removeUser())
              }}>
              Logout
            </button>
          </div>
          {/* <div className="text-white w-10/12 mx-auto">
            <p>id : {user.id}</p>
            <p>name : {user.name}</p>
            <p>email: {user.email}</p>
            <p>role : {user.role_id == 1 ? 'Member' : 'admin'}</p>
          </div> */}
        </>
      )}
    </div>
  )
}
export default Home
