import React, { useState } from 'react';
import axios from 'axios';

// Component for Repair Request Form
export default function RepairRequestForm() {
    // State for form data management
    const [formData, setFormData] = useState({
        assetDetails: '',
        description: '',
        department: '',
        date: '',
        urgency: 'low',
    });

    const [error, setError] = useState('');

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Form input Validation
    const isFormValid = () => {
      if (
        !formData.assetDetails ||
        !formData.description ||
        !formData.department ||
        !formData.date
      ) {
        setError('Please fill in all required fields.');
        return false;
      }
  
      setError('');
      return true;
    };
  
 // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid()) {
            const requestData = {
                assetDetails: formData.assetDetails,
                description: formData.description,
                department: formData.department,
                date: formData.date,
                urgency: formData.urgency,
            };
            try {
                // Make a POST request using Axios to API endpoint
                const response = await axios.post('my api end point', requestData);
                console.log('Request submitted successfully:', response.data);
            } catch (error) {
                console.error('Error submitting request:', error);
                setError('Failed to submit request. Please try again later')
            }
        }
    };

  // Render the form
    return (
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Repair Request Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="assetDetails" className="block text-gray-700 text-sm font-bold mb-2">
                Asset Details:
              </label>
              <input
                type="text"
                id="assetDetails"
                name="assetDetails"
                value={formData.assetDetails}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="department" className="block text-gray-700 text-sm font-bold mb-2">
                Department:
              </label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
                Date:
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="urgency" className="block text-gray-700 text-sm font-bold mb-2">
                Urgency:
              </label>
              <select
                id="urgency"
                name="urgency"
                value={formData.urgency}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
                Submit
              </button>
            </div>
          </form>
        </div>
      );
}