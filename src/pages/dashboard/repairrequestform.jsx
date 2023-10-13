import React from 'react'

export default function repairrequestform() {
    // State for form data management
    const [formData, setFormData] = useState({
        assetDetails: '',
        issue: '',
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

        ......................
    };
  return (
    <div>
      
    </div>
  )
}
