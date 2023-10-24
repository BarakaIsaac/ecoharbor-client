import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import TablePagination from '@mui/material/TablePagination';
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { backendUrl } from "../../../backendConfig.js";
import { useNavigate } from "react-router-dom";
//REQUEST CRUD MODALS
import RequestApproveModal from './RequestModals/RequestApproveModal';
import RequestRejectModal from './RequestModals/RequestRejectModal';
import RequestViewModal from './RequestModals/RequestViewModal';


const Api_Url = `${backendUrl}/requests`;
const Api_Url_asset = `${backendUrl}/assetz`;
const Api_Url_dep = `${backendUrl}/departments`;
const Api_Url_emp = `${backendUrl}/employees`;

Modal.setAppElement('#root'); 

const AssetRequest = () => {
    //ROLE BASED AUTHENTICATION [0] Employee [1] Procurement Manager [2] Finance Manager [3] Admin
    const role = localStorage.getItem('employee_role');
    const navigate = useNavigate();
    useEffect(() => {        
        if (role !== "1"){
            navigate("/not-allowed");
            }
        else {
            return;
            }
        }, []);

    //REQUEST FETCH API
    const [requests, setRequests] = useState([]);
    const [employeeNames, setEmployeeNames] = useState({});
    const [departmentNames, setDepartmentNames] = useState({});
    const [assetNames, setAssetNames] = useState({});
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
                axios.get(`${Api_Url_dep}/${request.department_id}`).then((departmentResponse) => {
                    request.department_name = departmentResponse.data.department_name;
                });
                axios.get(Api_Url_emp)
                    .then(response => {
                        const employeeNameMap = {};
                        response.data.forEach(employee => {
                            employeeNameMap[employee.id] = employee.first_name;
                        });
                        setEmployeeNames(employeeNameMap);
                        })
                    .catch(error => {
                        console.error('Error fetching employee data: ', error);
                    });
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
               axios.get(Api_Url_asset)
                    .then(response => {
                        const assetNameMap = {};
                        response.data.forEach(asset => {
                            assetNameMap[asset.id] = asset.asset_name;
                        });
                        setAssetNames(assetNameMap);
                        })
                    .catch(error => {
                        console.error('Error fetching asset data: ', error);
                    });





                return request;
            });
            setRequests(requestsWithNames);
        });
    }, []);
    
    
    // EDIT REQUEST - APPROVAL, REJECTION
    const [showEditApproveModal, setShowEditApproveModal] = useState(false);
    const [showEditRejectModal, setShowEditRejectModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [editedRequest, setEditedRequest] = useState({
        request_type: '', new_asset_name: '', asset_id: '', urgency: '', quantity: '', reason: '', employee_id: '', department_id: '', request_date: '', approval_date: '', procurement_comments: '', request_status: '',});
    const handleEditApproveClick = (request) => {
        setSelectedRequest(request);
        const currentDate = new Date().toISOString().slice(0, 10);
        setEditedRequest({
            approval_date: currentDate,
            procurement_comments: null,
            request_status: "Approved"
            });
        setSelectedRequestForView(request);
        console.log('Edited Request (Approve):', editedRequest);
        setShowEditApproveModal(true);
    };
    const handleSaveApproveEdit = () => {
        axios.put(`${Api_Url}/${selectedRequest.id}`, editedRequest)
            .then(response => {
                setRequests(requests.map(req => req.id === selectedRequest.id ? response.data : req));
                setShowEditApproveModal(false);

                showSuccessMessage('Request record updated successfully!');
            })
            .catch(error => {
                console.error('Error updating request record: ', error);
            });
    };
        const handleEditRejectClick = (request) => {
        setSelectedRequest(request);
        const currentDate = new Date().toISOString().slice(0, 10);
        setEditedRequest({
            approval_date: currentDate,
            procurement_comments: null,
            request_status: "Rejected"
            });
        setSelectedRequestForView(request);
        console.log('Edited Request (Reject):', editedRequest);
        console.log('Request Status:', request.request_status);
        setShowEditRejectModal(true);
    };
    const handleSaveRejectEdit = () => {
        axios.put(`${Api_Url}/${selectedRequest.id}`, editedRequest)
            .then(response => {
                setRequests(requests.map(req => req.id === selectedRequest.id ? response.data : req));
                setShowEditRejectModal(false);

                showSuccessMessage('Request record updated successfully!');
            })
            .catch(error => {
                console.error('Error updating request record: ', error);
            });
    };
    //VIEW REQUEST
    const [viewRequestModalOpen, setViewRequestModalOpen] = useState(false);
    const [selectedRequestForView, setSelectedRequestForView] = useState(null);
    const handleViewClick = (asset) => {
        setSelectedRequestForView(asset);
        setViewRequestModalOpen(true);
    };
    const closeViewRequestModal = () => {
        setSelectedRequestForView(null);
        setViewRequestModalOpen(false);
    };
    // PAGINATION
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
    setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const paginatedRequests = requests.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    // MESSAGE SUCCESS
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
                <div className="flex items-center"><Typography variant="h6" color="white" >Asset Request List</Typography></div>
            </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
                <thead>
                    <tr>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Request Date</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Department</Typography></th>                        
                        {/* <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Asset</Typography></th> */}
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Asset (new)</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Employee</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Request Type</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Quantity</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Urgency</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Approval Date</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Request Status</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Actions</Typography></th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedRequests.map((request) => (
                        <tr key={request.id} className="border-t">
                            <td><Typography className="text-left text-xs font-semibold text-blue-gray-600">{request.request_date}</Typography></td>
                            <td><Typography className="text-xs font-semibold text-blue-gray-600">{departmentNames[request.department_id] ? departmentNames[request.department_id].toUpperCase() : ''}</Typography></td>
                            {/* <td><Typography className="text-left text-xs font-semibold text-blue-gray-600 uppercase">{assetNames[request.asset_id]}</Typography></td> */}
                            <td><Typography color="blue-gray" className="pl-2 font-semibold text-xs text-blue-gray-500 uppercase">{request.new_asset_name}</Typography></td>
                            <td><Typography className="text-xs font-semibold text-blue-gray-600">{employeeNames[request.employee_id]}</Typography></td>
                            <td><Typography className="text-center text-xs font-semibold text-blue-gray-600">{request.request_type}</Typography></td>
                            <td><Typography className="text-xs font-semibold text-blue-gray-600">{request.quantity}</Typography></td>
                            <td><Typography className={`text-xs font-bold ${
                                    request.urgency === "High" || request.urgency === "Critical" ? 'text-red-500' :
                                    request.urgency === "Medium" ? 'text-blue-500' : 'text-black'
                                }`}>{request.urgency}</Typography></td>
                            <td><Typography className="text-left text-xs font-semibold text-blue-gray-600">{request.approval_date}</Typography></td>
                            <td><Typography className="text-left text-xs font-semibold text-blue-gray-600">{request.request_status}</Typography></td>
                            <td><button onClick={() => handleViewClick(request)} className="py-1 px-3 rounded-md mb-2 border-black expand-button hover:scale-105 hover:bg-[#2F3D44] hover:text-white" title="View Request">
                                <VisibilityOutlinedIcon /></button>                                
                                {/* <button onClick={() => handleDeleteClick(request)} className="bg-red-500 text-white py-1 px-3 rounded-md">Delete</button> */}
                                <button onClick={() => handleEditApproveClick(request)} className="py-1 px-3 rounded-md mb-2 border-black expand-button hover:scale-105 hover:bg-[#2F3D44] hover:text-white" title="Approve Request">
                                    <TaskAltIcon /></button>
                                <button onClick={() => handleEditRejectClick(request)} className="py-1 px-3 rounded-md border-black expand-button hover:scale-105 hover:bg-[#2F3D44] hover:text-white " title="Reject Request">
                                    <ThumbDownOffAltIcon style={{ color: '#BC544B' }} /></button></td>
                        </tr>
                    ))}
                    </tbody>
            </table>
            </CardBody>
            <div className="my-4 flex justify-between items-center">
                <TablePagination
                    component="div"
                    count={requests.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    className="text-blue-500" />
            </div>
        </Card>
        
        <RequestApproveModal
            isOpen={showEditApproveModal}
            setShowEditApproveModal={setShowEditApproveModal}
            selectedRequest={selectedRequest}
            editedRequest={editedRequest}
            setEditedRequest={setEditedRequest}
            handleSaveApproveEdit={handleSaveApproveEdit}
            request={selectedRequest} />

        <RequestRejectModal
            isOpen={showEditRejectModal}
            setShowEditRejectModal={setShowEditRejectModal}
            selectedRequest={selectedRequest}
            editedRequest={editedRequest}
            setEditedRequest={setEditedRequest}
            handleSaveRejectEdit={handleSaveRejectEdit}
            request={selectedRequest} />

        <RequestViewModal 
            isOpen={viewRequestModalOpen}
            onClose={closeViewRequestModal}
            request={selectedRequestForView} 
            selectedRequest={selectedRequest}/>
    
        {successMessage && <SuccessMessage message={successMessage}  />}
        </div>
    );
};

export default AssetRequest;