import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { UilAngleRightB } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { UilCodeBranch } from "@iconscout/react-unicons";
import { headDiv } from "./setupStyle";

export default function OrderSource() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState("");
  const [portalName, setPortalName] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const nullChecker = () => {
      if (customer !== "" && portalName !== "") {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    };

    nullChecker();
  }, [customer, portalName]);

  const customers = {
    C1: "AZAMARA",
  };

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
            <Typography level="title-lg">ADD ORDER SOURCE</Typography>
          </div>
        </div>
        <Divider />
        <CardContent orientation="vertical">
          <div className="field">
            <TextField
              sx={{ width: "100%" }}
              value={customer}
              onChange={(e) => {
                setCustomer(e.target.value);
              }}
              select
              label="Customer"
              variant="outlined"
            >
              <MenuItem value="C1">AZAMARA</MenuItem>
            </TextField>
            <div className="space" style={{ height: "12px" }}></div>
            <TextField
              sx={{ width: "100%" }}
              value={portalName}
              onChange={(e) => {
                setPortalName(e.target.value);
              }}
              select
              label="Portal Name"
              variant="outlined"
            >
              <MenuItem value="P1">MXP</MenuItem>
            </TextField>
            <div className="space" style={{ width: "30px" }}></div>
          </div>
          <div className="space" style={{ height: ".6vh" }}></div>
          <Button
            disabled={disabled}
            onClick={() => navigate(`/oc/${customers[customer]}`)}
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
            ADD SOURCE
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
