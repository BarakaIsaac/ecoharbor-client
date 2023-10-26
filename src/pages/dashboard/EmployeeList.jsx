import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import TablePagination from '@mui/material/TablePagination';
import { Card, CardHeader, CardBody, Typography, } from "@material-tailwind/react";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { useNavigate } from "react-router-dom";
//CRUD MODALS
import EmployeeEditModal from './EmployeeModals/EmployeeEditModal';
import EmployeeDeleteModal from './EmployeeModals/EmployeeDeleteModal';
import EmployeeCreateModal from './EmployeeModals/EmployeeCreateModal';
import {backendUrl} from "../../../backendConfig.js";


Modal.setAppElement('#root'); 

const EmployeeList = () => {
  //ROLE BASED AUTHENTICATION normal_employee: 0, procurement_manager: 1, finance_manager: 2, admin: 3, super_admin: 5
  const role = localStorage.getItem('employee_role');
  const navigate = useNavigate();
  useEffect(() => {        
      if (role !== "super_admin" && role !== "admin"){
          navigate("/not-allowed");
          }
      else {
          return;
          }
      }, []);
//FETCH EMPLOYEE DATA
const [employees, setEmployees] = useState([]);
const [departmentNames, setDepartmentNames] = useState({});
const [employeeCreated, setEmployeeCreated] = useState(false);

    useEffect(() => {
    const fetchEmployees = async () => {
        try {
        const employeesResponse = await axios.get(`${backendUrl}/employees`, {
            headers: {
            'Authorization': 'Bearer your_token',
            'Content-Type': 'application/json',
            },
        });
        setEmployees(employeesResponse.data);
        } catch (error) {
        console.error('Error fetching Employees record: ', error);
        }

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

    fetchEmployees(); // Fetch employees on component mount

    // Refresh employees when an employee is created
    if (employeeCreated) {
        fetchEmployees();
        setEmployeeCreated(false); // Reset the state to false
    }
    }, [employeeCreated]);

    // DELETE EMPLOYEE
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleDeleteClick = (employee) => {
        setSelectedEmployee(employee);
        setShowDeleteModal(true);
    };
    const handleConfirmDelete = () => {
        axios.delete(`${backendUrl}/employees/${selectedEmployee.id}`)
            .then(() => {
                setEmployees(employees.filter(emp => emp.id !== selectedEmployee.id));
                setShowDeleteModal(false);
                showSuccessMessage('Employee record deleted successfully!');
                onConfirm(); 
            })
            .catch(error => {
                console.error('Error deleting employee record: ', error);
            });
    };
    // CREATE EMPLOYEE
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newEmployee, setNewEmployee] = useState({ first_name: '', last_name: '', email: '', phone_number: '', password: '', employment_date: '', department_id: '', employee_role: 0, role: '', employee_image: '' });
    const handleCreateEmployee = () => {
        axios.post((`${backendUrl}/signup`), {employee: newEmployee})
            .then(response => {
            const createdEmployee = response.data;
            
                setEmployees([...employees, createdEmployee]);
                setShowCreateModal(false);
                setEmployeeCreated(true);

                showSuccessMessage('Employee record created successfully!');
            })
            .catch(error => {
            console.error('Error creating employee record: ', error);
            });
        };
    //EDIT EMPLOYEE
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [editedEmployee, setEditedEmployee] = useState({ first_name: '', last_name: '', email: '', phone_number: '', password: '', employment_date: '', department_id: '', employee_role: '', role: '', employee_image: '' });
    const [showEditModal, setShowEditModal] = useState(false);
    const handleEditClick = (employee) => {
        setSelectedEmployee(employee);
        setEditedEmployee({
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
            phone_number: employee.phone_number,
            employee_image: employee.employee_image,
            password: employee.password,
            employment_date: employee.employment_date,
            department_id: employee.department_id,
            employee_role: employee.employee_role,
         });
        setShowEditModal(true);
    };
    const handleSaveEdit = () => {
        axios.put(`${backendUrl}/employees/${selectedEmployee.id}`, editedEmployee)
            .then(response => {
                setEmployees(employees.map(emp => emp.id === selectedEmployee.id ? response.data : emp));
                setShowEditModal(false);

                showSuccessMessage('Employee record updated successfully!');
            })
            .catch(error => {
                console.error('Error updating employee record: ', error);
            });
    };
    //ROLE NAMES
    const getRoleName = (role) => {
            // console.log('Role Value:', role); normal_employee: 0, procurement_manager: 1, finance_manager: 2, admin: 3, super_admin: 5
        switch (role) {
            case "normal_employee":
            return 'Employee';
            case "procurement_manager":
            return 'Procurement Manager';
            case "finance_manager":
            return 'Finance Manager';
            case "admin":
            return 'Admin';
            case "super_admin":
            return 'Super Admin';

        }
        };

    //PAGINATION
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
    setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const paginatedEmployees = employees.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    //SUCCESS MESSAGES
    const [successMessage, setSuccessMessage] = useState(null);
    const showSuccessMessage = (message) => {
        setSuccessMessage(message);

        setTimeout(() => {
            setSuccessMessage(null);
        }, 5000); 
        };
    const SuccessMessage = ({ message }) => {
        return (
            <div className="fixed top-1/20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#2E3D44] text-white py-2 px-4 rounded-md z-50 transition-transform duration-500 shadow-md text-center">
            {message}
            </div>
        );
    };

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
           <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
                <div className="flex items-center justify-between"><Typography variant="h6" color="white">Employee List</Typography>
                    <button onClick={() => setShowCreateModal(true)} className="bg-[#2F3D44] text-white py-2 px-4 rounded-md ml-2 hover:bg-[#379CF0] focus:outline-none" >Create</button>
                </div>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-auto">
                    <thead>
                        <tr>
                            <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Name</Typography></th>
                            <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Email </Typography></th>
                            <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Phone Number</Typography></th>
                            <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Employment Date</Typography></th>
                            <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Department</Typography></th>
                            <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Employee Role</Typography></th>
                            <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Actions</Typography></th>             
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedEmployees.map((employee) => (
                            <tr key={employee.id} className="border-t">
                                <td><Typography color="blue-gray" className="pl-2 font-semibold text-xs text-blue-gray-500">
                                    {employee.first_name ? employee.first_name.toUpperCase() : ''} {' '}
                                    {employee.last_name ? employee.last_name.toUpperCase() : ''}
                                </Typography></td>
                                <td><Typography className="text-xs font-semibold text-blue-gray-600">{employee.email}</Typography></td>
                                <td><Typography className="text-xs font-semibold text-blue-gray-600">{employee.phone_number}</Typography></td>
                                <td ><Typography className="text-left text-xs font-semibold text-blue-gray-600">{employee.employment_date}</Typography></td>
                                <td><Typography className="text-xs font-semibold text-blue-gray-600">{departmentNames[employee.department_id]}</Typography></td>
                                <td><Typography className="text-xs font-semibold text-blue-gray-600">{getRoleName(employee.employee_role)}</Typography></td>
                                <td><button onClick={() => handleEditClick(employee)} 
                                    className={`py-1 px-3 rounded-md mb-2 border-gray-300 border-black expand-button hover:scale-105 hover:bg-[#2F3D44] hover:text-white ${role === 'admin' || role === 'super_admin' ? '' : 'opacity-50 pointer-events-none'}`} title="Edit Employee"><CreateOutlinedIcon /></button>
                                    <button onClick={() => handleDeleteClick(employee)} 
                                    className={`py-1 px-3 rounded-md border-black expand-button hover:scale-105 hover:bg-[#2F3D44] hover:text-white ${role === 'admin' && role === 'super_admin' ? '' : 'opacity-50 pointer-events-none'}`} title="Delete Employee"><DeleteIcon style={{ color: '#BC544B' }}/></button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                </table>
            </CardBody>
            <div className="my-4 flex justify-between items-center">
                <TablePagination
                    component="div"
                    count={employees.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    className="text-blue-500" />
            </div>
        </Card>
        <EmployeeEditModal 
            showEditModal={showEditModal}
            setShowEditModal={setShowEditModal}
            selectedEmployee={selectedEmployee}
            editedEmployee={editedEmployee}
            setEditedEmployee={setEditedEmployee}
            handleSaveEdit={handleSaveEdit}
            departmentNames={departmentNames} /> 
        <EmployeeDeleteModal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleConfirmDelete}
            departmentNames={departmentNames} />
        <EmployeeCreateModal
            showCreateModal={showCreateModal}
            setShowCreateModal={setShowCreateModal}
            handleCreateEmployee={handleCreateEmployee}
            departmentNames={departmentNames}
            newEmployee={newEmployee}
            setNewEmployee={setNewEmployee} />
        
        {successMessage && <SuccessMessage message={successMessage}  />}
        
    </div>
    );
};

export default EmployeeList
