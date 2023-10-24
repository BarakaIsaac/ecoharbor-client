export const saveTokens = (response) => {
  localStorage.setItem('token',response.headers.get("Authorization"))


  const email = response.data.data.email;
  const employee_role = response.data.data.employee_role;
  const employee_id = response.data.data.id;
  const first_name = response.data.data.first_name;
  const last_name = response.data.data.last_name;
  const employee_image = response.data.data.employee_image;
    const department_id = response.data.data.department_id;
  const employment_date = response.data.data.employment_date;
  const phone_number = response.data.data.phone_number;
  //check if window is type defined, vercel hosting may fail 
  

  localStorage.setItem("email", email);
  localStorage.setItem("employee_role", employee_role);
  localStorage.setItem("employee_id", employee_id);
  localStorage.setItem("first_name", first_name);
  localStorage.setItem("last_name", last_name);
  localStorage.setItem("employee_image", employee_image);
    localStorage.setItem("department_id", department_id);
    localStorage.setItem("employment_date", employment_date);
        localStorage.setItem("phone_number", phone_number);

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
                    localStorage.removeItem("department_id");
                    localStorage.removeItem("employment_date");
                                        localStorage.removeItem("phone_number");

};




