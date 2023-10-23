export const saveTokens = (response) => {
  const accessToken = response.headers["access-token"];
  const client = response.headers["client"];
  const uid = response.headers["uid"];
  const email = response.data.data.email;
  const employee_role = response.data.data.employee_role;
  const employee_id = response.data.data.id;
  const first_name = response.data.data.first_name;
  const last_name = response.data.data.last_name;
    const employee_image = response.data.data.employee_image;

  console.log("API Response:", response);
  console.log("Employee ID:", employee_id);
  console.log("accessToken:", accessToken);
  console.log("client:", client);
  console.log("uid:", uid);
  console.log("Employee name:", first_name);
    console.log("Employee name:", last_name);
      console.log("Employee image:", employee_image);

  // Stringify the tokens before saving them to local storage.
  const accessTokenString = JSON.stringify(accessToken);
  const clientString = JSON.stringify(client);
  const uidString = JSON.stringify(uid);
  const emailString = JSON.stringify(email);
  const employeeRoleString = JSON.stringify(employee_role);
  const employeeIdString = JSON.stringify(employee_id);

    const employeeFirst_NameString = JSON.stringify(first_name);
    const employeeLast_NameString = JSON.stringify(last_name);
    const employeeImageString = JSON.stringify(employee_image);

  //check if window is type defined, vercel hosting may fail 
  
  // Save the tokens in local storage.
  localStorage.setItem("access-token", accessTokenString);
  localStorage.setItem("client", clientString);
  localStorage.setItem("uid", uidString);
  localStorage.setItem("email", emailString);
  localStorage.setItem("employee_role", employeeRoleString);
  localStorage.setItem("employee_id", employeeIdString);
  localStorage.setItem("first_name", employeeFirst_NameString);
  localStorage.setItem("last_name", employeeLast_NameString);
  localStorage.setItem("employee_image", employeeImageString);


  console.log(
    "access-token in localStorage:",
    localStorage.getItem("access-token")
  );
  console.log("client in localStorage:", localStorage.getItem("client"));
  console.log("uid in localStorage:", localStorage.getItem("uid"));
  console.log("email in localStorage:", localStorage.getItem("email"));
  console.log("email in localStorage:", localStorage.getItem("email"));
  console.log("employee_id in localStorage:", localStorage.getItem("employee_id"));
};

export const handleTokens = (response) => {
  const accessToken = response.headers["access-token"];
  const client = response.headers["client"];
  const uid = response.headers["uid"];

  if (accessToken && client && uid) {
    localStorage.setItem("access-token", accessToken);
    localStorage.setItem("client", client);
    localStorage.setItem("uid", uid);
  }
};

// export const saveTokens = (response) => {
//   const accessToken = response.headers["access-token"];
//   const client = response.headers["client"];
//   const uid = response.headers["uid"];
//    const email = response.data.data.email;

//    console.log("API Response:", response);

//    console.log("accessToken:", accessToken);
//    console.log("client:", client);
//    console.log("uid:", uid);

//   // Save the tokens in local storage
//   localStorage.setItem("access-token", accessToken);
//   localStorage.setItem("client", client);
//   localStorage.setItem("uid", uid);

//   console.log(
//     "access-token in localStorage:",
//     localStorage.getItem("access-token")
//   );
//   console.log("client in localStorage:", localStorage.getItem("client"));
//   console.log("uid in localStorage:", localStorage.getItem("uid"));

// };

export const clearTokens = () => {
  localStorage.removeItem("access-token");
  localStorage.removeItem("client");
  localStorage.removeItem("uid");
};

// const isSessionDataStored = () => {
//   const accessToken = localStorage.getItem("access-token");
//   const client = localStorage.getItem("client");
//   const uid = localStorage.getItem("uid");

//   // Check if all session data exists
//   return accessToken && client && uid;
// };

// // // Usage example
// // if (isSessionDataStored()) {
// //   // Session data is stored in localStorage
// //   console.log("Session data is present:", accessToken, client, uid);
// // } else {
// //   // Session data is not stored in localStorage
// //   console.log("Session data is not present");
// // }
