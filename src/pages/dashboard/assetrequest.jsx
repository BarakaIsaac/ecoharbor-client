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

import AssetRequestEditModal from './Modals/AssetRequestEditModal';
import AssetRequestDeleteModal from './Modals/AssetRequestDeleteModal';


const Api_Url = 'http://127.0.0.1:3001/requests';
// const Api_Url_asset = 'http://127.0.0.1:3001/assets_directorys';
// const Api_Url_dep = 'http://127.0.0.1:3001/departments';
// const Api_Url_emp = 'http://127.0.0.1:3001/employees';

Modal.setAppElement('#root'); 

const Assetrequest = () => {

    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [editedRequest, setEditedRequest] = useState({
        asset_id: '',
        request_id: '',
        urgency: '',
        quantity: 0,
        reason: '',
        employee_id: '',
        request_date: '',
        approval_date: '',
        request_status: '',
        
    });
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [successMessage, setSuccessMessage] = useState(null);

useEffect(() => {
    axios.get(Api_Url).then((response) => {
      
      const requestsWithNames = response.data.map((request) => {
        
        axios.get(`${Api_Url_asset}/${request.asset_id}`).then((assetResponse) => {
          request.asset_name = assetResponse.data.asset_name;
        });

        axios.get(`${Api_Url_emp}/${request.employee_id}`).then((employeeResponse) => {
          const employee = employeeResponse.data;
          request.employee_name = `${employee.first_name} ${employee.last_name}`;
        });

        return request;
      });

      setRequests(requestsWithNames);
    });
  }, []);

    const handleEditClick = (request) => {
        setSelectedRequest(request);
        setEditedRequest({
            asset_id: request.asset_id,
            request_id: request.request_id,
            urgency: request.urgency,
            quantity: request.quantity, 
            reason: request.reason,
            employee_id: request.employee_id,
            request_date: request.request_date,
            approval_date: request.approval_date,
            request_status: request.request_status,
        });
        setShowEditModal(true);
    };

    const handleSaveEdit = () => {
        axios.put(`${Api_Url}/${selectedRequest.id}`, editedRequest)
            .then(response => {
                setRequests(requests.map(req => req.id === selectedRequest.id ? response.data : req));
                setShowEditModal(false);

                showSuccessMessage('Request record updated successfully!');
            })
            .catch(error => {
                console.error('Error updating request record: ', error);
            });
    };

    const handleDeleteClick = (request) => {
        setSelectedRequest(request);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
       
        axios.delete(`${Api_Url}/${selectedRequest.id}`)
            .then(() => {
                
                setRequests(requests.filter(req => req.id !== selectedRequest.id));
                setShowDeleteModal(false);

                showSuccessMessage('Request record deleted successfully!');
            })
            .catch(error => {
                console.error('Error deleting request record: ', error);
            });
    };

    const handleChangePage = (event, newPage) => {
    setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedRequests = requests.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

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
                <div className="flex items-center">
                    <Typography variant="h6" color="white">
                        Asset Request List
                    </Typography>
                    
                </div>
            </CardHeader>

        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
                <thead>
                    <tr>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Asset</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Urgency</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Quantity</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Employee</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Request Date</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Approval Date</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Request Status</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Reason</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Actions</Typography></th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedRequests.map((request) => (
                        <tr key={request.id} className="border-t">
                        <td>
                            <Typography color="blue-gray" className="pl-2 font-semibold text-xs text-blue-gray-500 uppercase">
                            {request.asset_id}
                            </Typography>
                        </td>
                        <td>
                            <Typography className={`text-xs font-bold ${
                                request.urgency === "High" || request.urgency === "Critical" ? 'text-red-500' :
                                request.urgency === "Medium" ? 'text-blue-500' :
                                'text-black'
                            }`}>
                                {request.urgency}
                            </Typography>
                        </td>
                        {/* <td>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                            {request.urgency}
                            </Typography>
                        </td> */}
                        <td>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                            {request.quantity}
                            </Typography>
                        </td>
                        <td>
                            <Typography className="text-center text-xs font-semibold text-blue-gray-600">
                            {request.employee_id}
                            </Typography>
                        </td>
                        <td>
                            <Typography className="text-center text-xs font-semibold text-blue-gray-600">
                            {request.request_date}
                            </Typography>
                        </td>
                        <td>
                            <Typography className="text-center text-xs font-semibold text-blue-gray-600">
                            {request.approval_date}
                            </Typography>
                        </td>
                        <td>
                            <Typography className="text-center text-xs font-semibold text-blue-gray-600">
                            {request.request_status}
                            </Typography>
                        </td>
                        <td>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                            {request.reason}
                            </Typography>
                        </td>
                        <td>
                            <button onClick={() => handleEditClick(request)} className="bg-blue-500 text-white py-1 px-3 rounded-md mb-2">
                            Edit
                            </button>
                            <button onClick={() => handleDeleteClick(request)} className="bg-red-500 text-white py-1 px-3 rounded-md">
                            Delete
                            </button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
            </table>
            </CardBody>
        </Card>

        <AssetRequestEditModal
            showEditModal={showEditModal}
            setShowEditModal={setShowEditModal}
            selectedRequest={selectedRequest}
            editedRequest={editedRequest}
            setEditedRequest={setEditedRequest}
            handleSaveEdit={handleSaveEdit}
        />
      
      <AssetRequestDeleteModal
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
            selectedRequest={selectedRequest}
            handleConfirmDelete={handleConfirmDelete}
        />
            
        
        <div className="my-4 flex justify-between items-center">
        <TablePagination
            component="div"
            count={requests.length}
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

export default Assetrequest;