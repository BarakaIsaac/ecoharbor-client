import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import TablePagination from '@mui/material/TablePagination';
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import { backendUrl } from "../../../backendConfig.js";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { useNavigate } from "react-router-dom";

// const backendUrl = 'http://127.0.0.1:3000/departments';

Modal.setAppElement('#root'); 

const DepartmentList = () => {
  //ROLE BASED AUTHENTICATION [0] Employee [1] Procurement Manager [2] Finance Manager [3] Admin [5] SuperAdmin
  const role = localStorage.getItem('employee_role');
  const navigate = useNavigate();
  useEffect(() => {        
      if (role !== "3" && role !== "5"){
          navigate("/not-allowed");
          }
      else {
          return;
          }
      }, []);

    //DEPARTMENT FETCH API
    const [departments, setDepartments] = useState([]);
    useEffect(() => {
         axios.get(`${backendUrl}/departments`)
            .then(response => {
                setDepartments(response.data);
            })
            .catch(error => {
                console.error('Error fetching departments record: ', error);
            });
    }, []);

    //CREATE DEPARTMENT
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newDepartment, setNewDepartment] = useState({
        department_name: '', department_code: '', });
    const handleCreateDepartment = () => {
        axios.post(`${backendUrl}/departments`, newDepartment)
            .then(response => {
            const createdDepartment = response.data;
                setDepartments([...departments, createdDepartment]);
                setShowCreateModal(false);
                showSuccessMessage('Department created successfully!');
            })
            .catch(error => {
            console.error('Error creating department: ', error);
            });
        };

    //UPDATE DEPARTMENT 
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedDepartment, setEditedDepartment] = useState({
        department_name: '', department_code: '',
    });
    const handleEditClick = (department) => {
        setSelectedDepartment(department);
        setEditedDepartment({
            department_name: department.department_name,
            department_code: department.department_code,
        });
        setShowEditModal(true);
    };
    const handleSaveEdit = () => {
        axios.put(`${backendUrl}/${selectedDepartment.id}`, editedDepartment)
            .then(response => {
                setDepartments(departments.map(dep => dep.id === selectedDepartment.id ? response.data : dep));
                setShowEditModal(false);

                showSuccessMessage('Department record updated successfully!');
            })
            .catch(error => {
                console.error('Error updating department record: ', error);
            });
    };
    
    //DELETE DEPARTMENT
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleDeleteClick = (department) => {
        setSelectedDepartment(department);
        setShowDeleteModal(true);
    };
    const handleConfirmDelete = () => {
        axios.delete(`${backendUrl}/${selectedDepartment.id}`)
            .then(() => {
                setDepartments(departments.filter(dep => dep.id !== selectedDepartment.id));
                setShowDeleteModal(false);

                showSuccessMessage('Department record deleted successfully!');
            })
            .catch(error => {
                console.error('Error deleting department record: ', error);
            });
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
    const paginatedDepartments = departments.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    
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
                    <div className="flex items-center justify-between"><Typography variant="h6" color="white">Department List</Typography>
                        <button onClick={() => setShowCreateModal(true)}
                            className="bg-[#2F3D44] text-white py-2 px-4 rounded-md ml-2 hover:bg-[#379CF0] focus:outline-none">Create</button>
                    </div>
                </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-auto">
                    <thead>
                        <tr>
                            <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Department Name</Typography></th>
                            <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Department Code</Typography></th>
                            <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Actions</Typography></th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedDepartments.map((department) => (
                            <tr key={department.id} className="border-t">
                                <td><Typography color="blue-gray" className="pl-2 font-semibold text-xs text-blue-gray-500 uppercase">{department.department_name}</Typography></td>
                                <td><Typography className="text-xs font-normal text-blue-gray-500">{department.department_code}</Typography></td>
                                <td><button onClick={() => handleEditClick(department)} 
                                className={`py-1 px-3 rounded-md mb-2 border-gray-300 border-black expand-button hover:scale-105 hover:bg-[#2F3D44] hover:text-white ${role === '3' ? '' : 'opacity-50 pointer-events-none'}`} title="Edit Department">
                                        <CreateOutlinedIcon /></button>
                                    <button onClick={() => handleDeleteClick(department)} 
                                    className={`py-1 px-3 rounded-md border-black expand-button hover:scale-105 hover:bg-[#2F3D44] hover:text-white ${role === '3' ? '' : 'opacity-50 pointer-events-none'}`} title="Delete Department">
                                        <DeleteIcon style={{ color: '#BC544B' }}/></button> </td>
                            </tr>
                        ))}
                        </tbody>
                </table>
                </CardBody>
                {/* TABLE PAGINATION */}
                <div className="my-4 flex justify-between items-center">
                    <TablePagination
                        component="div"
                        count={departments.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        className="text-blue-500" />
                </div>
            </Card>
            {/* EDIT MODAL */}
            <Modal
                isOpen={showEditModal}
                onRequestClose={() => setShowEditModal(false)}
                contentLabel="Edit Department Modal"
                className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-75 bg-black">
                <div className="bg-white w-1/3 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Edit {" "}<span className="font-bold text-blue-600 underline">{selectedDepartment?.department_name}</span>{" "} Department</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Department Name</label>
                        <input
                        type="text"
                        value={editedDepartment.department_name}
                        onChange={e => setEditedDepartment({ ...editedDepartment, department_name: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Department Code</label>
                        <input
                        type="text"
                        value={editedDepartment.department_code}
                        onChange={e => setEditedDepartment({ ...editedDepartment, department_code: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
                    </div>
                    <div className="flex justify-between">
                        <button onClick={handleSaveEdit} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none">Update</button>
                        <button onClick={() => setShowEditModal(false)} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none">Cancel</button>
                    </div>
                </div>
            </Modal>
            {/* DELETE DEPARTMENT MODAL */}
            <Modal
                    isOpen={showDeleteModal}
                    onRequestClose={() => setShowDeleteModal(false)}
                    className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-75 bg-black" >
                    <div className="bg-white w-1/3 p-6 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Delete Department</h2>
                        <p className="text-gray-700 mb-4 text-center">
                            Are you sure you want to delete the{" "}
                            <span className="font-bold text-blue-600">
                            {selectedDepartment?.department_name}</span>{" "}department which is headed by{" "}
                            <span className="font-bold text-blue-600">{selectedDepartment?.head_of_department}</span>?</p>
                        <div className="flex justify-between">
                            <button onClick={handleConfirmDelete}
                            className="bg-red-500 text-white py-2 px-4 rounded-md text-xs hover:bg-red-600 focus:outline-none" >
                            Delete </button>
                            <button onClick={() => setShowDeleteModal(false)}
                            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md text-xs hover:bg-gray-400 focus:outline-none" >
                            Cancel </button>
                        </div>
                    </div>

            </Modal>
            {/* CREATE DEPARTMENT MODAL */}
            <Modal
                isOpen={showCreateModal}
                onRequestClose={() => setShowCreateModal(false)}
                contentLabel="Create Department Modal"
                className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-75 bg-black" >
                <div className="bg-white w-1/3 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Create Department</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Department Name</label>
                        <input
                            type="text"
                            value={newDepartment.department_name}
                            onChange={e => setNewDepartment({ ...newDepartment, department_name: e.target.value })}
                            className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Department Code</label>
                        <input
                        type="text"
                        value={newDepartment.department_code}
                        onChange={e => setNewDepartment({ ...newDepartment, department_code: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />                
                    </div>                
                    <div className="flex justify-between">
                        <button onClick={handleCreateDepartment} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none">Create</button>
                        <button onClick={() => setShowCreateModal(false)} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none">Cancel</button>
                    </div>
                </div>
            </Modal>
            {successMessage && <SuccessMessage message={successMessage}  />}
        </div>
    );
};

export default DepartmentList;
