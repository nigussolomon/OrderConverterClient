/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import NavBar from "../../components/AppBar";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { UilLink } from "@iconscout/react-unicons";
import OrderDetails from "../../components/OrderDetails";
import Box from "@mui/joy/Box";
import ListDivider from "@mui/joy/ListDivider";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import LinearProgress from "@mui/joy/LinearProgress";
import { UilPackage } from "@iconscout/react-unicons";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import { UilProcess } from "@iconscout/react-unicons";
import { UilSave } from "@iconscout/react-unicons";
import AlertMessage from "../../components/AlertMessage";

export default function Converter() {
  const prefix = "https://www.mymxp.com/x/?";
  const { id, customer } = useParams();
  const [modalTitle, setModalTitle] = React.useState("");
  const [rows, setRows] = React.useState([]);
  const [header, setHeaders] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("success");
  const [loginCode, setLoginCode] = React.useState(
    "A135140324B5494CA6A1A9FD85B3B3DE"
  );
  const [orderLinks, setOrderLinks] = React.useState();
  const [display, setDisplay] = React.useState("none");
  const [linkSaved, setLinkSaved] = React.useState(false);

  const fetchPOs = async (id) => {
    setRows([]);
    setLoading(true);
    try {
      setDisplay("block");
      const url = `http://localhost:8000/so_items?po_login_code=${id}&user_full_name=maveko_plu_module`;
      const response = await fetch(url);
      const data = await response.json();
      await setRows(data.details);
      await setHeaders(data.header.__values__);
      console.log(rows);
      setLoading(false);
      setOpen(true);
      setSeverity("success");
      setMessage("SUCCESSFULLY FETCH ORDER!");
    } catch (error) {
      setDisplay("none");
      console.log(error);
      setOpen(true);
      setSeverity("error");
      setMessage("UNABLE TO FETCH ORDER!");
    }
  };

  React.useEffect(() => {
    const fetchLinks = () => {
      fetch(`http://localhost:3000/order_links/filter/${id}`)
        .then((res) => res.json())
        .then((data) => setOrderLinks(data["data"]));
    };

    fetchLinks();
    setLinkSaved(false);
  }, [linkSaved, id]);

  const saveLink = async () => {
    try {
      fetch("http://localhost:3000/order_links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload: {
            link: loginCode,
            client_id: id,
          },
        }),
      });

      setOpen(true);
      setMessage("SUCCESSFULLY SAVED LINK!");
      setSeverity("success");
      setLinkSaved(true);
    } catch (error) {
      setOpen(true);
      setMessage("LINK ALREADY SAVED PLEASE USE ANOTHER LINK");
      setSeverity("error");
    }
  };

  return (
    <div
      className="converter"
      style={{ paddingInline: "10px", paddingTop: "10px" }}
    >
      <AlertMessage
        open={open}
        message={message}
        severity={severity}
        setOpen={setOpen}
      />
      <NavBar title={`${customer}`}></NavBar>
      <br />
      <div className="body">
        <Input
          value={loginCode}
          onChange={(e) => setLoginCode(e.target.value)}
          placeholder="Input you po login code..."
          sx={{ width: 800 }}
          startDecorator={<UilLink />}
          endDecorator={
            <div className="actions">
              <Button
                color="success"
                onClick={() => {
                  fetchPOs(loginCode);
                  setModalTitle(loginCode);
                }}
                sx={{
                  padding: "14px",
                  margin: "8px",
                  marginRight: "-4px",
                  paddingInline: "40px",
                }}
                startDecorator={<UilProcess />}
              >
                PROCESS
              </Button>
              <Button
                color="warning"
                onClick={() => {
                  saveLink();
                }}
                sx={{
                  padding: "14px",
                  margin: "8px",
                  marginRight: "-4px",
                  paddingInline: "40px",
                }}
                startDecorator={<UilSave />}
              >
                SAVE
              </Button>
            </div>
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
          <div style={{ display: display, width: "100vw" }}>
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
                <OrderDetails
                  id={id}
                  headers={header}
                  rows={rows}
                  close={() => setDisplay("none")}
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
                {orderLinks
                  ? orderLinks.map((list) => (
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
                            <span>{list.link}</span>
                            <Button
                              onClick={() => {
                                setHeaders("");
                                setModalTitle(list.link.replace(prefix, ""));
                                fetchPOs(list.link.replace(prefix, ""));
                              }}
                              sx={{
                                padding: "14px",
                                paddingInline: "40px",
                              }}
                              color="success"
                              startDecorator={<UilProcess />}
                            >
                              PROCESS
                            </Button>
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
