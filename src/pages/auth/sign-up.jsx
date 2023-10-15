import {Link, useNavigate} from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useState } from 'react';
import {handleTokens} from "../../tokens/tokens.jsx";

export function SignUp() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const Api_Url = 'http://localhost:3000/employees/tokens';

  const handleSignUp = async () => {
    try {
      const response = await axios.post(`${Api_Url}/sign_up`, {
          email: email,
          password: password,
          // Add other attributes as needed
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Handle the successful sign-up here, e.g., redirect to the login page.
      handleTokens(response);
      navigate("/auth/sign-in");
      console.log('Sign-up successful', response.data);
    } catch (error) {
      // Handle sign-up errors, e.g., display an error message.
      console.error('Sign-up failed', error);
      // Check the response status code to determine the error type.
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
    }
  };

  return (
    <>
      <img
        src="../public/img/Login.png"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            {/*<Input label="Name" size="lg" />*/}
            <Input type="email" label="Email" size="lg" />
            <Input type="password" label="Password" size="lg" />
            {/*<Input type="date" label="Employment Date" size="lg" />*/}
            <div className="-ml-2.5">
              <Checkbox label="I agree the Terms and Conditions" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleSignUp}>
              Sign Up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Link to="/auth/sign-in">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign in
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignUp;
