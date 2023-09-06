import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { UilAngleRightB } from "@iconscout/react-unicons";
import { UilExchange } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import IconButton from "@mui/joy/IconButton";
import { UilMultiply } from "@iconscout/react-unicons";
import { UilSignOutAlt } from "@iconscout/react-unicons";

export default function Home() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState("");
  const [portal, setPortal] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const nullChecker = () => {
      if (portal !== "" && customer !== "") {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    };

    nullChecker();
  }, [customer, portal]);

  const customers = {
    C1: "AZAMARA",
    C2: "APPOLO",
  };

  const portals = {
    P1: "MXP",
    P2: "RCCL",
    P3: "CTX",
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card variant="outlined" sx={{ width: 520 }}>
        <div
          className="title"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex" }}>
            <UilExchange />
            <div className="space" style={{ width: "10px" }}></div>
            <Typography level="title-lg">ORDER CONVERTER</Typography>
          </div>
          <IconButton
            onClick={() => {
              navigate("/");
            }}
            color="danger"
            variant="solid"
          >
            <UilSignOutAlt />
          </IconButton>
        </div>
        <Divider />
        <CardContent orientation="vertical">
          <div
            className="field"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <TextField
              sx={{ width: "88%" }}
              value={customer}
              onChange={(e) => {
                setCustomer(e.target.value);
              }}
              select
              label="Customer"
              variant="outlined"
            >
              <MenuItem value="C1">AZAMARA</MenuItem>
              <MenuItem value="C2">APOLLO</MenuItem>
            </TextField>
            <IconButton
              sx={{ width: "9%" }}
              onClick={() => {
                setCustomer("");
              }}
              disabled={customer == ""}
              variant="outlined"
              color="danger"
            >
              <UilMultiply />
            </IconButton>
          </div>
          <div className="space" style={{ height: ".6vh" }}></div>
          <div
            className="filed"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <TextField
              value={portal}
              sx={{ width: "88%" }}
              onChange={async (e) => {
                setPortal(e.target.value);
              }}
              select
              label="Portal"
              variant="outlined"
            >
              <MenuItem value="P1">MXP</MenuItem>
              <MenuItem value="P2">RCCL</MenuItem>
              <MenuItem value="P3">CTX</MenuItem>
            </TextField>
            <IconButton
              sx={{ width: "9%" }}
              onClick={() => {
                setPortal("");
              }}
              disabled={portal == ""}
              variant="outlined"
              color="danger"
            >
              <UilMultiply />
            </IconButton>
          </div>
          <div className="space" style={{ height: ".8vh" }}></div>
          <Button
            disabled={disabled}
            onClick={() =>
              navigate(
                `/oc-converter/${customers[customer]}/${portals[portal]}`
              )
            }
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
            GO TO CONVERTER
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
