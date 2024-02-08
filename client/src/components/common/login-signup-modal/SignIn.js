"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import Cookies from 'js-cookie'; // If you're handling cookies directly here
import { useAuth } from "@/app/context/store";
const SignIn = () => {
  const { login } = useAuth(); // Use the login function from the context
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;

      if (!email || !password) return alert('Please fill in all fields');

      if (email && password) {
        // Replace with your login API endpoint
        const { data: { jwt } } = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`,
          { email, password }
        );

        console.log(jwt);
        // Save the JWT token
        Cookies.set('auth-token', jwt); // Optional: Handle token directly with js-cookie
        login(jwt); // Or just use the login function from context if it handles cookies

        // Redirect to dashboard or home page
        window.location.href = '/';
      }
    } catch (error) {
      console.error("Sign-in error", error.response?.data || error.message);
      // Handle sign-in error (e.g., show an error message)
    }
  };

  return (
    <form className="form-style1" onSubmit={handleSubmit}>
      <div className="mb25">
        <label className="form-label fw600 dark-color">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Enter Email"
          required
          onChange={handleChange}
        />
      </div>
      {/* End email */}

      <div className="mb15">
        <label className="form-label fw600 dark-color">Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Enter Password"
          required
          onChange={handleChange}
        />
      </div>
      {/* End Password */}
      <div className="checkbox-style1 d-block d-sm-flex align-items-center justify-content-between mb10">
        <label className="custom_checkbox fz14 ff-heading">
          Remember me
          <input type="checkbox" defaultChecked="checked" />
          <span className="checkmark" />
        </label>
        <a className="fz14 ff-heading" href="#">
          Lost your password?
        </a>
      </div>
      {/* End  Lost your password? */}

      <div className="d-grid mb20">
        <button className="ud-btn btn-thm" type="submit">
          Sign in <i className="fal fa-arrow-right-long" />
        </button>
      </div>
      {/* End submit */}

      <div className="hr_content mb20">
        <hr />
        <span className="hr_top_text">OR</span>
      </div>

      <div className="d-grid mb10">
        <button className="ud-btn btn-white" type="button">
          <i className="fab fa-google" /> Continue Google
        </button>
      </div>
      <div className="d-grid mb10">
        <button className="ud-btn btn-fb" type="button">
          <i className="fab fa-facebook-f" /> Continue Facebook
        </button>
      </div>
      <div className="d-grid mb20">
        <button className="ud-btn btn-apple" type="button">
          <i className="fab fa-apple" /> Continue Apple
        </button>
      </div>
      <p className="dark-color text-center mb0 mt10">
        Not signed up?{" "}
        <Link className="dark-color fw600" href="/register">
          Create an account.
        </Link>
      </p>
    </form>
  );
};

export default SignIn;
