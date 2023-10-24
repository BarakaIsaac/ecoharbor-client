import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();
//https://png.pngtree.com/thumb_back/fh260/background/20220624/pngtree-unauthorised-access-design-future-science-photo-image_32021044.jpg
//https://www.elegantthemes.com/blog/wp-content/uploads/2019/12/401-error-wordpress-featured-image.jpg  

return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{
                background: `url('https://png.pngtree.com/thumb_back/fh260/background/20220624/pngtree-unauthorised-access-design-future-science-photo-image_32021044.jpg') center/cover no-repeat`,
            }}
        >
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl mb-4">You are not authorized to access this page</h1>
                <button
                    onClick={() => navigate('/dashboard/home')}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                    BACK
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;