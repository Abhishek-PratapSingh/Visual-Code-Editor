import React from "react";
import { connect } from "react-redux";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import { DragDropContext } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useCustomStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const MainApplication = ({ components, updateComponents }) => {
  const classes = useCustomStyles();

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const sourceIndex = components.midAreaLists.findIndex(
      (list) => list.id === result.source.droppableId
    );

    if (sourceIndex > -1) {
      const sourceList = [...components.midAreaLists];
      const [movedElement] = sourceList[sourceIndex].comps.splice(
        result.source.index,
        1
      );

      const destinationIndex = components.midAreaLists.findIndex(
        (list) => list.id === result.destination.droppableId
      );

      if (destinationIndex > -1) {
        sourceList[destinationIndex].comps.splice(
          result.destination.index,
          0,
          movedElement
        );

        updateComponents(sourceList); // Assuming updateComponents updates the state
      }
    }
  };

  return (
    <div className="bg-blue-100 font-sans">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Visual Code Editor
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <div className="h-screen overflow-hidden flex flex-row pt-6">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
            <Sidebar />
            <MidArea />
          </div>

          <div className="w-1/3 relative h-screen overflow-scroll flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
            <PreviewArea />
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  components: state.list,
});

export default connect(mapStateToProps)(MainApplication);
