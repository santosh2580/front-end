import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSecurity } from '../hooks/SecurityProvider';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const {register} = useSecurity();
  const navigate = useNavigate();



  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(2, 'Full name must be at least 2 characters')
        .required('Full name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
    }),
    onSubmit: (values) => {
      console.log('Registration submitted:', values);
      register(values.fullName, values.email, values.password, navigate)
    },
  });

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-96 rounded-md bg-white p-10 shadow-md">
        <h2 className="mb-6 text-center text-3xl font-bold">Register</h2>
        <form onSubmit={formik.handleSubmit}>
          {/* Full Name Field */}
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className={`input w-full rounded-md border px-3 py-3 focus:outline-none ${
                formik.touched.fullName && formik.errors.fullName
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <p className="mt-1 h-1 text-[12px] text-red-500">
                {formik.errors.fullName}
              </p>
            )}
          </div>
          
     

          {/* Email Field */}
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
              <p className="mt-1 h-1 text-[12px] text-red-500">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
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
              <p className="mt-1 h-1 text-[12px] text-red-500">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={`input w-full rounded-md border px-3 py-3 focus:outline-none ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="mt-1 h-1 text-[12px] text-red-500">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mb-4 w-full rounded-md bg-blue-500 py-3 font-semibold text-white hover:bg-blue-600 focus:outline-none"
          >
            Register
          </button>
        </form>

        <div className="text-center">
          <span className="text-sm text-gray-600">
            Already have an account?{' '}
          </span>
            <a
            href="/login"
            className="font-semibold text-blue-500 hover:underline"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
