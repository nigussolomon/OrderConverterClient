/* eslint-disable react/prop-types */
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function OrderDetails({ headers }) {
  const [value, setValue] = useState("1");
  const [expDate, setExpDate] = useState();
  const [shipName, setShipName] = useState(
    headers ? headers.PODestinationName : ""
  );
  const [shipNumber, setShipNumber] = useState();
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
  const [voyageNumber, setVoyageNumber] = useState();
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
      disabled: true,
    },
    {
      label: "Name of Ship",
      value: shipName,
      change: setShipName,
      width: "332.5px",
    },
    {
      label: "Ship Number",
      value: shipNumber,
      change: setShipNumber,
      width: "332.5px",
    },
    {
      label: "Delivery Address",
      value: deliveryAddress,
      change: setDeliveryAddress,
      width: "532.5px",
    },
    {
      label: "Final Delivery",
      value: finalDelivery,
      change: setFinalDelivery,
      width: "332.5px",
    },
    {
      label: "Voyage Number",
      value: voyageNumber,
      change: setVoyageNumber,
      width: "332.5px",
    },
  ];

  const inputFields2 = [
    {
      label: "Customer",
      value: headers ? headers.POSentByPersonCompany : "",
      width: "332.5px",
      disabled: true,
    },
    {
      label: "Street",
      value: headers ? headers.SentInvoiceAddress3 : "",
      width: "332.5px",
      disabled: true,
    },
    {
      label: "City",
      value: headers ? headers.SentInvoiceAddress2 : "",
      width: "332.5px",
      disabled: true,
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
      disabled: true,
    },
  ];

  const inputFields3 = [
    {
      label: "Terms",
      value: headers ? headers.PaymentTerms : "",
      width: "332.5px",
      disabled: true,
    },
    {
      label: "Process Matchcode",
      value: headers ? headers.PONumber : "",
      width: "332.5px",
      disabled: true,
    },
    {
      label: "Refernce Date",
      value: headers ? dayjs(headers.POSentDate) : "",
      width: "332.5px",
      date: true,
      disabled: true,
    },
    {
      label: "Delivery Date",
      value: deliveryDate,
      change: setDeliveryDate,
      width: "332.5px",
      date: true,
    },
    {
      label: "Expected Date",
      value: expDate,
      change: setExpDate,
      width: "332.5px",
      date: true,
    },
  ];

  const renderTextField = (field) =>
    field.options ? (
      <TextField
        key={field.label}
        select
        disabled={field.disabled ? field.disabled : false}
        value={field.value}
        style={{
          width: field.width ? field.width : "400px",
          marginBottom: "15px",
        }}
        label={field.label}
        variant="outlined"
        onChange={(e) => field.change(e.target.value)}
      >
        {field.options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    ) : field.date ? (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          disabled={field.disabled ? field.disabled : false}
          label={field.label}
          value={field.value}
          onChange={(newValue) => {
            field.change ? field.change(newValue) : null;
          }}
        ></DatePicker>
      </LocalizationProvider>
    ) : (
      <TextField
        disabled={field.disabled ? field.disabled : false}
        value={field.value}
        style={{
          width: field.width ? field.width : "400px",
          marginBottom: "15px",
        }}
        label={field.label}
        variant="outlined"
        onChange={(e) => (field.change ? field.change(e.target.value) : null)}
      />
    );

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
    </>
  );
}
