import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assetrequestsstyle.css';


export default function AssetRequestForm() {
  const [assetRequest, setAssetRequest] = useState({
    assetName: '',
    employeeName: '', // set the name to auto-retrieve the details of logged in user
    categoryName: '',
    dateOfRequest: new Date().toISOString().substr(0, 10), // Current date in YYYY-MM-DD format
    reason: '',
    urgency: 'low', // Default value
    quantity: 1, // Default value
  });

  const [assetNames, setAssetNames] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const fetchAssetNamesFromAPI = async () => {
      try {
        const response = await axios.get('http://provide the- ecoharbor-server-development-api-url/asset-names');
        setAssetNames(response.data);
      } catch (error) {
        console.error('Error fetching asset names:', error);
      }
    };

    fetchAssetNamesFromAPI();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (assetNames.includes(value)) {
      setAssetRequest((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      alert('Valid asset name.');
    } else {
      alert('Invalid asset name. Please enter a valid asset name.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      ...assetRequest,
    };

    try {
      const response = await axios.post('http://my-api-url/submit-asset-request', formData);
      setSubmitSuccess(true);
      setSubmitError('');
      console.log('Asset request submitted successfully:', response.data);
    } catch (error) {
      setSubmitSuccess(false);
      setSubmitError('Error submitting asset request. Please try again later.');
      console.error('Error submitting asset request:', error);
    }
  };

  return (
    <div className="request-form-container">
      <h2>Asset Request Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="assetName">Asset Name:</label>
          <input
            type="text"
            id="assetName"
            name="assetName"
            value={assetRequest.assetName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="employeeName">Employee Name:</label>
          <input
            type="text"
            id="employeeName"
            name="employeeName"
            value={assetRequest.employeeName}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="categoryName">Category Name:</label>
          <select
            id="categoryName"
            name="categoryName"
            value={assetRequest.categoryName}
            onChange={handleInputChange}
          >
            <option value="">Select a Category</option>
            {assetNames.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="dateOfRequest">Date of Request:</label>
          <input
            type="text"
            id="dateOfRequest"
            name="dateOfRequest"
            value={assetRequest.dateOfRequest}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="reason">Reason for Request:</label>
          <textarea
            id="reason"
            name="reason"
            value={assetRequest.reason}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="urgency">Urgency:</label>
          <select
            id="urgency"
            name="urgency"
            value={assetRequest.urgency}
            onChange={handleInputChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={assetRequest.quantity}
            onChange={handleInputChange}
            required
            min="1" // Quantity should be at least 1
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}   