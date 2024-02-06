import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userRedirection } from "../../redux/features/auth/authSlice";
import { redirect } from "next/navigation";
import UserAuth from "./userAuth";

export default function Protected({ children }) {
    const isAuthenticated = UserAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        // Dispatch action to handle redirection
        dispatch(userRedirection({ redirection: !isAuthenticated }));
        
        // Redirect if user is not authenticated
        if (!isAuthenticated) {
            redirect('/');
        }
    }, [dispatch, isAuthenticated]);

    // Render children only if user is authenticated
    return isAuthenticated ? children : null;
}
