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

export default function ProductType() {
  // const navigate = useNavigate();
  const [typeCode, setTypeCode] = useState("");
  const [typeName, setTypeName] = useState("");

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
            <Typography level="title-lg">PRODUCT TYPE</Typography>
          </div>
        </div>
        <Divider />
        <CardContent orientation="vertical">
          <div className="field">
            <TextField
              sx={{ width: "100%" }}
              value={typeCode}
              onChange={(e) => {
                setTypeCode(e.target.value);
              }}
              label="Type Code"
              variant="outlined"
            >
              <MenuItem value="C1">AZAMARA</MenuItem>
            </TextField>
            <div className="space" style={{ height: "13px" }}></div>
            <TextField
              sx={{ width: "100%" }}
              value={typeName}
              onChange={(e) => {
                setTypeName(e.target.value);
              }}
              label="Type Name"
              variant="outlined"
            >
              <MenuItem value="C1">AZAMARA</MenuItem>
            </TextField>
            <div className="space" style={{ height: "13px" }}></div>
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
            ADD PRODUCT TYPE
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
