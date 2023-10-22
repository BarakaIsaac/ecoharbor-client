import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Card, CardHeader } from "@material-tailwind/react";
import axios from 'axios';
import { Today } from '@mui/icons-material';
import {backendUrl} from "../../../../backendConfig.js";

function AssetRepairModal({ isOpen, onClose, }) {
  const [quantity, setQuantity] = useState(1); // Set quantity to non-zero
  const [requestDate, setRequestDate] = useState(new Date().toISOString().split('T')[0]); // Set initial date
  const [reason, setReason] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [assetId, setAssetId] = useState('');
  const [employeeFirstName, setEmployeeFirstName] = useState('');
  const [assetName, setAssetName] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [assets, setAssets] = useState([]);

  // GET REQUEST FOR employees, departments, and assets
  useEffect(() => {
    axios.get(`${backendUrl}/employees`)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employees', error);
      });

    axios.get(`${backendUrl}/departments`)
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching departments', error);
      });

    axios.get(`${backendUrl}/assetz`)
      .then((response) => {
        setAssets(response.data);
      })
      .catch((error) => {
        console.error('Error fetching assets', error);
      });
  }, []);

  // Update employee name when employeeId changes
  useEffect(() => {
    const selectedEmployee = employees.find((employee) => employee.employee_id === employeeId);
    if (selectedEmployee) {
      setEmployeeFirstName(selectedEmployee.first_name);
    } else {
      setEmployeeFirstName(''); // Set to an empty string if not found
    }
  }, [employeeId, employees]);

  // Update asset name when assetId changes
  useEffect(() => {
    const selectedAssetInfo = assets.find((asset) => asset.asset_id === assetId);
    if (selectedAssetInfo) {
      setAssetName(selectedAssetInfo.asset_name);
    } else {
      setAssetName(''); // Set to an empty string if not found
    }
  }, [assetId, assets]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestData = {
      asset_id: assetId,
      urgency,
      quantity,
      reason,
      employee_id: employeeId,
      request_date: requestDate,
    };

    // CREATE ASSET REpair API
    axios.post(`${backendUrl}repairs`, requestData)
      .then((response) => {
        console.log('Repair submitted successfully', response.data);
        onClose();
      })
      .catch((error) => {
        console.error('Error submitting the repair', error);
      });
  };

  const customModalStyles = {
    overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 },
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      height: '70%',
      maxHeight: '800px',
      width: '80%',
      maxWidth: '700px',
      padding: '20px',
      border: 'none',
      borderRadius: '0.25rem',
      backgroundColor: 'white',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Asset Repair Form Modal" style={customModalStyles}>
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-2 p-2 text-center">
          <div className="flex items-center">
            <h2 className="text-center text-2xl font-semibold mb-4" style={{ textAlign: 'center' }}>Asset Repair Form</h2>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-xs text-[#2F3D44]">Employee ID:</label>
            <input
              type="text"
              className="bg-gray-100 text-xs text-[#2F3D44] w-full py-2 px-3 rounded-md"
              value={employeeId}
              required
              onChange={(e) => setEmployeeId(e.target.value)} />
            <p>First Name: {employeeFirstName}</p>
          </div>

          <div className="mb-4">
            <label className="text-xs text-[#2F3D44]">Asset ID:</label>
            <input
              type="text"
              className="bg-gray-100 text-xs text-[#2F3D44] w-full py-2 px-3 rounded-md"
              value={assetId}
              required
              onChange={(e) => setAssetId(e.target.value)}
            />
            <p>Asset Name: {assetName}</p>
          </div>
           <div className="mb-4">
            <label className="text-xs text-[#2F3D44]">Quantity:</label>
            <input
              type="number"
              className="bg-gray-100 text-xs text-[#2F3D44] w-full py-2 px-3 rounded-md"
              value={quantity}
              min="1"
              required
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="text-xs text-[#2F3D44]">Check In Date:</label>
            <input
              type="date"
              className="bg-gray-100 text-xs text-[#2F3D44] w-full py-2 px-3 rounded-md"
              value={requestDate}
              readOnly
              onChange={(e) => setRequestDate(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover-bg-blue-600 focus:outline-none"    >
              Submit Repair Request
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover-bg-gray-400 focus:outline-none"    >
              Cancel
            </button>
          </div>
        </form>
      </Card>
    </Modal>
  );
}

export default AssetRepairModal;


