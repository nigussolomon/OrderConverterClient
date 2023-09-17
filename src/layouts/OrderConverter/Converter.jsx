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

export default function Converter() {
  const prefix = "https://www.mymxp.com/x/?";
  const { id, customer } = useParams();
  const [modalTitle, setModalTitle] = React.useState("");
  const [rows, setRows] = React.useState([]);
  const [header, setHeaders] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [loginCode, setLoginCode] = React.useState(
    "A135140324B5494CA6A1A9FD85B3B3DE"
  );
  const [display, setDisplay] = React.useState("none");

  const orderLinks = [
    {
      title: "A135140324B5494CA6A1A9FD85B3B3DE",
      disabled: false,
    },
    {
      title: "F23F84E3E06B48B1A307E486DA3B716E",
      disabled: true,
    },
  ];
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
                  fetchPOs(loginCode);
                  setModalTitle(loginCode);
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
                          }}
                          disabled={list.disabled}
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
                ))}
              </List>
            </div>
          </Box>
        </Box>
      </div>
    </div>
  );
}
