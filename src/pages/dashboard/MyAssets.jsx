import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import TablePagination from '@mui/material/TablePagination';
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ConstructionIcon from '@mui/icons-material/Construction';
//CRUD MODALS
import MyAssetRepairModal from './RequestModals/MyAssetRepairModal';
import AssetViewModal from './AssetModals/AssetViewModal';
import MyAssetNewRequestModal from './RequestModals/MyAssetNewRequestModal';

const Api_Url = 'http://127.0.0.1:3001/assetz';
const Api_Url_dep = 'http://127.0.0.1:3001/departments';
const Api_Url_emp = 'http://127.0.0.1:3001/employees';
const Api_Url_req= 'http://127.0.0.1:3001/requests';

Modal.setAppElement('#root');

function MyAssets() {
    const [assets, setAssets] = useState([]);
    //FETCH ASSETS
    const [departmentNames, setDepartmentNames] = useState({});
    useEffect(() => {
        axios.get(Api_Url)
            .then((response) => {
            setAssets(response.data);
            })
            .catch((error) => {
            console.error('Error fetching Asset record: ', error);
            });
        // Fetch department data to get department names
        axios.get(Api_Url_dep)
            .then((response) => {
            const departmentNameMap = {};
            response.data.forEach((department) => {
                departmentNameMap[department.id] = department.department_name;
            });
            setDepartmentNames(departmentNameMap);
            })
            .catch((error) => {
            console.error('Error fetching department data: ', error);
            });
        }, []);

    //REQUEST NEW ASSET
    const [showNewAssetRequestModal, setShowNewAssetRequestModal] = useState(false);
    const [newAssetRequest, setNewAssetRequest] = useState({
        new_asset_name: '', request_type: '', urgency: '', reason: '', request_date: '', request_status: '', asset_id: '', employee_id: '', department_id: '',});
     const handleNewAssetRequest = () => {
        axios.post(Api_Url, newAsset)
            .then(response => {
                const createdAsset = response.data;
                    setAssetRequest([...assets, createdAsset]);
                    setShowNewAssetRequestModal(false);
                    showSuccessMessage('Asset record created successfully!');
                })
                .catch(error => {
                console.error('Error creating asset record: ', error);
                });
    };

    
    //REQUEST ASSET REPAIR
    const [showRepairModal, setShowRepairModal] = useState(false);
    const [assetRepair, setAssetRepair] = useState({
        quantity: '', checkin_date: '', request_id: '', asset_id: '', employee_id: '', department_id: '',});
     const handleAssetRepair = () => {
        axios.post(Api_Url, newAsset)
            .then(response => {
                const createdAsset = response.data;
                    setAssetRepair([...assets, createdAsset]);
                    setShowAssetRepairModal(false);
                    showSuccessMessage('Asset record created successfully!');
                })
                .catch(error => {
                console.error('Error creating asset record: ', error);
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
    const paginatedAssets = assets.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
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
    //MY ASSET VIEW
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

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
            <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
                <div className="flex items-center">
                    <Typography variant="h6" color="white">My Assets</Typography>
                        <button onClick={() => setShowNewAssetRequestModal(true)} className="bg-[#2F3D44] text-white py-2 px-4 rounded-md ml-2 hover:bg-[#379CF0] focus:outline-none" title="Request New Asset"><AddTaskIcon /></button>
                        <button onClick={() => setShowAssetRepairModal(true)} className="bg-[#2F3D44] text-white py-2 px-4 rounded-md ml-2 hover:bg-[#379CF0] focus:outline-none" title="Repair Request"><ConstructionIcon /></button>
                </div>
            </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
                <thead>
                    <tr>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Name</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Category</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Condition</Typography></th>                        
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Purchase Value</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Quantity</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Owning Dept</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Actions</Typography></th>
                     </tr>
                </thead>
                <tbody>
                  {paginatedAssets.map((asset) => (
                        <tr key={asset.id} className="border-t">
                          <td><Typography color="blue-gray" className="pl-2 font-semibold text-xs text-blue-gray-500">{asset.asset_name}</Typography></td>
                          <td><Typography className="text-xs font-normal text-blue-gray-500">{asset.asset_category}</Typography></td>
                          <td><Typography className="text-xs font-semibold text-blue-gray-600">{asset.asset_condition}</Typography></td>
                          <td><Typography className="text-xs font-semibold text-blue-gray-600">{asset.condition}</Typography></td>
                          <td><Typography className="text-center text-xs font-semibold text-blue-gray-600">{asset.quantity}</Typography></td>
                          <td><Typography className="text-xs font-semibold text-blue-gray-600">{departmentNames[asset.department_id]}</Typography></td>
                          <td><Typography className="text-xs font-semibold text-blue-gray-600">{asset.employee_id}</Typography></td>
                          <td><button onClick={() => handleViewClick(asset)} className="py-1 px-3 rounded-md mb-2 border-black expand-button hover:scale-105 hover:bg-[#2F3D44] hover:text-white">
                            <VisibilityOutlinedIcon /></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </CardBody>
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
        </Card>         
        <MyAssetNewRequestModal
            showNewAssetRequestModal={showNewAssetRequestModal}
            setShowNewAsseRequestModal={setShowNewAssetRequestModal}
            handleNewAssetRequest={handleNewAssetRequest}
            departmentNames={departmentNames}
            newAssetRequest={newAssetRequest}
            setNewAssetRequest={setNewAssetRequest} />
        <AssetViewModal 
            isOpen={viewAssetModalOpen}
            onClose={closeViewModal}
            asset={selectedAssetForView}
            departmentNames={departmentNames} />
        <MyAssetRepairModal 
            showRepairModal={showRepairModal}
            setShowRepairModal={setShowRepairModal}
            handleRepairAsset={handleRepairAsset}
            departmentNames={departmentNames}
            newAssetRepair={newAssetRepair}
            setNewAssetRepair={setNewAssetRepair} />
                 
        {successMessage && <SuccessMessage message={successMessage}  />}
      </div>
    );
};

export default MyAssets
