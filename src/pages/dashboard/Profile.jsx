import { Card, CardBody, Avatar, Typography, } from "@material-tailwind/react";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {backendUrl} from "../../../backendConfig.js";

export function Profile() {

  // Retrieve first_name, last_name, and image URL from localStorage
  const first_name = localStorage.getItem("first_name");
  const last_name = localStorage.getItem("last_name");
  const employee_role = localStorage.getItem("employee_role");
    const department_id = localStorage.getItem("department_id");
  const userImage = localStorage.getItem("employee_image");
    const email = localStorage.getItem("email");
    const phone_number = localStorage.getItem("phone_number");
            const employment_date = localStorage.getItem("employment_date");
  const defaultImage = "data:image/png;base64,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";

//FETCH EMPLOYEE DATA
const [departmentNames, setDepartmentNames] = useState({});
    useEffect(() => {
    const fetchDepartments = async () => {
        // Fetch department data to get department names
        try {
        const departmentsResponse = await axios.get(`${backendUrl}/departments`, {
            headers: {
            'Authorization': 'Bearer your_token',
            'Content-Type': 'application/json',
            },
        });
        const departmentNameMap = {};
        departmentsResponse.data.forEach(department => {
            departmentNameMap[department.id] = department.department_name;
        });
        setDepartmentNames(departmentNameMap);
        } catch (error) {
        console.error('Error fetching department data: ', error);
        }
    };
      fetchDepartments();
    }, []);

      //ROLE NAMES
    const getRoleName = (role) => {
            // console.log('Role Value:', role); 
        switch (role) {
            case "normal_employee":
                return 'Employee';
            case "procurement_manager":
                return 'Procurement Manager';
            case "finance_manager":
                return 'Finance Manager';
            case "admin":
                return 'Admin';
            default:
                return 'Unknown Role';
        }
        };
  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Avatar src={userImage ?? defaultImage} alt="profile picture" size="xl" className="rounded-lg shadow-lg shadow-blue-gray-500/40"  />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">{first_name} {last_name}</Typography>
                <Typography variant="small"className="font-normal text-blue-gray-600" > {getRoleName(employee_role)}</Typography>
                <Typography variant="small"className="font-normal text-blue-gray-600" > </Typography>
              </div>
            </div>
  
          </div>
<div>
 
    <Typography variant="medium" color="blue-gray" className="mb-1">
      <span style={{ fontWeight: 'bold' }}>Name:</span> {first_name} {last_name}</Typography>
    <Typography variant="medium" color="blue-gray" className="mb-1">
      <span style={{ fontWeight: 'bold' }}>Department:</span> {departmentNames[department_id]} </Typography>
    <Typography variant="medium" color="blue-gray" className="mb-1">
      <span style={{ fontWeight: 'bold' }}>Date of Employment:</span> {employment_date} </Typography>
    <Typography variant="medium" color="blue-gray" className="mb-1">
      <span style={{ fontWeight: 'bold' }}>Phone Number:</span> {phone_number} </Typography>
    <Typography variant="medium" color="blue-gray" className="mb-1">
      <span style={{ fontWeight: 'bold' }}>Email:</span> {email} </Typography>


</div>
                  
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
