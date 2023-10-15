import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import TablePagination from '@mui/material/TablePagination';
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";

import AssetRequestEditModal from './Modals/AssetRequestEditModal';
import AssetRequestDeleteModal from './Modals/AssetRequestDeleteModal';


const Api_Url = 'http://127.0.0.1:3001/repairs';
const Api_Url_asset = 'http://127.0.0.1:3001/assets_directorys';
const Api_Url_dep = 'http://127.0.0.1:3001/departments';
const Api_Url_emp = 'http://127.0.0.1:3001/employees';

Modal.setAppElement('#root'); 

const AssetRepairs = () => {

    const [repairs, setRepairs] = useState([]);
    const [selectedRepair, setSelectedRepair] = useState(null);
    const [editedRepair, setEditedRepair] = useState({
        request_id: '',
        asset_id: '',
        quantity: 0,
        checkin_date: '',
        checkout_date: '',
        department_name: '',
    });
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [successMessage, setSuccessMessage] = useState(null);

useEffect(() => {
    axios.get(Api_Url).then((response) => {
      
      const repairsWithNames = response.data.map((repair) => {
        
        axios.get(`${Api_Url_asset}/${repair.asset_id}`).then((assetResponse) => {
          repair.asset_name = assetResponse.data.asset_name;
        });

        axios.get(`${Api_Url_emp}/${repair.employee_id}`).then((employeeResponse) => {
          const employee = employeeResponse.data;
          repair.employee_name = `${employee.first_name} ${employee.last_name}`;
        });

        return repair;
      });

      setRepairs(repairsWithNames);
    });
  }, []);

    const handleEditClick = (repair) => {
        setSelectedRepair(repair);
        setEditedRepair({
            request_id: repair.request_id,
            asset_id: repair.asset_id,
            quantity: repair.quantity, 
            reason: repair.reason,
            checkin_date: repair.checkin_date,
            checkout_date: repair.checkout_date,
            approval_date: repair.approval_dat,
        });
        setShowEditModal(true);
    };

    const handleSaveEdit = () => {
        axios.put(`${Api_Url}/${selectedRepair.id}`, editedRepair)
            .then(response => {
                setRepairs(repairs.map(req => rep.id === selectedRepair.id ? response.data : rep));
                setShowEditModal(false);

                showSuccessMessage('Repair record updated successfully!');
            })
            .catch(error => {
                console.error('Error updating repair record: ', error);
            });
    };

    const handleDeleteClick = (repair) => {
        setSelectedRepair(repair);
        setShowDeleteModal(true);
    };
    const handleConfirmDelete = () => {
       
        axios.delete(`${Api_Url}/${selectedRepair.id}`)
            .then(() => {
                
                setRepairs(repairs.filter(rep => rep.id !== selectedRepair.id));
                setShowDeleteModal(false);

                showSuccessMessage('Repair record deleted successfully!');
            })
            .catch(error => {
                console.error('Error deleting repair record: ', error);
            });
    };

    //PAGINATION
    const handleChangePage = (event, newPage) => { setPage(newPage); };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const paginatedRepairs = repairs.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    
    //SUCCESS MESSAGE
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
                    <div className="flex items-center"><Typography variant="h6" color="white">Asset Repair List</Typography></div>
                </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-auto">
                    <thead>
                        <tr>
                            <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Repair id</Typography></th>
                            <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Asset Name</Typography></th>
                            <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Quantity</Typography></th>
                            <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Check In Date</Typography></th>
                            <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Check Out Date</Typography></th>
                            <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Department</Typography></th>
                            <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Actions</Typography></th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedRepairs.map((repair) => (
                            <tr key={repair.id} className="border-t">
                                <td><Typography color="blue-gray" className="pl-2 font-semibold text-xs text-blue-gray-500 uppercase">{repair.id}</Typography></td>
                                <td><Typography className="text-xs font-normal text-blue-gray-500">{repair.asset_name}</Typography></td>
                                <td><Typography className="text-xs font-semibold text-blue-gray-600">{repair.checkin_date}</Typography></td>
                                <td><Typography className="text-center text-xs font-semibold text-blue-gray-600">{repair.checkout_date}</Typography></td>
                                <td><Typography className="text-center text-xs font-semibold text-blue-gray-600">{repair.checkout_date}</Typography></td>
                                <td><Typography className="text-center text-xs font-semibold text-blue-gray-600">{repair.department}</Typography></td>
                                <td><button onClick={() => handleEditClick(repair)} className="bg-blue-500 text-white py-1 px-3 rounded-md mb-2">Edit</button>
                                    <button onClick={() => handleDeleteClick(repair)} className="bg-red-500 text-white py-1 px-3 rounded-md">Delete</button></td>
                            </tr>
                        ))}
                        </tbody>
                </table>
                </CardBody>
            </Card>

            {/* <AssetRequestEditModal
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
                /> */}
                
            <div className="my-4 flex justify-between items-center">
            <TablePagination
                component="div"
                count={repairs.length}
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

export default AssetRepairs;