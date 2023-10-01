import React, { useState } from "react";
import { Signupcomp } from "../Components/signup/Signupcomp";

interface Props {
  islogin: boolean;
}

const Login: React.FC<Props> = ({islogin}) => {

  return (
    <Signupcomp
      islogin={islogin}
    />
  );
};

export default Login;
