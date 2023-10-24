export const saveTokens = (response) => {
  localStorage.setItem('token',response.headers.get("Authorization"))


  const email = response.data.data.email;
  const employee_role = response.data.data.employee_role;
  const employee_id = response.data.data.id;
  const first_name = response.data.data.first_name;
  const last_name = response.data.data.last_name;
  const employee_image = response.data.data.employee_image;

  //check if window is type defined, vercel hosting may fail 
  

  localStorage.setItem("email", email);
  localStorage.setItem("employee_role", employee_role);
  localStorage.setItem("employee_id", employee_id);
  localStorage.setItem("first_name", first_name);
  localStorage.setItem("last_name", last_name);
  localStorage.setItem("employee_image", employee_image);


  localStorage.setItem("isLoggedIn", true);
};

export const clearTokens = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("employee_id");
  localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
      localStorage.removeItem("email");
      localStorage.removeItem("employee_role");
          localStorage.removeItem("employee_image");
          localStorage.removeItem("isLoggedIn");
};




