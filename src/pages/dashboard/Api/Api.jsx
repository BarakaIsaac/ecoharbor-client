import React, { useEffect } from 'react';
import axios from 'axios';

function Api() {
  useEffect(() => {
    // Define the API URLs
    const apiUrls = {
      assets: 'http://127.0.0.1:3001/assets_directorys',
      departments: 'http://127.0.0.1:3000/departments',
      employees: 'http://127.0.0.1:3000/employees',
      requests: 'http://127.0.0.1:3000/requests',
      approvals: 'http://127.0.0.1:3000/approvals',
      allocations: 'http://127.0.0.1:3000/allocations',
      repairs: 'http://127.0.0.1:3000/repairs',
    };

    // Fetch data from each API
    const fetchData = async () => {
      try {
        const assetData = await axios.get(apiUrls.assets);
        const departmentData = await axios.get(apiUrls.departments);
        const employeeData = await axios.get(apiUrls.employees);
        const requestData = await axios.get(apiUrls.requests);
        const approvalData = await axios.get(apiUrls.approvals);
        const allocationData = await axios.get(apiUrls.allocations);
        const repairData = await axios.get(apiUrls.repairs);

        // Now you can use the data from these API requests
        console.log('Asset data:', assetData.data);
        console.log('Department data:', departmentData.data);
        console.log('Employee data:', employeeData.data);
        console.log('Request data:', requestData.data);
        console.log('Approval data:', approvalData.data);
        console.log('Allocation data:', allocationData.data);
        console.log('Repair data:', repairData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the function to fetch data when the component mounts
  }, []);

  return (
    <div>
      {/* Your component content */}
    </div>
  );
}

export default Api;

