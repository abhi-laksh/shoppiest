import React, { useEffect, useState } from 'react';
import { Route } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import ModalLoader from '../commons/Loader/ModalLoader';
import { appStatusFailed, appStatusLoading, appStatusReset } from '../../redux/actions/statusAction';
import SnackAlert from '../commons/Snack/SnackAlert';

const BaseRoute = ({ component: Component, ...props }) => {

    const currentStatus = useSelector(state => state.appStatus);
    const dispatch = useDispatch();
    let AnyOneLoader;

    const closeSnack = () => {
        dispatch(appStatusReset());
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
                <>
                    {AnyOneLoader}
                    <Component {...props} />
                </>
            )}
        />
    );
};
export default BaseRoute;