import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSecurity } from '../hooks/SecurityProvider';

const Login = () => {
  const {login, hasAccess} = useSecurity()
  const navigate = useNavigate()


  useEffect(()=>{
    if(hasAccess) navigate('/console');
  },[hasAccess])

  const formik = useFormik({
    initialValues: {
      email: 'jack@gmail.com',
      password: 'password@123',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: (values) => {
      console.log('Login submitted:', values);
      login(values.email, values.password, navigate)
    },
  });

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-96 rounded-md bg-white p-10 shadow-md">
        <h2 className="mb-6 text-center text-3xl font-bold">Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
          
            <input
              type="email"
              id="email"
              name="email"
              className={`input w-full rounded-md border px-3 py-3 focus:outline-none ${
                formik.touched.email && formik.errors.email
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`input w-full rounded-md border px-3 py-3 focus:outline-none ${
                formik.touched.password && formik.errors.password
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mb-4 w-full rounded-md bg-blue-500 py-3 font-semibold text-white hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
        </form>

        <div className="text-center">
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <NavLink
            to="/register"
            className="font-semibold text-blue-500 hover:underline"
          >
            Register
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
