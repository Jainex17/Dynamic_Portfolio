import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom"
import axios from "axios";

// import Cursor from "./Components/cursor/Cursor.tsx";
// import Pageload from "./Components/pageload/Pageload.tsx";
import Footer from "./Components/footer/Footer.tsx";

import Navbar from "./Components/navbar/Navbar";
import Mobilenav from "./Components/navbar/Mobilenav";

import Root from "./routes/root.tsx";
import Login from "./routes/Login.tsx";
import Signup from "./routes/Signup.tsx";

import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Profile from "./routes/Profile.tsx";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

    
  const [themeChange, setThemeChange] = useState(false);
  const [Theme, setTheme] = useState("dark");

  const nightLightMode = () => {
    setThemeChange(true);

    const sun = document.querySelector("#sun");
    const moon = document.querySelector("#moon");
    const mobilesun = document.querySelector("#mobilesun");
    const mobilemoon = document.querySelector("#mobilemoon");

    if (Theme === "light") {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
    if (Theme === "dark") {
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
    
    moon?.classList.toggle("block");
    sun?.classList.toggle("none");
    mobilemoon?.classList.toggle("block");
    mobilesun?.classList.toggle("none");
  };

  useEffect(() => {
    setThemeChange(false);
    setTheme(localStorage.getItem("theme") || "dark"); 
    if (Theme === "light") {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
    if (Theme === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    }
  }, [Theme, themeChange]);

  const navbarClick = () => {
    document.body.classList.toggle("res-nav-active");

    const navopen = document.querySelector("#navopen");
    const navclose = document.querySelector("#navclose");

    navopen?.classList.toggle("none");
    navclose?.classList.toggle("none");
  };
  
  const [islogin, setislogin] = useState(false);

  function checklogin() {
      try{
        axios.get(`http://localhost:5000/api/v1/verifyuser`, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.success) {
            setislogin(true);
          } else {
            setislogin(false);
          }
        })
        .catch((err) => {
          setislogin(false);
        });
      }catch(err){
        setislogin(false);
      }
  }

  useEffect(() => {
    checklogin();
  }, []);

  return (
    <>
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/login" element={<Login islogin={islogin} setislogin={setislogin}  />} />
      <Route path="/signup" element={<Signup islogin={islogin}  />} />
      <Route path="/profile" element={<Profile islogin={islogin}  />} />
    </Routes>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {/* <Cursor /> */}
      {/* {loading && <Pageload />} */}
      <Navbar
        nightLightMode={nightLightMode}
        Theme={Theme}
        navbarClick={navbarClick}
        islogin={islogin}
      />
      <Mobilenav
        nightLightMode={nightLightMode}
        Theme={Theme}
        navbarClick={navbarClick}
      />
      <Footer />
    </>
  );
}

export default App;
