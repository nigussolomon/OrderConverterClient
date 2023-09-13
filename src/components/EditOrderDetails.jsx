/* eslint-disable react/prop-types */
import React, { useState } from "react";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { renderTextField } from "./RenderTextField";

export default function EditOrderDetails({ headers, rows, close, editable }) {
  const total = rows.reduce((acc, row) => acc + row.TotalPrice, 0);
  const [value, setValue] = useState("1");
  const [expDate, setExpDate] = useState();
  const [shipName, setShipName] = useState(
    headers ? headers.PODestinationName : ""
  );
  const [deliveryAddress, setDeliveryAddress] = useState(
    headers ? headers.DeliveryAddress1 : ""
  );
  const [finalDelivery, setFinalDelivery] = useState(
    headers
      ? `${
          headers.DeliveryDateToDestination
            ? dayjs(headers.DeliveryDateToDestination)
            : ""
        } | ${
          headers.DestinationDeliveryPlace
            ? headers.DestinationDeliveryPlace
            : ""
        }`
      : ""
  );
  const [deliveryDate, setDeliveryDate] = useState(
    headers ? dayjs(headers.DeliveryDateToDestination) : ""
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const inputFields = [
    {
      label: "PO Number",
      value: headers ? headers.PONumber : "",
      width: "332.5px",
      disabled: !editable,
    },
    {
      label: "Delivery Address",
      value: deliveryAddress,
      change: setDeliveryAddress,
      width: "532.5px",
      disabled: !editable,
    },
    {
      label: "Final Delivery",
      value: finalDelivery,
      change: setFinalDelivery,
      width: "632.5px",
      disabled: !editable,
    },
    {
      label: "Name of Ship",
      value: shipName,
      change: setShipName,
      width: "332.5px",
      disabled: !editable,
    },
  ];

  const inputFields2 = [
    {
      label: "Customer",
      value: headers ? headers.POSentByPersonCompany : "",
      width: "332.5px",
      disabled: !editable,
    },
    {
      label: "Street",
      value: headers ? headers.SentInvoiceAddress3 : "",
      width: "532.5px",
      disabled: !editable,
    },
    {
      label: "City",
      value: headers ? headers.SentInvoiceAddress2 : "",
      width: "532.5px",
      disabled: !editable,
    },
    {
      label: "Address",
      value: headers
        ? headers.SentInvoiceAddress5
          ? headers.SentInvoiceAddress5
          : "" + " | " + headers.SentInvoiceAddress4
          ? headers.SentInvoiceAddress4
          : "" + " | " + headers.SentInvoiceAddress6
          ? headers.SentInvoiceAddress6
          : ""
        : "",
      width: "332.5px",
      disabled: !editable,
    },
  ];

  const inputFields3 = [
    {
      label: "Terms",
      value: headers ? headers.PaymentTerms : "",
      width: "332.5px",
      disabled: !editable,
    },
    {
      label: "Process Matchcode",
      value: headers ? headers.PONumber : "",
      width: "332.5px",
      disabled: !editable,
    },
    {
      label: "Refernce Date",
      value: headers ? dayjs(headers.POSentDate) : "",
      width: "332.5px",
      date: true,
      disabled: !editable,
    },
    {
      label: "Delivery Date",
      value: deliveryDate,
      change: setDeliveryDate,
      width: "332.5px",
      date: true,
      disabled: !editable,
    },
    {
      label: "Expected Date",
      value: expDate,
      change: setExpDate,
      width: "332.5px",
      date: true,
    },
  ];

  const renderFields = (fields) => (
    <div
      className="newOrder"
      style={{
        display: "flex",
        marginLeft: -20,
        justifyContent: "flex-start",
        flexWrap: "wrap",
      }}
    >
      {fields.map((field) => (
        <React.Fragment key={field.label}>
          {renderTextField(field)}
          <div className="space" style={{ width: "20px" }}></div>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Maveko Details" value="1" />
            <Tab label="Customer Details" value="2" />
            <Tab label="Document Details" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">{renderFields(inputFields)}</TabPanel>
        <TabPanel value="2">{renderFields(inputFields2)}</TabPanel>
        <TabPanel value="3">{renderFields(inputFields3)}</TabPanel>
      </TabContext>
      <Box
        style={{
          border: "1px solid #d6d6cd",
          marginTop: 20,
          borderRadius: "5px",
        }}
      >
        <TableContainer style={{ width: "100%", borderRadius: "5px" }}>
          <Table aria-label="spanning table">
            <TableHead style={{ background: "#fff" }}>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Item Number</TableCell>
                <TableCell style={{ maxWidth: "250px" }}>Description</TableCell>
                <TableCell>U/M</TableCell>
                <TableCell align="right">Unit Cost</TableCell>
                <TableCell align="right">Qty</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.ItemCode}>
                  <TableCell>{row.LineNumber}</TableCell>
                  <TableCell>{row.ItemCode}</TableCell>
                  <TableCell style={{ maxWidth: "450px" }}>
                    {row.ItemName
                      ? row.ItemName
                      : "" + ", " + row.ItemPackingSpec
                      ? row.ItemPackingSpec
                      : "" + ", " + row.GeneralSpec
                      ? row.GeneralSpec
                      : ""}
                  </TableCell>
                  <TableCell>{row.UOM}</TableCell>
                  <TableCell align="right">
                    {row.UnitPrice.toString()}
                  </TableCell>
                  <TableCell align="right">{row.QuantityOrdered}</TableCell>
                  <TableCell align="right">
                    {(row.QuantityOrdered * row.UnitPrice)
                      .toFixed(2)
                      .toString()}
                  </TableCell>
                  <TableCell align="right">{row.TotalPrice}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={6} />
                <TableCell
                  colSpan={1}
                  align="left"
                  style={{
                    fontWeight: 900,
                    background: "#808080",
                    color: "#fff",
                  }}
                >
                  Subtotal
                </TableCell>
                <TableCell
                  style={{ background: "#808080", color: "#fff" }}
                  align="right"
                >
                  {total.toFixed(2).toString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <div
        className="actions"
        style={{
          display: "flex",
          marginTop: "15px",
          justifyContent: "flex-end",
        }}
      >
        <Button
          onClick={close}
          sx={{ padding: "10px", paddingInline: "50px" }}
          variant="outlined"
          color="error"
        >
          CANCEL
        </Button>
        <div className="space" style={{ width: "20px" }}></div>
        <Button
          sx={{ padding: "10px", paddingInline: "50px" }}
          variant="contained"
          color="success"
        >
          SAVE ORDER
        </Button>
      </div>
    </>
  );
}
