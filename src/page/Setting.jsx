import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const Setting = () => {
  const nameEmailFormik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(2, "Full name must be at least 2 characters")
        .required("Full name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      console.log("Name and Email submitted:", values);
    },
  });

  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Current password is required"),
      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      console.log("Password Update submitted:", values);
    },
  });

  return (
    <div className="flex w-full items-center justify-center bg-gray-100">
      <div className="grid w-3/4 grid-cols-8 gap-10 rounded-md bg-white p-10 shadow-md">
        {/* Column 1: Name and Email */}
        <div className="col-span-3">
          <h2 className="mb-4 text-center text-2xl font-bold">
            Update Name & Email
          </h2>
          <form onSubmit={nameEmailFormik.handleSubmit}>
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
                className={`w-full rounded-md border px-3 py-3 focus:outline-none ${
                  nameEmailFormik.touched.fullName &&
                  nameEmailFormik.errors.fullName
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                onChange={nameEmailFormik.handleChange}
                onBlur={nameEmailFormik.handleBlur}
                value={nameEmailFormik.values.fullName}
              />
              {nameEmailFormik.touched.fullName &&
                nameEmailFormik.errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">
                    {nameEmailFormik.errors.fullName}
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
                className={`w-full rounded-md border px-3 py-3 focus:outline-none ${
                  nameEmailFormik.touched.email && nameEmailFormik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                onChange={nameEmailFormik.handleChange}
                onBlur={nameEmailFormik.handleBlur}
                value={nameEmailFormik.values.email}
              />
              {nameEmailFormik.touched.email &&
                nameEmailFormik.errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {nameEmailFormik.errors.email}
                  </p>
                )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-md bg-blue-500 py-3 font-semibold text-white hover:bg-blue-600 focus:outline-none"
            >
              Update Name & Email
            </button>
          </form>
        </div>

        {/* Column 2: Password Update */}
        <div className="col-span-3 col-start-6">
          <h2 className="mb-4 text-center text-2xl font-bold">
            Update Password
          </h2>
          <form onSubmit={passwordFormik.handleSubmit}>
            {/* Current Password Field */}
            <div className="mb-4">
              <label
                htmlFor="currentPassword"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                className={`w-full rounded-md border px-3 py-3 focus:outline-none ${
                  passwordFormik.touched.currentPassword &&
                  passwordFormik.errors.currentPassword
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                onChange={passwordFormik.handleChange}
                onBlur={passwordFormik.handleBlur}
                value={passwordFormik.values.currentPassword}
              />
              {passwordFormik.touched.currentPassword &&
                passwordFormik.errors.currentPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {passwordFormik.errors.currentPassword}
                  </p>
                )}
            </div>

            {/* New Password Field */}
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                className={`w-full rounded-md border px-3 py-3 focus:outline-none ${
                  passwordFormik.touched.newPassword &&
                  passwordFormik.errors.newPassword
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                onChange={passwordFormik.handleChange}
                onBlur={passwordFormik.handleBlur}
                value={passwordFormik.values.newPassword}
              />
              {passwordFormik.touched.newPassword &&
                passwordFormik.errors.newPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {passwordFormik.errors.newPassword}
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
                className={`w-full rounded-md border px-3 py-3 focus:outline-none ${
                  passwordFormik.touched.confirmPassword &&
                  passwordFormik.errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                onChange={passwordFormik.handleChange}
                onBlur={passwordFormik.handleBlur}
                value={passwordFormik.values.confirmPassword}
              />
              {passwordFormik.touched.confirmPassword &&
                passwordFormik.errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {passwordFormik.errors.confirmPassword}
                  </p>
                )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-md bg-blue-500 py-3 font-semibold text-white hover:bg-blue-600 focus:outline-none"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Setting;
