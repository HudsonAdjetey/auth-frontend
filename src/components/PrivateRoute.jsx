import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = () => {
    const {userInfo} = useSelector((state) => state.auth)

    return userInfo ? <Outlet /> : <Navigate to={'/login'} replace />

  return (
    <div>PrivateRoute</div>
  )
}

export default PrivateRoute