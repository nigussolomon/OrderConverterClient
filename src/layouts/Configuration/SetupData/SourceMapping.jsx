import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import IconButton from "@mui/joy/IconButton";
import { UilMultiply } from "@iconscout/react-unicons";
import { UilSitemap } from "@iconscout/react-unicons";
import { UilPlus } from "@iconscout/react-unicons";
import { UilSave } from "@iconscout/react-unicons";
import { UilWind } from "@iconscout/react-unicons";
import { headDiv } from "./setupStyle";

export default function SourceMapping() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [mappings, setMappings] = useState([]);

  const customers = {
    C1: "AZAMARA",
  };

  return (
    <div style={headDiv}>
      <div className="content">
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
              <UilSitemap />
              <div className="space" style={{ width: "10px" }}></div>
              <Typography level="title-lg">FIELD MAPPING</Typography>
            </div>
          </div>
          <Divider />
          <CardContent orientation="vertical">
            <div
              className="field"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
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
              <div className="space" style={{ width: "10px" }}></div>
              <IconButton
                sx={{ width: "7%" }}
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
              className="field"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <TextField
                sx={{ width: "44.3%" }}
                value={source}
                onChange={(e) => {
                  setSource(e.target.value);
                }}
                label="Source Field"
                variant="outlined"
              >
                <MenuItem value="P1">MXP</MenuItem>
              </TextField>
              <TextField
                sx={{ width: "44.3%" }}
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                }}
                label="Destination Field"
                variant="outlined"
              ></TextField>
              <IconButton
                sx={{ width: "6.5%" }}
                onClick={() => {
                  setMappings([...mappings, { [source]: destination }]);
                }}
                disabled={customer == "" || source == "" || destination == ""}
                variant="outlined"
                color="success"
              >
                <UilPlus />
              </IconButton>
            </div>
          </CardContent>
        </Card>
        <div className="space" style={{ width: "30px", height: "2vh" }}></div>
        <Card variant="outlined" sx={{ width: 520, height: 400 }}>
          <div
            className="title"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex" }}>
              <UilSitemap />
              <div className="space" style={{ width: "10px" }}></div>
              <Typography level="title-lg">
                {customer ? customers[customer] : ""}
              </Typography>
            </div>
            <IconButton
              style={{ paddingInline: "20px" }}
              onClick={() => {
                setMappings([]);
              }}
              color="danger"
              variant="solid"
            >
              <div
                className="body"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                CLEAR
                <div className="space" style={{ width: "10px" }}></div>
                <UilWind />
              </div>
            </IconButton>
          </div>
          <Divider />
          <CardContent orientation="vertical">
            <div
              className="content"
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <div className="body" style={{ height: 265, overflowY: "auto" }}>
                <Typography level="title-lg">
                  {mappings.map((mapping, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      {Object.keys(mapping).map((key) => (
                        <span key={key}>
                          {key} {"<=>"} {mapping[key]}
                        </span>
                      ))}
                      <br />
                      <IconButton
                        sx={{ width: "7%" }}
                        onClick={() => {
                          setMappings(mappings.filter((_, i) => i !== index));
                        }}
                        disabled={customer == ""}
                        variant="outlined"
                        color="danger"
                      >
                        <UilMultiply />
                      </IconButton>
                    </div>
                  ))}
                </Typography>
              </div>
              <Button
                disabled={mappings.length == 0}
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
                endDecorator={<UilSave />}
              >
                SAVE MAPPING
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
