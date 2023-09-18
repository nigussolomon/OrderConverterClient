/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import NavBar from "../../components/AppBar";
import Button from "@mui/joy/Button";
import EditOrderDetails from "../../components/EditOrderDetails";
import Box from "@mui/joy/Box";
import ListDivider from "@mui/joy/ListDivider";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import LinearProgress from "@mui/joy/LinearProgress";
import { UilPackage } from "@iconscout/react-unicons";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import IconButton from "@mui/joy/IconButton";
import { UilCheck } from "@iconscout/react-unicons";

export default function Manager() {
  const prefix = "https://www.mymxp.com/x/?";
  const { id, customer } = useParams();
  const [modalTitle, setModalTitle] = React.useState("");
  const [rows, setRows] = React.useState([]);
  const [header, setHeaders] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [display, setDisplay] = React.useState("none");
  const [clientOrders, setClientOrders] = React.useState([]);

  React.useEffect(() => {
    async function Orders() {
      const response = await fetch(
        `http://localhost:3000/client_orders/filter/${id}`
      );
      const data = await response.json();
      await setClientOrders(data["data"]);
    }
    Orders();
  }, [id]);

  const confirmOrder = async (id) => {
    const response = await fetch(`http://localhost:3000/client_orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payload: {
          status: 1,
        },
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  const fetchPOs = async (id) => {
    setRows([]);
    setLoading(true);
    try {
      setDisplay("block");
      const url = `http://localhost:3000/order_details/${id}`;
      const response = await fetch(url);
      const data = await response.json();
      await setRows(data["data"]);
      await setHeaders(data["data"][0].client_order);
      console.log(rows);
      setLoading(false);
    } catch (error) {
      setDisplay("none");
      console.log(error);
    }
  };

  return (
    <div
      className="converter"
      style={{ paddingInline: "10px", paddingTop: "10px" }}
    >
      <NavBar title={`${customer}`}></NavBar>
      <br />
      <div className="body">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "left",
            gap: 4,
          }}
        >
          <div style={{ display: display, width: "100vw" }}>
            <Typography startDecorator={<UilPackage />} level="h4">
              {modalTitle.replace(prefix, "")}
            </Typography>
            <ListDivider sx={{ mt: 2, mb: 2 }} inset={"gutter"} />
            {loading ? (
              <LinearProgress size="md" variant="plain" />
            ) : (
              <>
                <Typography level="h3">{header.order_number}</Typography>
                <Typography level="h4" style={{ marginTop: "0px" }}>
                  {customer}
                </Typography>
                <Typography level="h5" style={{ marginTop: "0px" }}>
                  {header.order_date}
                </Typography>
                <ListDivider sx={{ mt: 2, mb: 2 }} inset={"gutter"} />
                <EditOrderDetails
                  customer={customer}
                  order_id={header.id}
                  id={id}
                  headers={header}
                  rows={rows}
                  close={() => setDisplay("none")}
                  editable
                />
              </>
            )}
          </div>
          <Box
            sx={{
              display: display == "block" ? "none" : "block",
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
                {clientOrders && clientOrders.length > 0
                  ? clientOrders.map((list) => (
                      <>
                        <ListItem>
                          <ListItemDecorator>
                            <UilPackage></UilPackage>
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
                            <span>{list.order_number}</span>
                            <span>{list.order_date}</span>
                            <span>{list.status.toUpperCase()}</span>
                            <div
                              className="actions"
                              style={{ display: "flex" }}
                            >
                              <Button
                                onClick={() => {
                                  setHeaders("");
                                  setModalTitle(list.order_number);
                                  fetchPOs(list.id);
                                }}
                                disabled={list.status != "draft" ? true : false}
                                sx={{
                                  padding: "14px",
                                  paddingInline: "40px",
                                }}
                                color="warning"
                              >
                                UPDATE
                              </Button>
                              <div
                                className="space"
                                style={{ width: "12px" }}
                              ></div>
                              <IconButton
                                disabled={list.status != "draft" ? true : false}
                                onClick={() => {
                                  confirmOrder(list.id);
                                  const newClientOrders = clientOrders.map(
                                    (order) => {
                                      if (order.id == list.id) {
                                        order.status = "CONFIRMED";
                                      }
                                      return order;
                                    }
                                  );

                                  setClientOrders(newClientOrders);
                                }}
                                color="success"
                                variant="solid"
                              >
                                <UilCheck />
                              </IconButton>
                            </div>
                          </div>
                        </ListItem>
                        <ListDivider inset={"gutter"} />
                      </>
                    ))
                  : null}
              </List>
            </div>
          </Box>
        </Box>
      </div>
    </div>
  );
}
