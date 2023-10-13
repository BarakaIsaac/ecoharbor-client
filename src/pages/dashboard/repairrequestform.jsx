import React from 'react'
import axios from 'axios';

export default function repairrequestform() {
    // State for form data management
    const [formData, setFormData] = useState({
        assetDetails: '',
        description: '',
        department: '',
        date: '',
        urgency: 'low', // Default urgency
        
    });

    //Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle Form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      const requestData = {
        assetDetails: formData.assetDetails,
        description: formData.description,
        department: formData.department,
        date: formData.date,
        urgency: formData.urgency,
      };

      // Make a POST request using Axios
      axios
        .post('YOUR_API_ENDPOINT_HERE', requestData)
        .then((response) => {
          console.log('Request submitted successfully:', response.data);
          // You can handle any success behavior here.
        })
        .catch((error) => {
          console.error('Error submitting request:', error);
          // You can handle any error behavior here.
        });
    }

    
    };
  
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
                Submit Request
              </button>
            </div>
          </form>
        </div>
      );
    }