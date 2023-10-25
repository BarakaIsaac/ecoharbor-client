import Modal from 'react-modal';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader } from "@material-tailwind/react";

import { backendUrl } from "../../../../backendConfig.js";

const Api_Url = `${backendUrl}/assetz`;
const Api_Url_dep = `${backendUrl}/departments`;
const Api_Url_emp = `${backendUrl}/employees`;
// const Api_Url_req = `${backendUrl}/requests`;
const Api_Url_rep = `${backendUrl}/repairs`;

Modal.setAppElement('#root');

function AssetRepairRequestModal({ isOpen, onClose }) {
  // Separate state for employee_id and employee_name
  const [employeeId, setEmployeeId] = useState(localStorage.getItem("employee_id"));
  const [employeeName, setEmployeeName] = useState('');

  const [newAssetRepair, setNewAssetRepair] = useState({
    quantity: '',
    checkin_date: '',
    asset_id: '',
    request_id: '',
    employee_id: employeeId, // Use employeeId here
    department_id: '',
  });

  const [departmentNames, setDepartmentNames] = useState({});
  const [employeeNames, setEmployeeNames] = useState({});
  const [assetNames, setAssetNames] = useState({});

  useEffect(() => {
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
    axios.get(Api_Url_emp)
      .then(response => {
        const employeeNameMap = {};
        response.data.forEach(employee => {
          const fullName = `${employee.first_name} ${employee.last_name}`;
          // employeeNameMap[employee.id] = employee.first_name;
          employeeNameMap[employee.id] = fullName;
        });
        setEmployeeNames(employeeNameMap);
        // Set the employeeName based on employeeId
        if (employeeId && employeeNameMap[employeeId]) {
          setEmployeeName(employeeNameMap[employeeId]);
        }
      })
      .catch(error => {
        console.error('Error fetching employee data: ', error);
      });

    // Fetch asset data to get asset names
    axios.get(Api_Url)
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
  }, [employeeId]); // Include employeeId in the dependency array

  // Handle form submission
  const handleNewAssetRepair = () => {
    // Update the newAssetRequest object with the selected employee's ID
    setNewAssetRepair({ ...newAssetRepair, employee_id: employeeId });

    // Now you can submit the form with the updated newAssetRequest object
    axios.post(Api_Url_rep, newAssetRepair)
      .then(response => {
        console.log('Repair submitted successfully:', response.data);
        onClose();
      })
      .catch(error => {
        console.error('Error submitting repair:', error);
      });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Create Asset Request Modal"
      className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-75 bg-black" >

      <div className="bg-white w-1/3 p-6 rounded-lg">
        <Card>
          <CardHeader variant="gradient" color="blue" className="mb-2 p-2 text-center">
            <div className="flex items-center"><h2 className="text-center text-2xl font-semibold mb-4" style={{ textAlign: 'center' }}>Asset Repair Request Form</h2></div>
          </CardHeader>
          <div>
            <label className="block text-sm font-medium text-gray-700">Check In Date</label>
            <input
              type="date"
                value={newAssetRepair.checkin_date}
              onChange={e => setNewAssetRepair({ ...newAssetRepair, checkin_date: e.target.value })}
              className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Employee Name</label>
            <input
              type="text"
              value={employeeName}
              disabled
            onChange={(e) => {
                  const selectedEmployeeName = e.target.value;
                  const selectedEmployeeId = localStorage.getItem('employee_id'); 
                  setEmployeeName(selectedEmployeeName);
                  setEmployeeId(selectedEmployeeId);
                }}
              className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"   />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
                <select
                    value={newAssetRepair.department_id}
                    onChange={e => setNewAssetRepair({ ...newAssetRepair, department_id: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" >
                    <option value="" disabled className="text-grey-100" style={{ opacity: 0.6 }}>Select a Department</option>
                    <option value="" key="blank"></option>
                    {Object.keys(departmentNames).map(departmentId => (
                        <option key={departmentId} value={departmentId}>
                            {departmentNames[departmentId]}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Request Type</label>
                    <select value={newAssetRepair.request_type}
                        onChange={e => setNewAssetRepair({ ...newAssetRepair, request_type: e.target.value })}
                        className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" >
                        <option value="" disabled className="text-grey-100" style={{ opacity: 0.6 }}>Select </option>
                        <option value="Asset Repair">Asset Repair</option>
                    </select> 
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Existing Asset Name</label>
                <select
                    value={newAssetRepair.asset_id}
                    onChange={(e) =>
                    setNewAssetRepair({
                          ...newAssetRepair,
                          asset_id: e.target.value
                        })
                      }
                      className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"     >
                      <option value="" disabled className="text-grey-100" style={{ opacity: 0.6 }}>Select an Asset</option>
                      <option value="" key="blank"></option>
                      {Object.keys(assetNames).map((assetId) => (
                        <option key={assetId} value={assetId}>
                          {assetNames[assetId]}
                        </option>
                      ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input type="number" value={newAssetRepair.quantity}
                    onChange={e => setNewAssetRepair({ ...newAssetRepair, quantity: e.target.value })}
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300" />
                </div>


                                    {/* <div>
                    <label className="block text-sm font-medium text-gray-700">Employee Name</label>
                  <select
                    value={newAssetRequest.employee_id}
                    onChange={(e) =>
                      setNewAssetRequest({
                        ...newAssetRequest,
                        employee_id: e.target.value
                      })
                    }
                    className="block w-full mt-1 p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
                  >
                    <option value="" disabled className="text-grey-100" style={{ opacity: 0.6 }}>
                      Select an Employee
                    </option>
                    <option value="" key="blank"></option>
                    {Object.keys(employeeNames).map((employeeId) => (
                      <option key={employeeId} value={employeeId}>
                        {employeeNames[employeeId]}
                      </option>
                    ))}
                  </select>
                </div> */}
                <div className="flex justify-between">
                <button onClick={handleNewAssetRepair} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none">Request</button>
                <button onClick={onClose} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none">Cancel</button>
                </div>
                            </Card>
            </div>
            
            


        </Modal>
  )
}

export default AssetRepairRequestModal

