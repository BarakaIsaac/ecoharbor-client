import axios from 'axios';
import React, { useState } from 'react';

import './CreateAsset.css';

function CreateAsset() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [assetDetails, setAssetDetails] = useState({
        assetName: '',
        assetImage: null,
        categoryName: '',
        departmentName: '',
        condition: '',
        status: '',
        purchaseValue: '',
        quantity: '',
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedFormats = ['image/jpg', 'image/jpeg', 'image/png'];
        const maxSizeInBytes = 1 * 1024 * 1024;
        if (!allowedFormats.includes(file.type)) {
          alert('Invalid file format. Please choose either a jpg, jpeg or png image');
          e.target.value = null;
          setSelectedFile(null);
          return;
        }

        // handle file size and the clearing and resseting statefully

        if (file.size > maxSizeInBytes) {
          alert('Asset Image size exceeds 1 MB. Upload a smaller sized image.');
          // handle (in state) the clearing and resseting of the selected file 
          e.target.value = null;
          setSelectedFile(null);
          return;
        }
        setSelectedFile(file);
        setAssetDetails((prevAssetDetails) => ({
          ...prevAssetDetails,
          assetImage: file,
        }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssetDetails({
        ...assetDetails,
        [name]: value,
});
    };  

  const handleSubmit = (e) => {
    e.preventDefault();
if (selectedFile && isFormValid()) {
        const formData = new FormData();
        formData.append('assetImage', selectedFile);
        for (const key in assetDetails) {
            formData.append(key, assetDetails[key]);
        }

        // POST the formData to eco-harbor server

        axios
          .post('api/assets', formData)
          .then((response) => {
            console.log('Asset created successfully.', response.data);

            // handle form reset and selected file after succesful asset creation
            setAssetDetails({
              assetName: '',
              assetImage: null,
              categoryName: '',
              departmentName: '',
              condition: '',
              status: '',
              purchaseValue: '',
              quantity: '',
            });
            setSelectedFile(null);
          })
          .catch((error) => {
            console.error('Error creating asset:', error);
          });
    } else {
      console.error('No file uploaded');
    }
  };

  const isFormValid = () => {
    for (const key in assetDetails) {
      if (assetDetails[key] === null) {
        return false;
      }
    }
    return true;
  };

  return (
    <div className="create-asset-container">
           <h2>Create Asset</h2>
      <form onSubmit={handleSubmit}>
         <div>
        <label htmlFor="assetName">Asset Name:</label>
          <input
            type="text"
            id="assetName"
            name="assetName"
            value={assetDetails.assetName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="assetImage">Asset Image:</label>
          <input 
            type="file"
            id="assetImage"
            name="assetImage"
            accept="image/"
            onChange={handleFileChange}
            className="file-input"
          />
        </div>
        <div>
          <label htmlFor="categoryName">Category Name:</label>
          <select
            id="categoryName"
            name="categoryName"
            value={assetDetails.categoryName}
            onChange={handleInputChange}
          > 
            <option value="">Select a Category</option>
            <option value="Machinery">Machinery</option>
            <option value="Electronics">Electronics</option>
            <option value="Construction Equipment">Construction Equipment</option>
            <option value="Tools and Equipment">Tools and Equipment</option>
            <option value="Furniture and Fixtures">Furniture and Fixtures</option>
            <option value="Kitchen Appliances">Kitchen Appliances</option>
            <option value="Laboratory Equipment">Laboratory Equipment</option>
          </select>  
          
        </div>
        <div>
          <label htmlFor="categoryCode">Category Code:</label>
          <input
            type="text"
            id="categoryCode"
            name="categoryCode"
            value={assetDetails.categoryCode}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="departmentName">Department Name:</label>
          <select
            id="departmentName"
            name="departmentName"
            value={assetDetails.departmentName}
            onChange={handleInputChange}
          > 
            <option value="">Select a Department</option>
            <option value="nformation Technology">Information Technology</option>
            <option value="Finance">Finance</option>
            <option value="Construction Equipment">Construction Equipment</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Facilities Management">Facilities Management</option>
            <option value="Marketing">Marketing</option>
            <option value="Procurement">Procurement</option>
            <option value="Customer Service">Customer Service</option>
          </select>  
         </div> 
        <div>
          <label htmlFor="condition">Condition:</label>
          <input
            type="text"
            id="condition"
            name="condition"
            value={assetDetails.condition}
            onChange={handleInputChange}
          />
        </div>
                <div>
          <label htmlFor="status">Status:</label>
          <input
            type="text"
            id="status"
            name="status"
            value={assetDetails.status}
            onChange={handleInputChange}
          />
</div>
        <div>
          <label htmlFor="purchaseValue">Purchase Value: (in $ or KES)</label>
          <input
            type="text"
            id="purchaseValue"
            name="purchaseValue"
            value={assetDetails.purchaseValue}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            value={assetDetails.quantity}
            onChange={handleInputChange}
                      />
        </div>
        <div>
          <button type="submit" disabled={!isFormValid()}>
            Create Asset
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateAsset;