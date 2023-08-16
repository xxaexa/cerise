import { FormRow, Button } from '../components'
import { useNavigate } from 'react-router-dom'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { registerUser } from './../features/auth/userSlice'
import { loginUser } from './../features/auth/userSlice'
import { toast } from 'react-toastify'

const Form = () => {
  const { token, user } = useSelector((store) => store.user)
  // configuration
  const navigate = useNavigate()
  const dispatch = useDispatch()
  //Page Type
  const [pageType, setPageType] = useState('login')
  const isLogin = pageType === 'login'
  const isRegister = pageType === 'register'

  //  Register Schema Yup Validation
  const registerSchema = yup.object().shape({
    // name: yup.string(),
    email: yup.string().email(),
    password: yup.string(),
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    //   'The password must contain uppercase, lowercase, numbers and special characters'
    // )
    password_confirmation: yup
      .string()
      .label('confirm password')
      .required()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  })

  // Register Schema Yup Validation
  const loginSchema = yup.object().shape({
    email: yup.string().email().required('required'),
    password: yup.string().required('required'),
  })

  // Register InitialState
  const initialRegister = {
    name: '',
    email: '',
    role_id: 1,
    password: '',
    password_confirmation: '',
  }

  // Email InitialState
  const initialLogin = {
    email: '',
    password: '',
  }

  // Handle submit
  const handleFormSubmit = (values, props) => {
    if (isLogin) {
      dispatch(loginUser(values))
    }

    if (isRegister) {
      dispatch(registerUser(values))
      props.resetForm()
      setPageType('login')
    }
  }

  // Navigate to home
  useEffect(() => {
    if (token || user) {
      setTimeout(() => {
        navigate('/home')
      }, 2000)
    }
  }, [token, user])

  return (
    <div className="bg-custom">
      <div className="bg-glass p-4 w-96 rounded-lg  ">
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={isLogin ? initialLogin : initialRegister}
          validationSchema={isLogin ? loginSchema : registerSchema}>
          {({ values, errors, handleChange, handleSubmit, resetForm }) => (
            <form onSubmit={handleSubmit}>
              <h2 className="text-center tw my-4 font-semibold text-2xl">
                TECHNICAL TEST
              </h2>

              {isRegister && (
                <>
                  {/* Name Field*/}
                  <FormRow
                    name={'name'}
                    type={'text'}
                    placeholder={'NAME'}
                    value={values.name}
                    onChange={handleChange}
                    error={errors.name}
                  />
                </>
              )}
              <FormRow
                name={'role_id'}
                type={'hidden'}
                placeholder={'role_id'}
                value={(values.role_id = 1)}
                onChange={handleChange}
                error={errors.role_id}
              />

              {/* Email Field */}
              <FormRow
                name={'email'}
                type={'email'}
                placeholder={'EMAIL'}
                value={values.email}
                onChange={handleChange}
                error={errors.email}
              />

              {/* Password Field */}
              <FormRow
                name={'password'}
                type={'password'}
                placeholder={'PASSWORD'}
                value={values.password}
                onChange={handleChange}
                error={errors.password}
              />

              {isRegister && (
                <>
                  {/* Password Confirmation */}
                  <FormRow
                    name={'password_confirmation'}
                    type={'password'}
                    placeholder={'CONFIRMATION PASSWORD'}
                    value={values.password_confirmation}
                    onChange={handleChange}
                    error={errors.password_confirmation}
                  />
                </>
              )}

              {/* Button Submit */}
              <Button type={'submit'} text={isLogin ? 'LOGIN' : 'REGISTER'} />

              <p className="mt-3 text-center">
                {isLogin
                  ? `Don't have an account?`
                  : 'Already have an account?'}
                <span
                  onClick={() => {
                    setPageType(isLogin ? 'register' : 'login')
                    resetForm()
                  }}
                  className="cursor-pointer px-1">
                  {isLogin ? 'Register' : 'Login'}
                </span>
              </p>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}
export default Form
