import React from 'react';
import PropTypes from 'prop-types';
import { List, Typography, makeStyles } from '@material-ui/core';

// import dummydataList from "../../../assets/json/dummyMenu.json"

import Collapsible from '../Collapsible';
import NavMenuItem from './NavMenuItem';
import NavSearch from './NavSearch';
import ListItem from '../List/ListItem';
import { getDataFromApi } from '../../../helpers/pages';


const useStyles = makeStyles((theme) => ({
    navHeader: {
        ...theme.typography.body2
    }


}));


const createMenu = (dataList, props) => (
    
    <>
    {dataList.map((each, i) => {

    return (
        <ListItem key={i} onClick={()=>props.selectHandler(each)} {...props} >
            {getDataFromApi("name",props.type,each)}
        </ListItem>

        
    )})}
    </>
);

const DataList = ({ dataList = [],label,props }) => {

    const classes = useStyles()
    
    const [searchText, searchInput] = NavSearch({});

    const searchMenu = (searchText) => (each) => {
        const name=getDataFromApi("name",props.type,each)
        return (name && name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
    }

    const filteredMenu = (searchText && (dataList.filter(searchMenu(searchText))));

    return (
        <>
        <Collapsible key={`collapse-${0}`} label={props.type.toUpperCase()} className={classes.navHeader} {...props}>
            {searchInput}
            <List component="li" disablePadding {...props}>
                {
                    (searchText && searchText.length)
                        ? (
                            (filteredMenu && filteredMenu.length)
                                ? (createMenu(filteredMenu, props))
                                : (<Typography>No such menu found</Typography>)
                        )
                        : (
                            (createMenu(dataList, props))
                        )
                }
            </List>
        </Collapsible>

        </>
    );
};

DataList.propTypes = {
    dataList: PropTypes.array,
};

export default DataList;