import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {useStyles} from "./styles";
import {options, roverOptions} from "./values";

export default function Form(props) {
  const { fetchPhotos } = props;
  const classes = useStyles();
  const [cameraOptions, setCameraOptions] = useState(options);
  const [values, setValues] = useState({
    sol: 0,
    rover: roverOptions[0].value,
    camera: options[0].value,
  });
  const [errors, setErrors] = useState({
    sol: null,
    rover: null,
    camera: null,
  });

  const validate = () => {
    const error = {};
    const { sol } = values;
    if (!sol || sol < 0 || sol > 3000) {
      error.sol = "Incorrect entry.";
    }
    setErrors(error);
    return error;
  };

  const handleChange = (prop) => ({ target: { value } }) => {
    if (prop === "rover") {
      let newOptions;
      if (value === "curiosity") {
        newOptions = options.filter(
          (i) => !["pancam", "minites"].includes(i.value)
        );
      } else if (value === "opportunity" || "spirit") {
        newOptions = options.filter(
          (i) => !["mast", "chemcam", "mahli", "mardi"].includes(i.value)
        );
      }
      setCameraOptions(newOptions);
    }
    setValues({ ...values, [prop]: value });
  };

  const submit = (e) => {
    e.preventDefault();
    const validation = validate();
    if (validation && Object.keys(validation).length) return;
    fetchPhotos(values);
  };

  return (
    <div className={classes.root}>
      <form onSubmit={submit} className={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3} lg={2}>
            <FormControl
              fullWidth
              variant="outlined"
              className={classes.margin}
            >
              <TextField
                type="number"
                value={values.sol}
                label="Sol"
                variant="outlined"
                id="sol"
                error={errors?.sol}
                helperText={
                  errors?.sol ? errors.sol : "Enter number from 0 to 3000"
                }
                onChange={handleChange("sol")}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3} lg={3}>
            <FormControl
              fullWidth
              variant="outlined"
              className={classes.margin}
            >
              <InputLabel id="demo-customized-select-label-rover">
                Rover
              </InputLabel>
              <Select
                label="Rover"
                labelId="demo-customized-select-label-rover"
                id="rover"
                value={values.rover}
                onChange={handleChange("rover")}
              >
                {roverOptions.map(({ value, label }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} lg={5}>
            <FormControl
              fullWidth
              variant="outlined"
              className={classes.margin}
            >
              <InputLabel id="demo-customized-select-label">Camera</InputLabel>
              <Select
                label="Camera"
                labelId="demo-customized-select-label"
                id="camera"
                value={values.camera}
                onChange={handleChange("camera")}
              >
                {cameraOptions.map(({ value, label }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} lg={2}>
            <Box
              flexDirection="column"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                size="large"
                classes={{ root: classes.button }}
                type="submit"
                variant="contained"
              >
                Send
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
