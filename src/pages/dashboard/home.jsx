import React from "react";
import Dashboard1 from './dashboard1';



export function Home() {
  const first_name = localStorage.getItem("first_name");
  const last_name = localStorage.getItem("last_name");
  const userImage = localStorage.getItem("employee_image");

  return (
    <div className="pie-chart-container">
      <Dashboard1 />
    </div>
      

      
   
  );
}

export default Home;