import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Form, Home } from './pages'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user)
  if (!user) {
    return <Navigate to="/" />
  }
  return children
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Form />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
