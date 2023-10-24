import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import TablePagination from '@mui/material/TablePagination';
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import DeleteIcon from '@mui/icons-material/Delete';
import ConstructionIcon from '@mui/icons-material/Construction';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AddTaskIcon from '@mui/icons-material/AddTask';
//MODALS
import AssetRepairModal from './RequestModals/AssetRepairModal';
import AssetViewModal from './AssetModals/AssetViewModal';
// import AssetRequestFormModal from './RequestModals/AssetRequestFormModal';

import { backendUrl } from "../../../backendConfig.js";

const Api_Url = `${backendUrl}/assetz`;
const Api_Url_dep = `${backendUrl}/departments`;
const Api_Url_emp = `${backendUrl}/employees`;
const Api_Url_req= `${backendUrl}/requests`;

Modal.setAppElement('#root');

function MyAssets2() {
    //ASSETS FETCH API
    const [assets, setAssets] = useState([]);
    const [departmentNames, setDepartmentNames] = useState({});
    const [employeeNames, setEmployeeNames] = useState({});

    useEffect(() => {
        axios.get(Api_Url)
            .then(response => {
            setAssets(response.data);
            })
            .catch(error => {
            console.error('Error fetching Asset record: ', error);
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
            // Fetch employee data to get employee names first_name
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
                        // Fetch employee data to get employee names last_name

        }, []);

    //VIEW ASSET
    const [viewAssetModalOpen, setViewAssetModalOpen] = useState(false);
    const [selectedAssetForView, setSelectedAssetForView] = useState(null);
    const handleViewClick = (asset) => {
        setSelectedAssetForView(asset);
        setViewAssetModalOpen(true);
    };
    const closeViewModal = () => {
        setSelectedAssetForView(null);
        setViewAssetModalOpen(false);
    };

    //REQUEST NEW ASSET
    const [showRequestModal, setShowRequestModal] = useState(false);
    const openRequestModal = () => {
        setShowRequestModal(true);
    }
    const closeRequestModal = () => {
        setShowRequestModal(false);
    }

    //REQUEST ASSET REPAIR
    const [showRepairModal, setShowRepairModal] = useState(false);
    const openRepairModal = () => { setShowRepairModal(true); }
    const closeRepairModal = () => { setShowRepairModal(false); }
   
       //TO GET ASSETS FOR EMPLOYEES
    // Function to get the employee ID from local storage
    const employeeId = localStorage.getItem("employee_id");
    // console.log("LOGGED IN EMPLOYEE ID", employeeId);
    const employeeAssets =assets.filter((asset) => {
    // console.log('Asset:', asset);
    // console.log('Employee ID:', employeeId);
    return asset.employee_id == employeeId;
    });
    // console.log("Employe", employeeAssets)
    // console.log("Employee ID from local storage:", employeeId);
  
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
  


  const paginatedAssets = employeeAssets.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    // console.log('Filtered Assets:', employeeAssets);
    //SUCCESS MESSAGE
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
                <div className="flex items-center justify-between">
                    <Typography variant="h6" color="white">My Assets</Typography>
                    <div className="flex space-x-2">
                        <button onClick={openRequestModal} className="bg-[#2F3D44] text-white py-2 px-4 rounded-md ml-2 hover:bg-[#379CF0] focus:outline-none" title="Request New Asset"><AddTaskIcon /></button>
                        <button onClick={openRepairModal} className="bg-[#2F3D44] text-white py-2 px-4 rounded-md ml-2 hover:bg-[#379CF0] focus:outline-none" title="Repair Request"><ConstructionIcon /></button>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-auto">
                    <thead>
                        <tr>
                            <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Name</Typography></th>
                            <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Category </Typography></th>
                            <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Condition</Typography></th> 
                            <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Quantity</Typography></th>  
                            <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Department</Typography></th>
                            <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Staff</Typography></th>                        
                            <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Purchase Value </Typography></th>
                            <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Current value </Typography></th>          
                        </tr>
                    </thead>
                    <tbody>
                    {paginatedAssets.map((asset) => (
                            <tr key={asset.id} className="border-t">
                                <td><Typography color="blue-gray" className="pl-2 font-semibold text-xs text-blue-gray-500">{asset.asset_name.toUpperCase()}</Typography></td>
                                <td><Typography className="text-xs font-normal text-blue-gray-500">{asset.asset_category}</Typography></td>
                                <td><Typography className="text-xs font-semibold text-blue-gray-600">{asset.asset_condition}</Typography></td>
                                <td><Typography className="text-center text-xs font-semibold text-blue-gray-600">{asset.quantity}</Typography></td>                               
                                <td><Typography className="text-xs font-semibold text-[#3197ED]">{departmentNames[asset.department_id] ? departmentNames[asset.department_id].toUpperCase() : ''}</Typography></td>
                                {/* <td><Typography className="text-xs font-semibold text-[#3197ED]">
                                    {employeeNames[asset.employee_id]
                                        ? `${employeeNames[asset.employee_id].first_name} ${employeeNames1[asset.employee_id].last_name}`.toUpperCase()
                                        : ''}
                                    </Typography></td> */}
                                <td><Typography className="text-xs font-semibold text-blue-gray-600">{employeeNames[asset.employee_id]}</Typography></td>
                                <td><Typography className="text-center text-xs font-semibold text-blue-gray-600">{asset.purchase_value !== null
                                        ? Number(asset.purchase_value).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'KES',
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                            })
                                        : '0.00'}</Typography></td>
                                <td><Typography className="text-center text-xs font-semibold text-blue-gray-600">{asset.current_value !== null
                                        ? Number(asset.current_value).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'KES',
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                            })
                                        : '0.00'}</Typography></td>
                                <td><button onClick={() => handleViewClick(asset)} className="py-1 px-3 rounded-md mb-2 border-black border-black expand-button hover:scale-105 hover:bg-[#2F3D44] hover:text-white" title="View Asset">
                                    <VisibilityOutlinedIcon /></button>
             
                                </td>
                            </tr>
                        ))}
                        </tbody>
                </table>
                <div className="my-4 flex justify-between items-center">
                    <TablePagination
                        component="div"
                        count={assets.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        className="text-blue-500" />
                </div>
            </CardBody>
        </Card>
        <AssetViewModal 
            isOpen={viewAssetModalOpen}
            onClose={closeViewModal}
            asset={selectedAssetForView}
            departmentNames={departmentNames} />
        {/* <AssetRequestFormModal
                isOpen={showRequestModal}
                onClose={closeRequestModal}  /> */}

        <AssetRepairModal
                   isOpen={showRepairModal}
                    onClose={closeRepairModal} />

        {successMessage && <SuccessMessage message={successMessage}  />}
        </div>
    );
};

export default MyAssets2

