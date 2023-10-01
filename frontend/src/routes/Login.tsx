import React, { useState } from "react";
import { Logincomp } from "../Components/login/login.tsx";

interface Props {
  islogin: boolean;
  setislogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<Props> = ({islogin, setislogin}) => {

  return (
    <Logincomp
      islogin={islogin}
      setislogin={setislogin}
    />
  );
};

export default Login;
