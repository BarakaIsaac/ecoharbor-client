import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import TablePagination from '@mui/material/TablePagination';
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import { backendUrl } from "../../../backendConfig.js";
import RepairCommentModal from './RepairModals/RepairCommentModal.jsx';
import TireRepairIcon from '@mui/icons-material/TireRepair';
import { useNavigate } from "react-router-dom";

Modal.setAppElement('#root');

const Api_Url = `${backendUrl}/repairs`;
const Api_Url_asset = `${backendUrl}/assetz`;
const Api_Url_dep = `${backendUrl}/departments`;
const Api_Url_emp = `${backendUrl}/employees`;

const AssetRepair = () => {
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
  //FETCH REQUESTS
  const [repairs, setRepairs] = useState([]);
  const [editedRepair, setEditedRepair] = useState({
    request_id: '',
    asset_id: '',
    quantity: '',
    checkin_date: '',
    checkout_date: '',
    department_id: '',
    employee_id: '',
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [successMessage, setSuccessMessage] = useState(null);
  const [employeeNames, setEmployeeNames] = useState({});

useEffect(() => {
  axios.get(Api_Url).then((response) => {
    const repairsWithNames = response.data.map(async (repair) => {
      const assetResponse = await axios.get(`${Api_Url_asset}/${repair.asset_id}`);
      repair.asset_name = assetResponse.data.asset_name;

      const departmentResponse = await axios.get(`${Api_Url_dep}/${repair.department_id}`);
      repair.department_name = departmentResponse.data.department_name;

      // Fetch the employee data
      const employeeResponse = await axios.get(`${Api_Url_emp}/${repair.employee_id}`);
      if (employeeResponse.status === 200) {
        const employeeData = employeeResponse.data;
        // Ensure that the employee data has the expected structure
        if (employeeData.first_name && employeeData.last_name) {
          repair.employee_name = `${employeeData.first_name} ${employeeData.last_name}`;
        } else {
          // Handle cases where the data doesn't have the expected structure
          repair.employee_name = "N/A"; // or some default value
        }
      } else {
        // Handle cases where the employee data retrieval was unsuccessful
        repair.employee_name = "N/A"; // or some default value
      }

      return repair;
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

    Promise.all(repairsWithNames).then((repairsWithNamesData) => {
      setRepairs(repairsWithNamesData);
    });
  });
}, []);

  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedRepair, setSelectedRepair] = useState(null);
  const [editedRepairComment, setEditedRepairComment] = useState({
    checkout_date: '',
    repair_comments: '',
  });

  const handleUpdateClick = (repair) => {
    setSelectedRepair(repair);
    setEditedRepairComment({
      checkout_date: '', 
      repair_comments: '',
    });
    setShowCommentModal(true);
  };

  const openModal = () => {
    setShowCommentModal(true);
  };

  const closeModal = () => {
    setShowCommentModal(false);
  };

  const handleSaveEdit = () => {
    axios.put(`${Api_Url}/${selectedRepair.id}`, editedRepairComment)
      .then(response => {
        setRepairs(repairs.map(req => req.id === selectedRepair.id ? response.data : req));
        setRepairs(prevRepairs => prevRepairs.map(req => req.id === selectedRepair.id ? response.data : req));
        setShowCommentModal(false);
        showSuccessMessage('Repair record updated successfully!');
      })
      .catch(error => {
        console.error('Error updating repair record: ', error);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedRepairs = repairs.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

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
            <Typography variant="h6" color="white">Asset Repair List</Typography>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Repair id</Typography></th>
                <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Department</Typography></th>
                <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Employee</Typography></th>
                <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Asset Name</Typography></th>
                <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Quantity</Typography></th>
                <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Check In Date</Typography></th>
                {/* <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Check Out Date</Typography></th> */}
                <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Repairs Comments</Typography></th>
                <th><Typography variant="small" className="text-sm font-bold uppercase text-blue-gray-400 text-left">Actions</Typography></th>
              </tr>
            </thead>
            <tbody>
              {paginatedRepairs.map((repair) => (
                <tr key={repair.id} className="border-t">
                  <td><Typography color="blue-gray" className="pl-2 font-semibold text-xs text-blue-gray-500 uppercase">{repair.id}</Typography></td>
                  <td><Typography className="text-left text-xs font-semibold text-blue-gray-600">{repair.department_name.toUpperCase()}</Typography></td>
                  <td><Typography className="text-xs font-normal text-blue-gray-500">{employeeNames[repair.employee_id]}</Typography></td>
                  <td><Typography className="text-xs font-normal text-blue-gray-500">{repair.asset_name}</Typography></td>
                  <td><Typography className="text-xs font-semibold text-blue-gray-600">{repair.quantity}</Typography></td>
                  <td><Typography className="text-left text-xs font-semibold text-blue-gray-600">{repair.checkin_date}</Typography></td>
                  {/* <td><Typography className="text-center text-xs font-semibold text-blue-gray-600">{repair.checkout_date}</Typography></td> */}
                  <td><Typography className="text-left text-xs font-semibold text-blue-gray-600">{repair.repair_comments}</Typography></td>
                  <td><button onClick={() => handleUpdateClick(repair)} 
                    className="py-1 px-3 rounded-md mb-2 border-gray-300 border-black expand-button hover:scale-105 hover:bg-[#2F3D44] hover:text-white" title="Repair Comments"><TireRepairIcon /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
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
      <RepairCommentModal
        isOpen={showCommentModal}
        onClose={closeModal}
        repair={selectedRepair}
        editedRepairComment={editedRepairComment}
        onUpdateClick={handleSaveEdit}
        setEditedRepairComment={setEditedRepairComment}
      />
      {successMessage && <SuccessMessage message={successMessage} />}
    </div>
  );
};

export default AssetRepair;
