import React, { useState, useEffect } from "react";
import "./signup.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface Props {
  islogin: boolean;
}

export const Signupcomp: React.FC<Props> = ({islogin}) => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  useEffect(() => {
    if (islogin) {
      navigate("/");
    }
  }, [islogin]);

  const signupUser = async (e : any) => {
    e.preventDefault();

    if(password !== cpassword) {
        return toast.error("Password and Confirm Password are not same");
    }

    try {
      const res = await axios.post(
        `https://jainex17-backend.vercel.app/api/v1/signup`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res);
      
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="container">
      <div className="signupcontainer">
        <div className="signupform">
          <h1>Sign Up in a Few Clicks</h1>
          <p>Let's get started :)</p>

          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="psw">
            <b>Confirm Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Confirm Password"
            value={cpassword}
            onChange={(e) => setCPassword(e.target.value)}
            required
          />

          <button type="submit" className="signupbtn" onClick={signupUser}>
            signup
          </button>

          <p>
            Don't have an account? <a href="/login">Login</a>.
          </p>
        </div>
      </div>
    </div>
  );
};
