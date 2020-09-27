import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import NotFoundSVG from "../../assets/images/404.svg";
import clsx from 'clsx';
import Button from './Button/Button';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../service/auth';


const useStyle = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(5),
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    img: {
        width: "50%",
        marginBottom: theme.spacing(3),
    },
    message: {
        marginBottom: theme.spacing(2),
    }
}))

const NotFound = (ascent, className, ...props) => {

    const classes = useStyle({ ascent })

    return (
        <Box className={clsx(classes.root, className)}>
            <img className={classes.img} src={NotFoundSVG} alt="The url you want to visit does not exist" />
            <Typography variant="h5" className={classes.message}>The url you want to visit does not exist!</Typography>
            {
                !(isAuthenticated())
                    ? (
                        <Button component={Link} to="/login" >Go To Login</Button>
                    ) : (
                        <Button component={Link} to="/dashboard" >Go To Dashboard</Button>
                    )

            }
        </Box >
    );
};

export default NotFound;