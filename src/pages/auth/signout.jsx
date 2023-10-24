import { useNavigate } from "react-router-dom";
import {backendUrl} from "../../../backendConfig.js";
import axios from "axios";
import { clearTokens } from "../../tokens/tokens.jsx";

export function SignOutButton() {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await axios.post(`${backendUrl}/signout`);
        clearTokens();
            navigate('/auth/sign-in');
        } catch (error) {
            // Handle any errors that occur during sign-out, e.g., network errors.
            console.error('Error during sign-out:', error);
        }
    };
}

