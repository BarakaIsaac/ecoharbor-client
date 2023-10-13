import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import TablePagination from '@mui/material/TablePagination';
import ReactPaginate from "react-paginate";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

const Api_Url = 'http://127.0.0.1:3001/employees';
const Api_Url_dep = 'http://127.0.0.1:3001/departments';

Modal.setAppElement('#root'); 

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [editedEmployee, setEditedEmployee] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        username: '',
        password: '',
        employment_date: '',
        department_id: '',
        employee_role: '',
                
    });
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [departmentNames, setDepartmentNames] = useState({});

    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        axios.get(Api_Url)
            .then(response => {
            setEmployees(response.data);
            })
            .catch(error => {
            console.error('Error fetching Employees record: ', error);
            });

        // Fetch department data to get department names
        axios.get(Api_Url_dep)
            .then(response => {
            const departmentNameMap = {};
            response.data.forEach(department => {
                departmentNameMap[department.id] = department.department_name;
            });
            setDepartmentNames(departmentNameMap);
            })
            .catch(error => {
            console.error('Error fetching department data: ', error);
            });
        }, []);

    
    const handleEditClick = (employee) => {
        setSelectedEmployee(employee);
        setEditedEmployee({
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
            phone_number: employee.phone_number,
            username: employee.username,
            password: employee.password,
            employment_date: employee.employment_date,
            department_id: employee.department_id,
            employee_role: employee.employee_role,
            
        });
        setShowEditModal(true);
    };

    const handleSaveEdit = () => {
        axios.put(`${Api_Url}/${selectedEmployee.id}`, editedEmployee)
            .then(response => {
                setEmployees(employees.map(emp => emp.id === selectedEmployee.id ? response.data : emp));
                setShowEditModal(false);

                showSuccessMessage('Employee record updated successfully!');
            })
            .catch(error => {
                console.error('Error updating employee record: ', error);
            });
    };

    const handleDeleteClick = (employee) => {
        setSelectedEmployee(employee);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
       
        axios.delete(`${Api_Url}/${selectedEmployee.id}`)
            .then(() => {
                
                setEmployees(employees.filter(emp => emp.id !== selectedEmployee.id));
                setShowDeleteModal(false);
                showSuccessMessage('Employee record deleted successfully!');
            })
            .catch(error => {
                console.error('Error deleting employee record: ', error);
            });
    };

    const handleChangePage = (event, newPage) => {
    setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedEmployees = employees.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

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
          <Typography variant="h6" color="white">
           Employee List
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
                <thead>
                    <tr>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            First Name</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Last Name</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Email </Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Phone Number</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Username</Typography></th>
                        {/* <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Password</Typography></th> */}
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Employment Date</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Department</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Employee Role</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Actions</Typography></th>
             
                    </tr>
                </thead>
                <tbody>
                    {paginatedEmployees.map((employee) => (
                        <tr key={employee.id} className="border-t">
                        <td>
                            <Typography color="blue-gray" className="pl-2 font-semibold text-xs text-blue-gray-500">
                            {employee.first_name}
                            </Typography>
                        </td>
                        <td>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                            {employee.last_name}
                            </Typography>
                        </td>
                        <td>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                            {employee.email}
                            </Typography>
                        </td>
                        <td>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                            {employee.phone_number}
                            </Typography>
                        </td>
                        <td>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                            {employee.username}
                            </Typography>
                        </td>
                        {/* <td>
                            <Typography className="text-center text-xs font-semibold text-blue-gray-600">
                            {employee.password}
                            </Typography>
                        </td> */}
                        <td>
                            <Typography className="text-center text-xs font-semibold text-blue-gray-600">
                            {employee.employment_date}
                            </Typography>
                        </td>
                        <td>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                            {departmentNames[employee.department_id]}
                            </Typography>
                        </td>
                        <td>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                            {employee.employee_role}
                            </Typography>
                        </td>
                        <td>
                            <button onClick={() => handleEditClick(employee)} className="bg-blue-500 text-white py-1 px-3 rounded-md mb-2">
                            Edit
                            </button>
                            <button onClick={() => handleDeleteClick(employee)} className="bg-red-500 text-white py-1 px-3 rounded-md">
                            Delete
                            </button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
            </table>
            </CardBody>
        </Card>
        <Modal
            isOpen={showEditModal}
            onRequestClose={() => setShowEditModal(false)}
            contentLabel="Edit Employee Modal"
            className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-75 bg-black"
            >
            <div className="bg-white w-1/3 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Edit {" "}
                            <span className="font-bold text-blue-600 underline">
                                {selectedEmployee?.first_name} {selectedEmployee?.last_name}
                            </span>{" "}</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                    type="text"
                    value={editedEmployee.first_name}
                    onChange={e => setEditedEmployee({ ...editedEmployee, first_name: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                    type="text"
                    value={editedEmployee.last_name}
                    onChange={e => setEditedEmployee({ ...editedEmployee, last_name: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                    type="text"
                    value={editedEmployee.email}
                    onChange={e => setEditedEmployee({ ...editedEmployee, email: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                    type="text"
                    value={editedEmployee.email}
                    onChange={e => setEditedEmployee({ ...editedEmployee, email: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                    type="text"
                    value={editedEmployee.phone_number}
                    onChange={e => setEditedEmployee({ ...editedEmployee, phone_number: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                    type="text"
                    value={editedEmployee.username}
                    onChange={e => setEditedEmployee({ ...editedEmployee, username: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                    type="text"
                    value={editedEmployee.password}
                    onChange={e => setEditedEmployee({ ...editedEmployee, password: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Employment Date</label>
                    <input
                    type="text"
                    value={editedEmployee.employment_date}
                    onChange={e => setEditedEmployee({ ...editedEmployee, employment_date: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Department ID</label>
                    <input
                    type="text"
                    value={editedEmployee.department_id}
                    onChange={e => setEditedEmployee({ ...editedEmployee, department_id: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Employee Role</label>
                    <input
                    type="text"
                    value={editedEmployee.employee_role}
                    onChange={e => setEditedEmployee({ ...editedEmployee, employee_role: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div className="flex justify-between">
                <button onClick={handleSaveEdit} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none">
                    Update
                </button>
                <button onClick={() => setShowEditModal(false)} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none">
                    Cancel
                </button>
                </div>
            </div>
        </Modal>


        <Modal
                isOpen={showDeleteModal}
                onRequestClose={() => setShowDeleteModal(false)}
                className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-75 bg-black"
            >
                <div className="bg-white w-1/3 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Delete Employee</h2>
                    <p className="text-gray-700 mb-4 text-center">
                            Are you sure you want to delete the{" "}
                            <span className="font-bold text-blue-600">
                                {selectedEmployee?.first_name} {selectedEmployee?.last_name}
                            </span>{" "}
                            from {" "}<span className="font-bold text-blue-600">
                                {departmentNames[selectedEmployee?.department_id]}
                            </span> ?</p>
                    <div className="flex justify-between">
                        <button onClick={handleConfirmDelete} className="bg-red-500 text-white py-2 px-4 rounded-md text-xs hover:bg-red-600 focus:outline-none">
                            Delete
                        </button>
                        <button onClick={() => setShowDeleteModal(false)} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md text-xs hover:bg-gray-400 focus:outline-none">
                            Cancel
                        </button>
                    </div>
                  
                </div>
        </Modal>
        <div className="my-4 flex justify-between items-center">
        <TablePagination
            component="div"
            count={employees.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className="text-blue-500"
        />
        </div>
        {/* Conditionally render the success message  */}
        {successMessage && <SuccessMessage message={successMessage}  />}
        
        </div>
    );
};

export default EmployeeList
