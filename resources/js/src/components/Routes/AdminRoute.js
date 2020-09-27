import React, { useEffect, useState } from 'react';
import { Route } from 'react-router';

const AdminRoute = ({ component: Component, ...props }) => {

    const [isExpired, setIsExpired] = useState(false);

    // TODO : Logic for checking token with helper method
    useEffect(() => { }, []);

    return (
        <Route
            {...props}
            render={(props) => (
                (!isExpired)
                    ? (<Component {...props} />)
                    : (
                        <Redirect
                            to={{
                                pathname: "/admin/signin",
                                state: { from: props.location }
                            }}
                        />
                    )
            )}
        />
    );
};

export default AdminRoute;