import React, { useEffect, useState } from "react";
import { Container, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import AddProperty from "../../AddProperty/AddProperty";
import ModalShow from "../../ModalShow/ModalShow";
import axios from "axios";

const Property = () => {
  const [searchValue, setsearchValue] = useState([]);
  const [propertyname, setpropertyName] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [propertyData, setPropertyData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/property")
      .then((res) => res.json())
      .then((data) => {
        setPropertyData(data);
        setsearchValue(data);
      });
  }, []);

  const deleteProperty = (data) => {
    axios.delete(`http://localhost:5000/property/${data}`);
  };

  console.log(propertyData);
  return (
    <Box>
      <Container>
        <AddProperty
          searchValue={searchValue}
          setsearchValue={setsearchValue}
          propertyname={propertyname}
          setpropertyName={setpropertyName}
          propertyData={propertyData}
          setPropertyData={setPropertyData}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Property</TableCell>
                    <TableCell align="right">id</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Location</TableCell>
                    <TableCell align="right">phone</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchValue.map((property, index) => (
                    <TableRow
                      key={property.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {property.propertyname}
                      </TableCell>
                      <TableCell align="right">{property.id}</TableCell>
                      <TableCell align="right">{property.name}</TableCell>
                      <TableCell align="right">{property.location}</TableCell>
                      <TableCell align="right">{property.phone}</TableCell>
                      <TableCell align="right">
                        <Button
                          onClick={() => deleteProperty(property.name)}
                          variant="contained"
                          color="secondary"
                        >
                          Delete
                        </Button>
                        <Button
                          sx={{ ml: "5px" }}
                          variant="contained"
                          color="secondary"
                          onClick={handleOpen}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
      <ModalShow
        propertyData={propertyData}
        handleClose={handleClose}
        open={open}
      />
    </Box>
  );
};

export default Property;
