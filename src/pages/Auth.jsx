import React, { useReducer, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        [action.key]: action.value,
      };
    default:
      return {};
  }
};

const Auth = () => {
  const [auth, dispatch] = useReducer(reducer, {
    phoneNumber: "",
    password: "",
  });
  const [success, setSuccess] = useState(false);

  // let navigate = useNavigate();

  function handleInputChange(e) {
    dispatch({
      type: "LOGIN",
      key: e.target.name,
      value: e.target.value,
    });
  }

  function login() {
    axios.post("http://localhost:8080/api/user/login", auth).then((res) => {
      if (res.data.success === true) {
        localStorage.setItem("token", res.data.token);
      }
    });
  }
  // function login() {
  //   axios.post("http://localhost:9000/api/v1/auth/login", auth).then((res) => {
  //     // if (res.data.statusCode === 200) {
  //     if (res.data.statusCode === 200) {
  //       localStorage.setItem("accessToken", res.data.accessToken);
  //       localStorage.setItem("refreshToken", res.data.refreshToken);
  //       return navigate("/admin");
  //     }
  //   });
  // }
  return (
    <AuthStyled>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          onChange={handleInputChange}
          type="text"
          name="email"
          id="email"
        />
        <label htmlFor="password">Password:</label>
        <input
          onChange={handleInputChange}
          type="password"
          name="password"
          id="password"
        />
        <button>Login</button>
      </div>
    </AuthStyled>
  );
};

const AuthStyled = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    display: block;
    margin: 0.5rem;
    padding: 0.5rem;
    font-size: 1rem;
    font-family: "Poppins";
    outline: none;
    border: 1px solid cornflowerblue;
    border-radius: 10px;
    min-width: 300px;
  }
  button {
    outline: none;
    border: none;
    background: cornflowerblue;
    padding: 0.8rem 2rem;
    color: white;
    font-size: 1.1rem;
    cursor: pointer;
  }
`;

export default Auth;
