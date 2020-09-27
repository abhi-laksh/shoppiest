import React, { Fragment } from "react";
import PropTypes from "prop-types";
import ListItem from "../List/ListItem";
import {
  makeStyles,
  List as MList,
  ListSubheader as MListSubheader,
  List,
  ListSubheader,
  Box,
  Paper,
} from "@material-ui/core";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import clsx from "clsx";
import { roleMenuHeadCells } from "../../../constants/headCells";
import DragDropTable from "../../commons/Table/DragDropTable";
import Collapsible from "../Collapsible";
import { styledBy } from "../../../helpers/styles";

var grid = 2;
const useStyles = makeStyles((theme) => ({
  listItem: {
    height: "50px",
  },
  rowList: {
    background: theme.palette.ascents.secondary,
  },
  collapsible: {
    background: styledBy("ascent", theme.palette.ascents),
    "&:hover": {
      background: styledBy("ascent", theme.palette.contrast),
    },
  listBackGround:{
    background:theme.palette.ascents.systemWhite
  }
  },
}));
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "#d7f2ff" : "#fff",
  padding: 2,
});

const getDataFromApi = (property, type, object) => {
  console.log("====================================");
  console.log("type", object);
  console.log("====================================");

  if (property === "name") {
    if (type === "role") {
      return object.roleName;
    } else if (type === "menu") {
      return object.menuName;
    }
  }
  if (property === "id") {
    if (type === "role") {
      return object.roleID;
    } else if (type === "menu") {
      return object.menuId;
    }
  }
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "#69C540" : "#fff",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const DragDropList = ({ dataList = [], type }) => {
  const ascent = "systemWhite";
  const classes = useStyles({
    ascent,
  });
  const onDragEnd = (result) => {
    console.log(result);
  };

  return (
    <Box className={classes.listBackGround}>
      <Paper>
      <Collapsible
        className={classes.collapsible}
        label={type.toUpperCase()}
        borderwidth={0}
      >
        <List>
          <Droppable droppableId={type}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {dataList.map((item, index) => (
                  <Draggable
                    key={item.roleCode || item.menuCode}
                    draggableId={type + "-" + (index + 1)}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <ListItem>{item.roleName || item.name}</ListItem>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </List>
      </Collapsible>

      </Paper>
     
    </Box>
  );
};

DragDropList.propTypes = {
  roleList: PropTypes.array,
  type: PropTypes.string,
};

export default DragDropList;
