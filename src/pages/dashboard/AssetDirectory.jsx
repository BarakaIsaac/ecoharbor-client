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
        status: '',
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

    const [assetConditions, setAssetConditions] = useState([]); // State to store asset conditions

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
            status: asset.status,
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
                            Category</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Category Code </Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Condition</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Status</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Purchase Value [KES]</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Current value [KES]</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Quantity</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Owning Dept</Typography></th>
                        <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">
                            Asset Image</Typography></th>
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
                            {asset.category_name}
                            </Typography>
                        </td>
                        <td>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                            {asset.category_code}
                            </Typography>
                        </td>
                        <td>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                            {asset.condition}
                            </Typography>
                        </td>
                        <td>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                            {asset.status}
                            </Typography>
                        </td>
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
                        <td>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                            {asset.asset_image}
                            </Typography>
                        </td>
                        <td>
                            <button onClick={() => handleEditClick(asset)} className="bg-blue-500 text-white py-1 px-3 rounded-md mb-2">
                            Edit
                            </button>
                            <button onClick={() => handleDeleteClick(asset)} className="bg-red-500 text-white py-1 px-3 rounded-md">
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
            contentLabel="Edit Asset Modal"
            className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-75 bg-black"
            >
            <div className="bg-white w-1/3 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Edit {" "}
                            <span className="font-bold text-blue-600 underline">
                                {selectedAsset?.asset_name}</span>{" "}</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Asset Name</label>
                    <input
                    type="text"
                    value={editedAsset.asset_name}
                    onChange={e => setEditedAsset({ ...editedAsset, asset_name: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div>
                        <label className="block text-sm font-medium text-gray-700">Asset Category</label>
                        <select
                            value={showCustomCategoryInput ? 'Other' : editedAsset.category_name}
                            onChange={e => {
                                if (e.target.value === 'Other') {
                                    setShowCustomCategoryInput(true);
                                } else {
                                    setShowCustomCategoryInput(false);
                                    setEditedAsset({ ...editedAsset, category_name: e.target.value });
                                }
                            }}
                            className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="" disabled>Select an Asset Category</option>
                            {uniqueAssetCategories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                            <option value="Other">Other (Enter custom category)</option>
                        </select>
                    </div>

                    {showCustomCategoryInput && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Custom Asset Category</label>
                            <input
                                type="text"
                                value={customCategory}
                                onChange={e => setCustomCategory(e.target.value)}
                                className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                    )}
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category Code</label>
                    <input
                    type="text"
                    value={editedAsset.category_code}
                    onChange={e => setEditedAsset({ ...editedAsset, category_code: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Asset Condition</label>
                    <input
                    type="text"
                    value={editedAsset.condition}
                    onChange={e => setEditedAsset({ ...editedAsset, condition: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-700">Asset Status</label>
                    <input
                    type="text"
                    value={editedAsset.status}
                    onChange={e => setEditedAsset({ ...editedAsset, status: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Purchase Value [KES]</label>
                    <input
                    type="text"
                    value={editedAsset.purchase_value}
                    onChange={e => setEditedAsset({ ...editedAsset, purchase_value: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Current Value [KES]</label>
                    <input
                    type="text"
                    value={editedAsset.current_value}
                    onChange={e => setEditedAsset({ ...editedAsset, current_value: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                    type="text"
                    value={editedAsset.quantity_in_stock}
                    onChange={e => setEditedAsset({ ...editedAsset, quantity_in_stock: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Department</label>
                    <select
                        value={editedAsset.department_id}
                        onChange={e => setEditedAsset({ ...editedAsset, department_id: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    >
                        <option value="" disabled className="text-grey-100" style={{ opacity: 0.6 }}>Select a Department</option>
                        {Object.keys(departmentNames).map(departmentId => (
                            <option key={departmentId} value={departmentId}>
                                {departmentNames[departmentId]}
                            </option>
                        ))}
                    </select>
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-700">Asset Image</label>
                    <input
                    type="text"
                    value={editedAsset.asset_image}
                    onChange={e => setEditedAsset({ ...editedAsset, asset_image: e.target.value })}
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
                    <h2 className="text-2xl font-semibold mb-4 text-center">Delete Asset</h2>
                    <p className="text-gray-700 mb-4 text-center">
                            Are you sure you want to delete the{" "} <span className="font-bold text-blue-600">
                                {selectedAsset?.asset_name} </span>{" "}?</p>
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

        <Modal
            isOpen={showCreateModal}
            onRequestClose={() => setShowCreateModal(false)}
            contentLabel="Create Asset Modal"
            className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-75 bg-black"
            >
            <div className="bg-white w-1/3 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Create New Asset</h2>

                <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Asset Name</label>
                <input
                    type="text"
                    value={newAsset.asset_name}
                    onChange={e => setNewAsset({ ...newAsset, asset_name: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                />
                </div>

                {/* <div>
                    <label className="block text-sm font-medium text-gray-700">Asset Category</label>
                    <select
                            value={newAsset.category_name}
                            onChange={e => setNewAsset({ ...newAsset, category_name: e.target.value })}
                            className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="" disabled>Select an Asset Category</option>
                            {uniqueAssetCategories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                </div> */}

                <div>
                        <label className="block text-sm font-medium text-gray-700">Asset Category</label>
                        <select
                            value={showCustomCategoryInput ? 'Other' : newAsset.category_name}
                            onChange={e => {
                                if (e.target.value === 'Other') {
                                    setShowCustomCategoryInput(true);
                                } else {
                                    setShowCustomCategoryInput(false);
                                    setNewAsset({ ...newAsset, category_name: e.target.value });
                                }
                            }}
                            className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="" disabled>Select an Asset Category</option>
                            {uniqueAssetCategories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                            <option value="Other">Other (Enter custom category)</option>
                        </select>
                    </div>

                    {showCustomCategoryInput && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Custom Asset Category</label>
                            <input
                                type="text"
                                value={customCategory}
                                onChange={e => setCustomCategory(e.target.value)}
                                className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                    )}


                <div>
                    <label className="block text-sm font-medium text-gray-700">Category Code</label>
                    <input
                    type="text"
                    value={newAsset.category_code}
                    onChange={e => setNewAsset({ ...newAsset, category_code: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Asset Condition</label>
                    <input
                    type="text"
                    value={newAsset.condition}
                    onChange={e => setNewAsset({ ...newAsset, condition: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Asset Status</label>
                    <input
                    type="text"
                    value={newAsset.status}
                    onChange={e => setNewAsset({ ...newAsset, status: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Asset Purchase Value [KES]</label>
                    <input
                    type="text"
                    value={newAsset.purchase_value}
                    onChange={e => setNewAsset({ ...newAsset, purchase_value: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Asset Current Value [KES] </label>
                    <input
                    type="currency"
                    value={newAsset.current_value}
                    onChange={e => setNewAsset({ ...newAsset, current_value: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                    type="text"
                    value={newAsset.quantity_in_stock}
                    onChange={e => setNewAsset({ ...newAsset, quantity_in_stock: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Department</label>
                    <select
                        value={newAsset.department_id}
                        onChange={e => setNewAsset({ ...newAsset, department_id: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    >
                        <option value="" disabled className="text-grey-100" style={{ opacity: 0.6 }}>Select a Department</option>
                        {Object.keys(departmentNames).map(departmentId => (
                            <option key={departmentId} value={departmentId}>
                                {departmentNames[departmentId]}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Asset Image</label>
                    <input
                    type="text"
                    value={newAsset.asset_image}
                    onChange={e => setNewAsset({ ...newAsset, asset_image: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div className="flex justify-between">
                <button onClick={handleCreateAsset} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none">
                    Create
                </button>
                <button onClick={() => setShowCreateModal(false)} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none">
                    Cancel
                </button>
                </div>
            </div>
        </Modal>

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
