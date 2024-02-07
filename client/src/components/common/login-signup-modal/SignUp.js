"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useCookies } from "react-cookie";
// import { SIGNUP_ROUTE } from "@/utils/constants"; // Import your routes

const SignUp = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [cookies, setCookies] = useCookies(['jwt']);
  // const [, dispatch] = useStateProvider(); // Assuming this is how your context is set up

  useEffect(() => {

    return () => {
    };
  }, []);

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log("Form data", formData);
    e.preventDefault();
    try {
      const { email, password } = formData;
      if (email && password) {
        const { data: { user, jwt } } = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/signup`, // Assuming this is the route for signup
          { email, password },
          { withCredentials: true }
        );

        setCookies("jwt", jwt);

        if (user) {
          //push to home
          console.log("User signed up", user);
        }
      } else {
        console.error("Invalid form data");
      }
    } catch (err) {
      console.error("Signup error", err.response?.data || err.message);
      // Handle signup error (e.g., show an error message)
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
      {/* End Email */}

      <div className="mb20">
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

      <div className="d-grid mb20">
        <button className="ud-btn btn-thm" type="submit">
          Create account <i className="fal fa-arrow-right-long" />
        </button>
      </div>
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
        Already Have an Account?{" "}
        <Link className="dark-color fw600" href="/login">
          Login
        </Link>
      </p>
    </form>
  );
};

export default SignUp;
