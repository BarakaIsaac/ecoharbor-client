import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import React, { useState } from 'react';

import { Card, CardHeader, CardBody, CardFooter, Input, Checkbox, Button, Typography, } from "@material-tailwind/react";
import {saveTokens} from "../../tokens/tokens.jsx";

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const Api_Url = 'http://localhost:3001/employees/tokens';

  const handleSignIn = async () => {
    try {
      const response = await axios.post(`${Api_Url}/sign_in`, {
        email: email,
        password: password,
      });
      saveTokens(response);

      navigate("/dashboard/home");
      console.log('Sign-in successful', response.data);
    } catch (error) {
      console.error('Sign-in failed', error);
      // Check the response status code to determine the error type.
  //     if (error.response) {
  //       console.error('Response status:', error.response.status);
  //       console.error('Response data:', error.response.data);
  //     }
  //   }
  // };
if (error.response) {
        // Check the response status code to determine the error type.
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);

        // Display an error message based on the response status code.
        if (error.response.status === 401) {
          setErrorMessage('Incorrect Email or Password');
        } else {
          setErrorMessage('An error occurred. Please try again later.');
        }
      }
    }
  };

  return (
    <>
      <img src="../public/img/Login.svg" className="absolute inset-0 z-0 h-full w-full object-cover"  />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-3/4 w-full max-w-[34rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader variant="gradient" color="blue" className="mb-4 grid h-28 place-items-center" >
            <Typography variant="h3" color="white">Sign In</Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input type="email" label="Email" size="lg" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" label="Password" size="lg" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="-ml-2.5"><Checkbox label="Remember Me" /></div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleSignIn}>Sign In</Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              No Access?
              {/* <Link to="/auth/sign-up"> */}
                <Typography as="span" variant="small" color="blue" className="ml-1 font-bold" >
                  Talk to Ecoharbour Admin to create an account for you
                </Typography>
              {/* </Link> */}
            </Typography>
            {errorMessage && (<div className="bg-red-500 text-white text-center p-4 m-2 rounded-lg shadow-md">{errorMessage}</div>)}
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignIn;