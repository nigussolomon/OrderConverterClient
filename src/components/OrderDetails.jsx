/* eslint-disable react/prop-types */
import React, { useState } from "react";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/joy/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { renderTextField } from "./RenderTextField";

export default function OrderDetails({ headers, rows, close, editable, id }) {
  const total = rows.reduce((acc, row) => acc + row.TotalPrice, 0);
  const [value, setValue] = useState("1");
  const [expDate, setExpDate] = useState();
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

  const [editableQty, setEditableQty] = useState({});
  const [editableUnitCost, setEditableUnitCost] = useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const order_items = [];

  const postOrder = async () => {
    rows.map((row) =>
      order_items.push({
        code: row.ItemCode,
        name: row.ItemName,
        description: row.ItemPackingSpec
          ? row.ItemPackingSpec
          : "" + ", " + row.GeneralSpec
          ? row.GeneralSpec
          : "",
        product_type_id: 1,
        unit_id: 1,
        quantity: row.QuantityOrdered,
        price: row.UnitPrice,
      })
    );
    fetch("http://localhost:3000/client_orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payload: {
          client_id: id,
          order_number: headers.PONumber,
          order_date: headers.POSentDate,
          delivery_address: headers.DeliveryAddress1,
          invoice_address: headers.SentInvoiceAddress1,
          delivery_date: expDate,
          terms: {freight_terms: "FOB", currency: "EURO"},
          items: { products: order_items },
        },
      }),
    });
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
      label: "Expected Date",
      value: expDate,
      change: setExpDate,
      width: "332.5px",
      date: true,
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
                  {editable ? (
                    <>
                      <TableCell align="right">
                        <input
                          type="number"
                          value={
                            editableQty[row.ItemCode] || row.QuantityOrdered
                          }
                          onChange={(e) =>
                            setEditableQty({
                              ...editableQty,
                              [row.ItemCode]: e.target.value,
                            })
                          }
                        />
                      </TableCell>
                      <TableCell align="right">
                        <input
                          type="number"
                          value={
                            editableUnitCost[row.ItemCode] || row.UnitPrice
                          }
                          onChange={(e) =>
                            setEditableUnitCost({
                              ...editableUnitCost,
                              [row.ItemCode]: e.target.value,
                            })
                          }
                        />
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell align="right">{row.QuantityOrdered}</TableCell>
                      <TableCell align="right">
                        {row.UnitPrice.toString()}
                      </TableCell>
                    </>
                  )}
                  <TableCell align="right">
                    {(
                      (editableQty[row.ItemCode] || row.QuantityOrdered) *
                      (editableUnitCost[row.ItemCode] || row.UnitPrice)
                    )
                      .toFixed(2)
                      .toString()}
                  </TableCell>
                  <TableCell align="right">
                    {total.toFixed(2).toString()}
                  </TableCell>
                </TableRow>
              ))}
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
          color="danger"
        >
          CANCEL
        </Button>
        <div className="space" style={{ width: "20px" }}></div>
        <Button
          onClick={postOrder}
          sx={{ padding: "10px", paddingInline: "50px" }}
          variant="solid"
          color="success"
        >
          SAVE
        </Button>
      </div>
    </>
  );
}
