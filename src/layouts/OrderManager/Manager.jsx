/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import NavBar from "../../components/AppBar";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { UilSearchAlt } from '@iconscout/react-unicons'
import OrderDetails from "../../components/OrderDetails";
import Box from "@mui/joy/Box";
import ListDivider from "@mui/joy/ListDivider";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import LinearProgress from "@mui/joy/LinearProgress";
import { UilPackage } from "@iconscout/react-unicons";

export default function Manager() {
  const prefix = "https://www.mymxp.com/x/?";
  const { customer } = useParams();
  const [modalTitle, setModalTitle] = React.useState("");
  const [rows, setRows] = React.useState([]);
  const [header, setHeaders] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [loginCode, setLoginCode] = React.useState("");
  const [display, setDisplay] = React.useState("none");

  const fetchPOs = async (id) => {
    setRows([]);
    setLoading(true);
    try {
      setDisplay("block")
      const url = `http://localhost:8000/so_items?po_login_code=${id}&user_full_name=maveko_plu_module`;
      const response = await fetch(url);
      const data = await response.json();
      await setRows(data.details);
      await setHeaders(data.header.__values__);
      console.log(rows);
      setLoading(false);
    } catch (error) {
      setDisplay("none")
      console.log(error);
    }
  };

  return (
    <div
      className="converter"
      style={{ paddingInline: "10px", paddingTop: "10px" }}
    >
      <NavBar title={`${customer}`} before="/om/home"></NavBar>
      <br />
      <div className="body">
        <Input
          value={loginCode}
          onChange={(e) => setLoginCode(e.target.value)}
          placeholder="Input search keyword..."
          sx={{ width: 500 }}
          startDecorator={<UilSearchAlt />}
          endDecorator={
            <Button
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
            >
              SEARCH
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
                  headers={header}
                  rows={rows}
                  close={() => setDisplay("none")}
                />
              </>
            )}
          </div>
        </Box>
      </div>
    </div>
  );
}
