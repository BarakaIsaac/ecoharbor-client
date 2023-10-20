import { useNavigate } from "react-router-dom";
import {backendUrl} from "../../../backendConfig.js";
import axios from "axios";

export function SignOutButton() {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await axios.post(`${backendUrl}/signout`);

            // 2. Clear any client-side tokens or cookies.
            // This might depend on how you store and manage user authentication on the client.

            // Example using localStorage:
            // localStorage.removeItem('userToken');

            // 3. Redirect the user to the sign-in page.
            navigate('/auth/sign-in');
        } catch (error) {
            // Handle any errors that occur during sign-out, e.g., network errors.
            console.error('Error during sign-out:', error);
        }
    };
}

