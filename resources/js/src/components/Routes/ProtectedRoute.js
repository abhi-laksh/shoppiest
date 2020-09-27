import React, { useEffect, useState } from 'react';
import { Route, Redirect, useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import BaseRoute from './BaseRoute';
import { isAuthenticated } from "../../service/auth";
import ModalLoader from '../commons/Loader/ModalLoader';
import { appStatusFailed, appStatusLoading, appStatusReset } from '../../redux/actions/statusAction';
import SnackAlert from '../commons/Snack/SnackAlert';
import { getNavMenuList } from '../../redux/actions/menuAction';


const ProtectedRoute = ({ component: Component, shouldRender = true, crudMenuList, ...props }) => {


    const currentStatus = useSelector(state => state.appStatus);
    const dispatch = useDispatch();
    let AnyOneLoader;
    const [isExpired, setIsExpired] = useState(false);


    const closeSnack = () => {
        dispatch(appStatusReset());
    }


    // TODO : Logic for checking token with helper method
    useEffect(() => {
        if (isAuthenticated()) {
            setIsExpired(false);
        } else {
            setIsExpired(true);
        }
    }, [isExpired]);

    const location = useLocation()

    const locationHandler = (location, crud) => {
        //TODO location hide
    }



    const pathName = props.path

    let crud = {
        canCreate: 1,
        canRead: 1,
        canUpdate: 1,
        canDelete: 1
    }
    if (crudMenuList && crudMenuList[pathName]) {
        crud = crudMenuList[pathName]

    }


    if (currentStatus) {
        if (currentStatus.loading) {
            AnyOneLoader = (<ModalLoader
                title={currentStatus.message}
                align="center"
                open={currentStatus.loading}
            />)
        }
        else if (currentStatus.fetching) {
            AnyOneLoader = (<ModalLoader
                title={currentStatus.message}
                align="center"
                open={currentStatus.fetching}
            />)
        }
        else if (currentStatus.success) {
            AnyOneLoader = (
                <SnackAlert severity="success" onClose={closeSnack} open={currentStatus.success}>
                    {currentStatus.message}
                </SnackAlert>
            )
        }
        else if (currentStatus.failure) {
            AnyOneLoader = (
                <SnackAlert severity={"error"} onClose={closeSnack} open={currentStatus.failure}>
                    {currentStatus.message}
                </SnackAlert>
            )
        } else {
            AnyOneLoader = null;
        }
    }

    return (
        <Route
            {...props}
            render={(props) => (
                (
                    !(isExpired)
                )
                    ? (
                        <>
                            {AnyOneLoader}
                            {shouldRender ? <Component {...props} crud={crud} /> :
                                <Redirect
                                    to={{
                                        pathname: "/",
                                    }}
                                />}
                        </>
                    )
                    : (

                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location }
                            }}
                        />
                    )
            )}
        />
    );
};

export default ProtectedRoute;