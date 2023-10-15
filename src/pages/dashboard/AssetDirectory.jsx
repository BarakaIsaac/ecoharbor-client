import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import TablePagination from '@mui/material/TablePagination';
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import AssetViewModal from './Modals/AssetViewModal';
import AssetCreateModal from './Modals/AssetCreateModal';
import AssetDeleteModal from './Modals/AssetDeleteModal';
import AssetEditModal from './Modals/AssetEditModal';

const Api_Url = 'http://127.0.0.1:3001/assets_directorys';
const Api_Url_dep = 'http://127.0.0.1:3001/departments';

Modal.setAppElement('#root');

function AssetDirectory() {
    const [assets, setAssets] = useState([]);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [editedAsset, setEditedAsset] = useState({
        asset_name: '',
        category_name: '',
        category_code: '',
        condition: '',
        status: '',
        purchase_value: '',
        current_value: '',
        quantity_in_stock: '',
        department_id: '',
        asset_image: '',
                
    });
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newAsset, setNewAsset] = useState({
        asset_name: '',
        category_name: '',
        category_code: '',
        condition: '',
        // status: '',
        purchase_value: '',
        current_value: '',
        quantity_in_stock: '',
        department_id: '',
        asset_image: '',
    });

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [departmentNames, setDepartmentNames] = useState({});

    const [successMessage, setSuccessMessage] = useState(null);

    const [uniqueAssetCategories, setUniqueAssetCategories] = useState([]);   
    
    const [showCustomCategoryInput, setShowCustomCategoryInput] = useState(false);
    const [customCategory, setCustomCategory] = useState('');

    const [viewAssetModalOpen, setViewAssetModalOpen] = useState(false);
    const [selectedAssetForView, setSelectedAssetForView] = useState(null);

    useEffect(() => {
        axios.get(Api_Url)
            .then(response => {
            setAssets(response.data);

            // Extract unique asset category names
                const uniqueCategories = [...new Set(response.data.map(asset => asset.category_name))];
                setUniqueAssetCategories(uniqueCategories);

                setAssetConditions(response.data);
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
        }, []);

    const handleEditClick = (asset) => {
        setSelectedAsset(asset);
        setEditedAsset({
            asset_name: asset.asset_name,
            category_name: asset.category_name,
            category_code: asset.category_code,
            condition: asset.condition,
            // status: asset.status,
            purchase_value: asset.purchase_value,
            current_value: asset.current_value,
            quantity_in_stock: asset.quantity_in_stock,
            department_id: asset.department_id,
            asset_image: asset.asset_image,            
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

    const handleChangePage = (event, newPage) => {
    setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedAssets = assets.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

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
                                <Typography variant="h6" color="white">
                                    Asset Directory
                                </Typography>
                                <button
                                    onClick={() => setShowCreateModal(true)}
                                    className="bg-[#2F3D44] text-white py-2 px-4 rounded-md ml-2 hover:bg-[#379CF0] focus:outline-none"
                                >
                                    Create
                                </button>
                            </div>
            </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
                <thead>
                    <tr>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Name</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Code </Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Category</Typography></th>                        
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Condition</Typography></th>
                        {/* <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Status</Typography></th> */}
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Purchase Value [KES]</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Current value [KES]</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Quantity</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Owning Dept</Typography></th>
                        {/* <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Asset Image</Typography></th> */}
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Actions</Typography></th>
             
                    </tr>
                </thead>
                <tbody>
                  {paginatedAssets.map((asset) => (
                        <tr key={asset.id} className="border-t">
                        <td>
                            <Typography color="blue-gray" className="pl-2 font-semibold text-xs text-blue-gray-500">
                            {asset.asset_name}
                            </Typography>
                        </td>
                        <td>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                            {asset.category_code}
                            </Typography>
                        </td>
                        <td>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                            {asset.category_name}
                            </Typography>
                        </td>
                        <td>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                            {asset.condition}
                            </Typography>
                        </td>
                        {/* <td>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                            {asset.status}
                            </Typography>
                        </td> */}
                        <td>
                            <Typography className="text-center text-xs font-semibold text-blue-gray-600">
                            {asset.purchase_value}
                            </Typography>
                        </td>
                        <td>
                            <Typography className="text-center text-xs font-semibold text-blue-gray-600">
                            {asset.current_value}
                            </Typography>
                        </td>
                        <td>
                            <Typography className="text-center text-xs font-semibold text-blue-gray-600">
                            {asset.quantity_in_stock}
                            </Typography>
                        </td>
                        <td>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                            {departmentNames[asset.department_id]}
                            </Typography>
                        </td>
                        {/* <td>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                            {asset.asset_image}
                            </Typography>
                        </td> */}
                        <td>
                            <button onClick={() => handleViewClick(asset)} className="py-1 px-3 rounded-md mb-2 border-black"><VisibilityOutlinedIcon /></button>
                            <button onClick={() => handleEditClick(asset)} className="py-1 px-3 rounded-md mb-2 border-gray-300"><CreateOutlinedIcon /></button>
                            <button onClick={() => handleDeleteClick(asset)} className="py-1 px-3 rounded-md"><DeleteIcon style={{ color: '#BC544B' }} /></button>                            
                        </td>
                        </tr>
                    ))}
                    </tbody>
            </table>
            </CardBody>
        </Card>

        <AssetEditModal 
            showEditModal={showEditModal}
            setShowEditModal={setShowEditModal}
            selectedAsset={selectedAsset}
            editedAsset={editedAsset}
            setEditedAsset={setEditedAsset}
            handleSaveEdit={handleSaveEdit}
            uniqueAssetCategories={uniqueAssetCategories}
            showCustomCategoryInput={showCustomCategoryInput}
            setShowCustomCategoryInput={setShowCustomCategoryInput}
            customCategory={customCategory}
            setCustomCategory={setCustomCategory}
            departmentNames={departmentNames}
        /> 


        
        <AssetDeleteModal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleConfirmDelete}
            assetName={selectedAsset?.asset_name}
                
            />
        
        <AssetCreateModal
                showCreateModal={showCreateModal}
                setShowCreateModal={setShowCreateModal}
                handleCreateAsset={handleCreateAsset}
                departmentNames={departmentNames}
                newAsset={newAsset}
                setNewAsset={setNewAsset}
                showCustomCategoryInput={showCustomCategoryInput}
                uniqueAssetCategories={uniqueAssetCategories}
            />

        <AssetViewModal 
            isOpen={viewAssetModalOpen}
            onClose={closeViewModal}
            asset={selectedAssetForView}
            departmentNames={departmentNames}
        
        />

        <div className="my-4 flex justify-between items-center">
            <TablePagination
                component="div"
                count={assets.length}
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

export default AssetDirectory
