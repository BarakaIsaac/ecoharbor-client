import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import TablePagination from '@mui/material/TablePagination';
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
//MODALS
import AssetViewModal from './AssetModals/AssetViewModal';
import AssetCreateModal from './AssetModals/AssetCreateModal';
import AssetDeleteModal from './AssetModals/AssetDeleteModal';
import AssetEditModal from './AssetModals/AssetEditModal';
import AssetValuationModal from './AssetModals/AssetValuationModal';
import AssetAllocationModal from './AssetModals/AssetAllocationModal';

const Api_Url = 'http://127.0.0.1:3001/assetz';
const Api_Url_dep = 'http://127.0.0.1:3001/departments';
const Api_Url_emp = 'http://127.0.0.1:3001/employees';

Modal.setAppElement('#root');

function AssetDirectory() {
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
            // Fetch employee data to get employee names
        axios.get(Api_Url_dep)
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
        }, []);

    //UPDATE ASSETS
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [editedAsset, setEditedAsset] = useState({ asset_name: '', asset_category: '', asset_image: '', asset_condition: '', purchase_value: '', current_value: '', quantity: '', department_id: '', employee_id: '' });

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
    //CREATE ASSET
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newAsset, setNewAsset] = useState({
        asset_name: '', asset_category: '', asset_image: '', asset_condition: '', purchase_value: '', current_value: '', quantity: '', department_id: '', employee_id: ''});
    const handleCreateAsset = () => {
        axios.post(Api_Url, newAsset)
            .then(response => {
                const createdAsset = response.data;                    
                    setAssets([...assets, createdAsset]);
                    setShowCreateModal(false);
                    showSuccessMessage('Asset record created successfully!');
                })
                .catch(error => {
                console.error('Error creating asset record: ', error);
            });
        };
    //EDIT ASSETS
    const [showEditModal, setShowEditModal] = useState(false);
    const handleEditClick = (asset) => {
        setSelectedAsset(asset);
        setEditedAsset({
            asset_name: asset.asset_name,
            asset_category: asset.asset_category,
            asset_image: asset.asset_image,
            asset_condition: asset.asset_condition,
            purchase_value: asset.purchase_value,
            current_value: asset.current_value,
            quantity: asset.quantity,
            department_id: asset.department_id,
            employee_id: asset.employee_id,            
        });
        setShowEditModal(true);
    };
    const handleSaveEdit = () => {
        axios.put(`${Api_Url}/${selectedAsset.id}`, editedAsset)
            .then(response => {
                setAssets(assets.map(ast => ast.id === selectedAsset.id ? response.data : ast));
                setShowEditModal(false);
                showSuccessMessage('Asset record updated successfully!');
            })
            .catch(error => {
                console.error('Error updating asset record: ', error);
            });
    };
    //EDIT ASSETS VALUATION
    const [showEditValuationModal, setShowEditValuationModal] = useState(false);
    const handleEditValuationClick = (asset) => {
        setSelectedAsset(asset);
        setEditedAsset({
            asset_name: asset.asset_name,
            asset_category: asset.asset_category,
            asset_image: asset.asset_image,
            asset_condition: asset.asset_condition,
            purchase_value: asset.purchase_value,
            current_value: asset.current_value,
            quantity: asset.quantity,
            department_id: asset.department_id,
            employee_id: asset.employee_id,            
        });
        setShowEditValuationModal(true);
    };
    const handleSaveEditValuation = () => {
        axios.put(`${Api_Url}/${selectedAsset.id}`, editedAsset)
            .then(response => {
                setAssets(assets.map(ast => ast.id === selectedAsset.id ? response.data : ast));
                setShowEditValuationModal(false);
                showSuccessMessage('Asset record updated successfully!');
            })
            .catch(error => {
                console.error('Error updating asset record: ', error);
            });
    };
    //EDIT ASSETS VALUATION
    const [showEditAllocationModal, setShowEditAllocationModal] = useState(false);
    const handleEditAllocationClick = (asset) => {
        setSelectedAsset(asset);
        setEditedAsset({
            asset_name: asset.asset_name,
            asset_category: asset.asset_category,
            asset_image: asset.asset_image,
            asset_condition: asset.asset_condition,
            purchase_value: asset.purchase_value,
            current_value: asset.current_value,
            quantity: asset.quantity,
            department_id: asset.department_id,
            employee_id: asset.employee_id,            
        });
        setShowEditAllocationModal(true);
    };
    const handleSaveEditAllocation = () => {
        axios.put(`${Api_Url}/${selectedAsset.id}`, editedAsset)
            .then(response => {
                setAssets(assets.map(ast => ast.id === selectedAsset.id ? response.data : ast));
                setShowEditAllocationModal(false);
                showSuccessMessage('Asset record updated successfully!');
            })
            .catch(error => {
                console.error('Error updating asset record: ', error);
            });
    };

    //DELETE ASSETS
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleDeleteClick = (asset) => {
        setSelectedAsset(asset);
        setShowDeleteModal(true);
    };
    const handleConfirmDelete = () => {
        axios.delete(`${Api_Url}/${selectedAsset.id}`)
            .then(() => {
                setAssets(assets.filter(ast => ast.id !== selectedAsset.id));
                setShowDeleteModal(false);
                showSuccessMessage('Asset record deleted successfully!');
            })
            .catch(error => {
                console.error('Error deleting asset record: ', error);
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

   return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
            <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
                <div className="flex items-center"><Typography variant="h6" color="white">Asset Directory</Typography>
                    <button onClick={() => setShowCreateModal(true)}
                                    className="bg-[#2F3D44] text-white py-2 px-4 rounded-md ml-2 hover:bg-[#379CF0] focus:outline-none" >
                                    Create </button>
                    <button onClick={() => setShowEditValuationModal(true)}
                                    className="bg-[#2F3D44] text-white py-2 px-4 rounded-md ml-2 hover:bg-[#379CF0] focus:outline-none" >
                                    Asset Valuation </button>
                    <button onClick={() => setShowEditAllocationModal(true)}
                                    className="bg-[#2F3D44] text-white py-2 px-4 rounded-md ml-2 hover:bg-[#379CF0] focus:outline-none" >
                                    Asset Allocation </button>
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
                            <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Purchase Value (KES)</Typography></th>
                            <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Current value (KES)</Typography></th>          
                        </tr>
                    </thead>
                    <tbody>
                    {paginatedAssets.map((asset) => (
                            <tr key={asset.id} className="border-t">
                                <td><Typography color="blue-gray" className="pl-2 font-semibold text-xs text-blue-gray-500">{asset.asset_name}</Typography></td>
                                <td><Typography className="text-xs font-normal text-blue-gray-500">{asset.asset_category}</Typography></td>
                                <td><Typography className="text-xs font-semibold text-blue-gray-600">{asset.asset_condition}</Typography></td>
                                <td><Typography className="text-center text-xs font-semibold text-blue-gray-600">{asset.quantity}</Typography></td>
                                <td><Typography className="text-xs font-semibold text-blue-gray-600">{departmentNames[asset.department_id]}</Typography></td>
                                <td><Typography className="text-xs font-semibold text-blue-gray-600">{employeeNames[asset.employee_id]}</Typography></td>
                                <td><Typography className="text-center text-xs font-semibold text-blue-gray-600">{asset.purchase_value}</Typography></td>
                                <td><Typography className="text-center text-xs font-semibold text-blue-gray-600">{asset.current_value}</Typography></td>
                                <td><button onClick={() => handleViewClick(asset)} className="py-1 px-3 rounded-md mb-2 border-black border-black expand-button hover:scale-105 hover:bg-[#2F3D44] hover:text-white" title="View Asset">
                                    <VisibilityOutlinedIcon /></button>
                                    <button onClick={() => handleEditClick(asset)} className="py-1 px-3 rounded-md mb-2 border-gray-300 border-black expand-button hover:scale-105 hover:bg-[#2F3D44] hover:text-white"title="Edit Asset">
                                        <CreateOutlinedIcon /></button>
                                    <button onClick={() => handleDeleteClick(asset)} className="py-1 px-3 rounded-md border-black expand-button hover:scale-105 hover:bg-[#2F3D44] hover:text-white" title="Delete Asset">
                                        <DeleteIcon style={{ color: '#BC544B' }}/></button>                            
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

        <AssetEditModal 
            showEditModal={showEditModal}
            setShowEditModal={setShowEditModal}
            selectedAsset={selectedAsset}
            editedAsset={editedAsset}
            setEditedAsset={setEditedAsset}
            handleSaveEdit={handleSaveEdit}
            departmentNames={departmentNames} /> 
        <AssetDeleteModal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleConfirmDelete}
            assetName={selectedAsset?.asset_name} />
        <AssetCreateModal
            showCreateModal={showCreateModal}
            setShowCreateModal={setShowCreateModal}
            handleCreateAsset={handleCreateAsset}
            departmentNames={departmentNames}
            newAsset={newAsset}
            setNewAsset={setNewAsset} />
        <AssetViewModal 
            isOpen={viewAssetModalOpen}
            onClose={closeViewModal}
            asset={selectedAssetForView}
            departmentNames={departmentNames} />
        <AssetValuationModal
            showEditValuationModal={showEditValuationModal}
            setShowEditValuationModal={setShowEditValuationModal}
            selectedAsset={selectedAsset}
            editedAsset={editedAsset}
            setEditedAsset={setEditedAsset}
            handleSaveEditValuation={handleSaveEditValuation}
            departmentNames={departmentNames} />
        <AssetAllocationModal
            showEditAllocationModal={showEditAllocationModal}
            setShowEditAllocationModal={setShowEditAllocationModal}
            selectedAsset={selectedAsset}
            editedAsset={editedAsset}
            setEditedAsset={setEditedAsset}
            handleSaveEditAllocation={handleSaveEditAllocation}
            departmentNames={departmentNames}
            employeeNames={employeeNames} />  

        {successMessage && <SuccessMessage message={successMessage}  />}
        </div>
    );
};

export default AssetDirectory
