import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { UilAngleRightB } from "@iconscout/react-unicons";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UilCodeBranch } from "@iconscout/react-unicons";
import { headDiv } from "./setupStyle";

export default function Supplier() {
  // const navigate = useNavigate();
  const [supplierCode, setSupplierCode] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [supplierEmail, setSupplierEmail] = useState("");
  const [supplierLocale, setSupplierLocale] = useState("");
  const [supplierAddress, setSupplierAddress] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={headDiv}>
      <Card variant="outlined" sx={{ width: 450 }}>
        <div
          className="title"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex" }}>
            <UilCodeBranch />
            <div className="space" style={{ width: "10px" }}></div>
            <Typography level="title-lg">SUPPLIER</Typography>
          </div>
        </div>
        <Divider />
        <CardContent orientation="vertical">
          <div className="field">
            <TextField
              sx={{ width: "100%" }}
              value={supplierCode}
              onChange={(e) => {
                setSupplierCode(e.target.value);
              }}
              label="Supplier Code"
              variant="outlined"
            >
              <MenuItem value="C1">AZAMARA</MenuItem>
            </TextField>
            <div className="space" style={{ height: "13px" }}></div>
            <TextField
              sx={{ width: "100%" }}
              value={supplierName}
              onChange={(e) => {
                setSupplierName(e.target.value);
              }}
              label="Supplier Name"
              variant="outlined"
            >
              <MenuItem value="C1">AZAMARA</MenuItem>
            </TextField>
            <div className="space" style={{ height: "13px" }}></div>
            <TextField
              sx={{ width: "100%" }}
              value={supplierEmail}
              onChange={(e) => {
                setSupplierEmail(e.target.value);
              }}
              label="Supplier  Email"
              variant="outlined"
            >
              <MenuItem value="P1">MXP</MenuItem>
            </TextField>
            <div className="space" style={{ height: "13px" }}></div>
            <div className="la" style={{ display: "flex" }}>
              <TextField
                sx={{ width: "100%" }}
                value={supplierLocale}
                onChange={(e) => {
                  setSupplierLocale(e.target.value);
                }}
                label="Supplier Locale"
                select
                variant="outlined"
              >
                <MenuItem value="E1">EN</MenuItem>
                <MenuItem value="E1">GB</MenuItem>
              </TextField>
              <div className="space" style={{ width: "25px" }}></div>
              <TextField
                sx={{ width: "100%" }}
                value={supplierAddress}
                onChange={(e) => {
                  setSupplierAddress(e.target.value);
                }}
                label="Supplier  Address"
                variant="outlined"
              >
                <MenuItem value="P1">MXP</MenuItem>
              </TextField>
            </div>
            <div className="space" style={{ height: "13px" }}></div>
            <TextField
              sx={{ width: "100%" }}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              label="Password"
              variant="outlined"
            >
              <MenuItem value="P1">MXP</MenuItem>
            </TextField>
          </div>
          <div className="space" style={{ height: ".6vh" }}></div>
          <Button
            variant="solid"
            size="lg"
            color="primary"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: 600,
              width: "100%",
              padding: "17px",
            }}
            endDecorator={<UilAngleRightB />}
          >
            ADD SUPPLIER
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
