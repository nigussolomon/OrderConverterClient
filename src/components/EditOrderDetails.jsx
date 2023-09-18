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

export default function EditOrderDetails({
  headers,
  rows,
  close,
  id,
  order_id,
  customer,
}) {
  const total = rows.reduce((acc, row) => acc + row.price, 0);
  const [value, setValue] = useState("1");
  const [expDate, setExpDate] = useState(
    headers.delivery_date ? dayjs(headers.delivery_date) : ""
  );
  const [deliveryAddress, setDeliveryAddress] = useState(
    headers ? headers.delivery_address : ""
  );
  const [finalDelivery, setFinalDelivery] = useState(
    headers
      ? `${headers.delivery_date ? dayjs(headers.delivery_date).add(1, 'day') : ""} | ${
          headers.delivery_address ? headers.delivery_address : ""
        }`
      : ""
  );
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [editableQty, setEditableQty] = useState({});
  const [editableUnitCost, setEditableUnitCost] = useState({});

  const order_items = [];

  const updateOrder = async () => {
    rows.map((row) =>
      order_items.push({
        code: row.product.code,
        name: row.product.name,
        description: row.product.description,
        product_type_id: 1,
        unit_id: 1,
        quantity: editableQty[row.id] ? editableQty[row.id] : row.quantity,
        price: editableUnitCost[row.id] ? editableUnitCost[row.id] : row.price,
      })
    );
    fetch(`http://localhost:3000/client_orders/${order_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payload: {
          client_id: id,
          order_number: headers.PONumber,
          order_date: headers.POSentDate,
          delivery_address: deliveryAddress,
          invoice_address: headers.SentInvoiceAddress1,
          delivery_date: dayjs(expDate).add(1, 'day'),
          terms: { freight_terms: "FOB", currency: "EURO" },
          items: { products: order_items },
        },
      }),
    });
  };

  const inputFields = [
    {
      label: "PO Number",
      value: headers ? headers.order_number : "",
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
      width: "632.5px",
      disabled: true,
    },
    {
      label: "Refernce Date",
      value: headers ? dayjs(headers.order_date) : "",
      width: "332.5px",
      date: true,
      disabled: true,
    },
    {
      label: "Expected Date",
      value: expDate,
      change: setExpDate,
      width: "332.5px",
      date: true,
    },
    {
      label: "Customer",
      value: customer,
      width: "332.5px",
    },
    {
      label: "Invoice Address",
      value: headers ? headers.invoice_address : "",
      width: "532.5px",
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
            <Tab label="Order Details" value="1" />
          </TabList>
        </Box>
        <TabPanel value="1">{renderFields(inputFields)}</TabPanel>
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
                <TableRow key={row.id}>
                  <TableCell>{row.product.code}</TableCell>
                  <TableCell style={{ maxWidth: "450px" }}>
                    {row.product.name}
                  </TableCell>
                  <TableCell>{row.product.unit_id}</TableCell>
                  {
                    <>
                      <TableCell align="right">
                        <input
                          type="number"
                          value={editableQty[row.id] || row.quantity}
                          onChange={(e) =>
                            setEditableQty({
                              ...editableQty,
                              [row.id]: e.target.value,
                            })
                          }
                        />
                      </TableCell>
                      <TableCell align="right">
                        <input
                          type="number"
                          value={editableUnitCost[row.id] || row.price}
                          onChange={(e) =>
                            setEditableUnitCost({
                              ...editableUnitCost,
                              [row.id]: e.target.value,
                            })
                          }
                        />
                      </TableCell>
                    </>
                  }
                  <TableCell align="right">
                    {(
                      (editableQty[row.id] || row.quantity) *
                      (editableUnitCost[row.id] || row.price)
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
          onClick={updateOrder}
          sx={{ padding: "10px", paddingInline: "50px" }}
          variant="solid"
          color="warning"
        >
          UPDATE ORDER
        </Button>
      </div>
    </>
  );
}
