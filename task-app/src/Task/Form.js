import React, { useState } from "react";
import { Button, TextField, Card } from "@mui/material";
import "./Form.css";
import UserTable from "./UserTable";

const Form = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    id: 1,
  });
  const [error, setError] = useState({
    name: false,
    email: false,
    password: false,
  });

  const handleForm = (e) => {
    const { name, value } = e.target;
    setUserData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const addDatatolocalStorage = () => {
    if (userData.name && userData.email && userData.password) {
      const localData = JSON.parse(localStorage.getItem("userData")) || [];
      const newData = { id: userData.id + 1, ...userData };
      localStorage.setItem("userData", JSON.stringify([...localData, newData]));
    }
  };

  const submitUserData = (e) => {
    e.preventDefault();
    console.log(userData);
    if (
      userData.name.length === 0 ||
      userData.email.length === 0 ||
      userData.password.length === 0
    ) {
      setError({
        name: userData.name.length === 0,
        email: userData.email.length === 0,
        password: userData.password.length === 0,
      });
    } else {
      setError({ name: false, email: false, password: false });
      setUserData({ name: "", email: "", password: "" });
    }
    addDatatolocalStorage();
  };
  return (
    <div>
      <Card variant="outlined" className="form-ui">
        <h2>Form</h2>
        <form className="user-form" onSubmit={submitUserData}>
          <div className="data">
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              value={userData.name}
              onChange={handleForm}
              type="text"
              error={error.name}
            />
            <span className="error">{error.name && "Required"}</span>
          </div>
          <div className="data">
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              value={userData.email}
              onChange={handleForm}
              type="email"
              error={error.email}
            />
            <span className="error">{error.email && "Required"}</span>
          </div>
          <div className="data">
            {" "}
            <TextField
              label="Password"
              variant="outlined"
              name="password"
              value={userData.password}
              onChange={handleForm}
              type="password"
              error={error.password}
            />
            <span className="error">{error.password && "Required"}</span>
          </div>
          <Button type="submit" variant="contained">
            {" "}
            Submit{" "}
          </Button>
        </form>
      </Card>

      <Card
        style={{
          margin: " 20px auto",
          width: "80%",
          border: "1px solid black",
        }}
      >
        <h1>Fill the above form to display the data in the table.</h1>
        <UserTable />
      </Card>
    </div>
  );
};

export default Form;
