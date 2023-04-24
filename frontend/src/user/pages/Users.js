import React, {useState, useEffect} from "react";

import UsersList from "../components/UsersList";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedusers, setLoadedUsers] = useState();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users`);
                setLoadedUsers(responseData.users);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUsers();
    }, [sendRequest]);


    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedusers && <UsersList items={loadedusers} />}
        </React.Fragment>
    );
};

export default Users;