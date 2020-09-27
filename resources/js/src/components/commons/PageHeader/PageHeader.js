import React from 'react';
import { makeStyles, Typography, Box, Grid } from '@material-ui/core';
import clsx from 'clsx';

const useStyles= makeStyles((theme) => ({

    nameLabel:{
        color:theme.palette.text.systemWhite,
        ...theme.typography.h5,
        fontWeight:600
    },
    container:{
        margin:"1rem 0 0 1.2rem"
    }


}))

const PageHeader = (props) => {
    const classes=useStyles()
    return (
        <Box className={clsx(classes.container)} style={{ height: 40, padding: '7px 0 0 10px' }}>
            <Box style={{ float: 'left', width: '30%' }}>

                {leftPane(props,classes)}
                </Box>
                <Grid container style={{ float: 'right', width: 'auto', textAlign: 'right' }}>
                {rightPane(props)}
            </Grid>
        </Box>
    );
};

const leftPane=({nameLabel},classes)=>(
    <Box>
        <Typography className={classes.nameLabel}>
            {nameLabel}
        </Typography>
    </Box>

)
const rightPane=(props)=>(
    <Grid item xs={12}>
        {props.children}
    </Grid>
)
export default PageHeader;