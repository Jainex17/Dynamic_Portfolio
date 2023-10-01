import React, { useState, useEffect } from "react";
import "./profile.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface Props {
  islogin: boolean;
}

export const Profilecomp: React.FC<Props> = ({islogin}) => {

  const navigate = useNavigate();

  useEffect(() => {
    if (!islogin) {
      navigate("/");
    }
  }, [islogin]);

  return (
    <>
                
    </>
  );
};
