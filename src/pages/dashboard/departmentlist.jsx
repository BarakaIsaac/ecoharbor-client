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

const Api_Url = 'http://127.0.0.1:3001/departments';

Modal.setAppElement('#root'); 

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [editedDepartment, setEditedDepartment] = useState({
        department_name: '',
        department_code: '',
        head_of_department: '',
        assets: 0,
        asset_value: 0,
        
    });
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        
        axios.get(Api_Url)
            .then(response => {
                setDepartments(response.data);
            })
            .catch(error => {
                console.error('Error fetching departments record: ', error);
            });
    }, []);

    const handleEditClick = (department) => {
        setSelectedDepartment(department);
        setEditedDepartment({
            department_name: department.department_name,
            department_code: department.department_code,
            head_of_department: department.head_of_department,
            assets: department.total_assets, 
            asset_value: department.asset_total_value,
        });
        setShowEditModal(true);
    };

    const handleSaveEdit = () => {
        axios.put(`${Api_Url}/${selectedDepartment.id}`, editedDepartment)
            .then(response => {
                setDepartments(departments.map(dep => dep.id === selectedDepartment.id ? response.data : dep));
                setShowEditModal(false);
            })
            .catch(error => {
                console.error('Error updating department record: ', error);
            });
    };

    const handleDeleteClick = (department) => {
        setSelectedDepartment(department);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
       
        axios.delete(`${Api_Url}/${selectedDepartment.id}`)
            .then(() => {
                
                setDepartments(departments.filter(dep => dep.id !== selectedDepartment.id));
                setShowDeleteModal(false);
            })
            .catch(error => {
                console.error('Error deleting department record: ', error);
            });
    };

    const handleChangePage = (event, newPage) => {
    setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedDepartments = departments.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
            <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Department List
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
                <thead>
                    <tr>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Department Name</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Department Code</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Head of Department</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Total No. Assets</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Asset Total Value (KES)</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Actions</Typography></th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedDepartments.map((department) => (
                        <tr key={department.id} className="border-t">
                        <td>
                            <Typography color="blue-gray" className="font-semibold text-xs text-blue-gray-500 uppercase">
                            {department.department_name}
                            </Typography>
                        </td>
                        <td>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                            {department.department_code}
                            </Typography>
                        </td>
                        <td>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                            {department.head_of_department}
                            </Typography>
                        </td>
                        <td>
                            <Typography className="text-center text-xs font-semibold text-blue-gray-600">
                            {department.total_assets}
                            </Typography>
                        </td>
                        <td>
                            <Typography className="text-center text-xs font-semibold text-blue-gray-600">
                            {department.asset_total_value}
                            </Typography>
                        </td>
                        <td>
                            <button onClick={() => handleEditClick(department)} className="bg-blue-500 text-white py-1 px-3 rounded-md mb-2">
                            Edit
                            </button>
                            <button onClick={() => handleDeleteClick(department)} className="bg-red-500 text-white py-1 px-3 rounded-md">
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
            contentLabel="Edit Department Modal"
            className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-75 bg-black"
            >
            <div className="bg-white w-1/3 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Edit {" "}
                            <span className="font-bold text-blue-600 underline">
                                {selectedDepartment?.department_name}
                            </span>{" "} Department</h2>

                <div className="mb-4">
                
                    <label className="block text-sm font-medium text-gray-700">Department Name</label>
                    <input
                    type="text"
                    value={editedDepartment.department_name}
                    onChange={e => setEditedDepartment({ ...editedDepartment, department_name: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                
                </div>

                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Department Code</label>
                    <input
                    type="text"
                    value={editedDepartment.department_code}
                    onChange={e => setEditedDepartment({ ...editedDepartment, department_code: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                
                </div>

                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Head of Department</label>
                    <input
                    type="text"
                    value={editedDepartment.head_of_department}
                    onChange={e => setEditedDepartment({ ...editedDepartment, head_of_department: e.target.value })}
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
                    <h2 className="text-2xl font-semibold mb-4 text-center">Delete Department</h2>
                    <p className="text-gray-700 mb-4 text-center">
                            Are you sure you want to delete the{" "}
                            <span className="font-bold text-blue-600">
                                {selectedDepartment?.department_name}
                            </span>{" "}
                            department which is headed by{" "}
                            <span className="font-bold text-blue-600">
                                {selectedDepartment?.head_of_department}
                            </span>
                            ?
                            </p>
                    <div className="flex justify-between">
                        <button onClick={handleConfirmDelete} className="bg-red-500 text-white py-2 px-4 rounded-md text-xs hover:bg-red-600 focus:outline-none">
                            Delete
                        </button>
                        <button onClick={() => setShowDeleteModal(false)} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md text-xs hover:bg-gray-400 focus:outline-none">
                            Cancel
                        </button>
                    </div>

                    {/* <div className="flex justify-between">
                        <button onClick={handleConfirmDelete} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none ">
                            Delete</button>
                        <button onClick={() => setShowDeleteModal(false)} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none">
                            Cancel</button>
                    </div> */}
                </div>
        </Modal>
        <div className="my-4 flex justify-between items-center">
        <TablePagination
            component="div"
            count={departments.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className="text-blue-500"
        />
        </div>
        </div>
    );
};

export default DepartmentList;
