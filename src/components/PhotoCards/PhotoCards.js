import React from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    maxHeight: 450,
  },
}));

const PhotoCards = ({photos}) => {
  const classes = useStyles();
  const matches = useMediaQuery('(max-width:600px)');

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList} cols={matches ? 1 : 2}>
        {photos.map(photo => (
          <GridListTile key={photo?.img_src}>
            <img src={photo?.img_src} alt={photo?.full_name}/>
            <GridListTileBar title={photo?.earth_date}/>
          </GridListTile>))}
      </GridList>
    </div>
  );
};
export default PhotoCards;
