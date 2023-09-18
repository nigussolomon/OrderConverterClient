import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { UilEdit } from "@iconscout/react-unicons";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import NavBar from "../../components/AppBar";

function MasterPl() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [open, setOpen] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [activeItem, setActiveItem] = React.useState(0);
  const [price, setPrice] = useState(0);
  const [margin, setMargin] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetch("http://localhost:3000/master_prices")
      .then((response) => response.json())
      .then((data) => setData(data["data"]))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const updatePrice = (id) => {
    fetch("http://localhost:3000/master_prices/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payload: {
          new_pprice: price,
          margin: margin,
        },
      }),
    });
    window.location.reload(false)
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Updating price of, {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <div
            className="fields"
            style={{ display: "flex", marginTop: "10px" }}
          >
            <TextField
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              label="New Price"
            ></TextField>
            <div className="space" style={{ width: "20px" }}></div>
            <TextField
              value={margin}
              onChange={(e) => setMargin(e.target.value)}
              type="number"
              label="Price Margin"
            ></TextField>
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="outlined" onClick={handleClose}>
            CANCEL
          </Button>
          <Button
            onClick={() => {
              updatePrice(activeItem);
              handleClose();
            }}
            color="warning"
            variant="contained"
            autoFocus
          >
            UPDATE
          </Button>
        </DialogActions>
      </Dialog>
      <NavBar title={"MASTER PRICE LIST"}></NavBar>
      <div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Valid From</TableCell>
                <TableCell>Valid To</TableCell>
                <TableCell>Old Price</TableCell>
                <TableCell>New Price</TableCell>
                <TableCell>Old Selling Price</TableCell>
                <TableCell>New Selling Price</TableCell>
                <TableCell>Supplier</TableCell>
                <TableCell style={{ maxWidth: "80px", width: "80px" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.product.name}</TableCell>
                  <TableCell>{row.pp_valid_from}</TableCell>
                  <TableCell>{row.pp_valid_to}</TableCell>
                  <TableCell>{row.old_pprice}</TableCell>
                  <TableCell>{row.new_pprice}</TableCell>
                  <TableCell>{row.old_sprice}</TableCell>
                  <TableCell>{row.new_sprice}</TableCell>
                  <TableCell>{row.supplier.name}</TableCell>
                  <TableCell style={{ maxWidth: "80px", width: "80px" }}>
                    <IconButton
                      onClick={() => {
                        handleClickOpen();
                        setDialogTitle(row.product.name);
                        setActiveItem(row.id);
                      }}
                    >
                      <UilEdit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "16px",
          }}
        >
          <Pagination
            count={Math.ceil(data.length / pageSize)}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </div>
      </div>
    </div>
  );
}

export default MasterPl;
