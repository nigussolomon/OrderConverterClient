/* eslint-disable react/prop-types */
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/material/Typography";
import { UilTimesCircle } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";

export default function NavBar({ title }) {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar
        position="static"
        sx={{
          borderRadius: "2px",
          background: "#fff",
          color: "#000",
          boxShadow: 0,
          borderBottom: "1px solid #ccc",
          mb: 1.5,
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, fontWeight: 900 }}
          >
            {title}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              onClick={() => {
                navigate("/");
              }}
              color="danger"
              variant="solid"
            >
              <UilTimesCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}></Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
