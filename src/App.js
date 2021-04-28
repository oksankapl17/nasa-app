import React, { useCallback, useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { useSnackbar } from "notistack";
import Pagination from "@material-ui/lab/Pagination";
import Header from "../src/components/Header/Header";
import Form from "./components/Form/Form";
import PhotoCards from "./components/PhotoCards/PhotoCards";
import classes from "./App.module.scss";

function App() {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState({});

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const fetchPhotos = useCallback(
    async (queryObject) => {
      const getPhotos = async (q) => {
        if (q && Object.keys(q).length) {
          const { sol, camera, rover } = q;
          const key = "WsIg01OenmbA8acAtM0MAzo1aLjWsOcA8zUUkZln";
          const cameraUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&page=${page}&camera=${camera}&api_key=${key}`;
          try {
            const response = await fetch(cameraUrl);
            const { photos } = await response.json();
            setData(photos);
          } catch (e) {
            enqueueSnackbar(e?.message || e, {
              variant: "error",
              autoHideDuration: 3000,
            });
          }
        }
      };
      if (queryObject && Object.keys(queryObject).length) {
        setQuery(queryObject);
        await getPhotos(queryObject);
      } else {
        await getPhotos(query);
      }
    },
    [enqueueSnackbar, page, query]
  );

  useEffect(() => {
    if (Object.keys(query).length) {
      fetchPhotos();
    }
  }, [fetchPhotos, page, query]);

  return (
    <div className="App">
      <CssBaseline />
      <Header />
      <Container classes={{ root: classes.root }}>
        <Paper elevation={3} className={classes.paper}>
          <Form fetchPhotos={fetchPhotos} />
          <PhotoCards photos={data} />
          <Box
            flexDirection="row"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Pagination
              disabled={!Object.keys(query).length}
              count={10}
              page={page}
              onChange={handlePageChange}
            />
          </Box>
        </Paper>
      </Container>
    </div>
  );
}

export default App;
