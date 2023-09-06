/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import NavBar from "../../components/AppBar";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { UilLink } from "@iconscout/react-unicons";
import { orderLinks } from "../../components/OrderLinks";
import OrderDetails from "../../components/OrderDetails";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import LinearProgress from "@mui/joy/LinearProgress";
import { UilPackage } from "@iconscout/react-unicons";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function Converter() {
  const prefix = "https://www.mymxp.com/x/?";
  const { customer, portal } = useParams();
  const [layout, setLayout] = React.useState(undefined);
  const [modalTitle, setModalTitle] = React.useState("");
  const [rows, setRows] = React.useState([]);
  const [header, setHeaders] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [total, setTotal] = React.useState(0);

  const fetchPOs = async (id) => {
    setRows([]);
    setLoading(true);
    try {
      const url = `http://10.1.40.160:8000/so_items?po_login_code=${id}&user_full_name=maveko_plu_module`;
      const response = await fetch(url);
      const data = await response.json();
      await setRows(data.details);
      await setHeaders(data.header.__values__);
      console.log(rows);
      setLoading(false);
      setTotal(rows.reduce((acc, row) => acc + row.TotalPrice, 0));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="converter"
      style={{ paddingInline: "10px", paddingTop: "10px" }}
    >
      <NavBar title={`${customer}, ${portal}`}></NavBar>
      <br />
      <div className="body">
        <React.Fragment>
          <Modal open={!!layout} onClose={() => setLayout(undefined)}>
            <ModalDialog
              style={{ overflowY: "auto" }}
              aria-labelledby="layout-modal-title"
              aria-describedby="layout-modal-description"
              layout={layout}
            >
              <ModalClose />
              <Typography startDecorator={<UilPackage />} level="h4">
                {modalTitle.replace(prefix, "")}
              </Typography>
              <ListDivider sx={{ mt: 2, mb: 2 }} inset={"gutter"} />
              {loading ? (
                <LinearProgress size="md" variant="plain" />
              ) : (
                <>
                  <Typography level="h3">{header.PONumber}</Typography>
                  <Typography level="h4" style={{ marginTop: "0px" }}>
                    {header.POSentByPersonCompany}
                  </Typography>
                  <Typography level="h5" style={{ marginTop: "0px" }}>
                    {header.POSentDate}
                  </Typography>
                  <ListDivider sx={{ mt: 2, mb: 2 }} inset={"gutter"} />
                  <OrderDetails headers={header} />
                  <ListDivider  inset={"gutter"} />
                  <Box
                    style={{
                      border: "1px solid #d6d6cd",
                      marginTop: 20,
                      borderRadius: "5px",
                    }}
                  >
                    <TableContainer
                      loading={loading}
                      style={{ width: "100%", borderRadius: "5px" }}
                    >
                      <Table aria-label="spanning table">
                        <TableHead style={{ background: "#fff" }}>
                          <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Item Number</TableCell>
                            <TableCell style={{ maxWidth: "250px" }}>
                              Description
                            </TableCell>
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
                              <TableCell align="right">
                                {row.QuantityOrdered}
                              </TableCell>
                              <TableCell align="right">
                                {(row.QuantityOrdered * row.UnitPrice)
                                  .toFixed(2)
                                  .toString()}
                              </TableCell>
                              <TableCell align="right">
                                {row.TotalPrice}
                              </TableCell>
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
                </>
              )}
            </ModalDialog>
          </Modal>
        </React.Fragment>
        <Input
          placeholder="Input you po login link..."
          sx={{ width: 800 }}
          startDecorator={<UilLink />}
          endDecorator={
            <Button
              sx={{
                padding: "14px",
                margin: "8px",
                marginRight: "-4px",
                paddingInline: "40px",
              }}
            >
              ADD LINK
            </Button>
          }
        />
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "left",
            gap: 4,
            mt: 3,
          }}
        >
          <div>
            <List
              sx={{
                minWidth: "98.3vw",
                borderRadius: "sm",
              }}
            >
              <ListDivider inset={"gutter"} />
              {orderLinks.map((list) => (
                <>
                  <ListItem>
                    <ListItemDecorator>
                      <UilLink></UilLink>
                    </ListItemDecorator>
                    <div
                      className="text"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <span>{list.title}</span>
                      <Button
                        onClick={() => {
                          setHeaders("");
                          setModalTitle(list.title.replace(prefix, ""));
                          fetchPOs(list.title.replace(prefix, ""));
                          setLayout("fullscreen");
                        }}
                        disabled={list.disabled}
                        sx={{
                          padding: "14px",
                          paddingInline: "40px",
                        }}
                      >
                        PROCESS LINK
                      </Button>
                    </div>
                  </ListItem>
                  <ListDivider inset={"gutter"} />
                </>
              ))}
            </List>
          </div>
        </Box>
      </div>
    </div>
  );
}
