import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  form: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    width: '100%',
    marginBottom: '2rem'
  },
  margin: {
    marginTop: theme.spacing(2),
  },
  select: {
    minWidth: "10rem",
  },
  button: {
    marginTop: theme.spacing(3),
  },
}));
