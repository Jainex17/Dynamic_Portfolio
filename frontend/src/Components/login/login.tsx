import React, { useState, useEffect } from "react";
import "./login.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface Props {
  islogin: boolean;
  setislogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Logincomp: React.FC<Props> = ({islogin, setislogin}) => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (islogin) {
      navigate("/");
    }
  }, [islogin]);

  const loginUser = async (e : any) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://dynamic-portfolio-livid.vercel.app/api/v1/signin`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setislogin(true);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="container">
      <div className="logincontainer">
        <div className="loginform">
          <h1>Here you can Login</h1>
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

          <button type="submit" className="loginbtn" onClick={loginUser}>
            Login
          </button>

          <p>
            Already have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};
