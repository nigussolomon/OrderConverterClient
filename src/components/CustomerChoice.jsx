/* eslint-disable react/prop-types */
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
import IconButton from "@mui/joy/IconButton";
import { UilMultiply } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";

export default function CustomerChoice({
  path,
  setDisplay,
  sys_title,
  sys_icon,
}) {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const nullChecker = () => {
      if (customer !== "") {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    };

    nullChecker();
  }, [customer]);

  const customers = {
    C1: "AZAMARA",
  };

  return (
    <div
      style={{
        marginTop: "13px",
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
            {sys_icon}
            <div className="space" style={{ width: "10px" }}></div>
            <Typography level="title-lg">{sys_title}</Typography>
          </div>
          <IconButton
            onClick={() => {
              setDisplay("none");
            }}
            color="danger"
            variant="solid"
          >
            <UilTimes />
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
          <Button
            disabled={disabled}
            onClick={() => navigate(`${path}/${customers[customer]}`)}
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
