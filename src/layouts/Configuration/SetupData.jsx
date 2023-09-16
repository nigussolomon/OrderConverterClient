import Client from "./SetupData/Client.jsx";
import Supplier from "./SetupData/Supplier.jsx";
import UOM from "./SetupData/UOM.jsx";
import Currency from "./SetupData/Currency.jsx";
import ProductType from "./SetupData/ProductType.jsx";
import OrderSource from "./SetupData/OrderSource.jsx";
import SourceMapping from "./SetupData/SourceMapping.jsx";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/joy/IconButton";
import { UilTimesCircle } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function SetupData() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        height: "100%",
      }}
    >
      <div
        className="header"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="tabs">
          <Tabs
            orientation="horizontal"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="CLIENT" {...a11yProps(0)} />
            <Tab label="SUPPLIER" {...a11yProps(1)} />
            <Tab label="UNIT OF MEASURE" {...a11yProps(2)} />
            <Tab label="CURRENCIES" {...a11yProps(3)} />
            <Tab label="PRODUCT TYPES" {...a11yProps(4)} />
            <Tab label="ORDER SOURCE" {...a11yProps(5)} />
            <Tab label="SOURCE MAPPING" {...a11yProps(6)} />
          </Tabs>
        </div>

        <div className="actions">
          <IconButton
            onClick={() => {
              navigate("/");
            }}
            color="danger"
            variant="solid"
          >
            <UilTimesCircle />
          </IconButton>
        </div>
      </div>
      <TabPanel value={value} index={0}>
        <Client></Client>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Supplier></Supplier>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <UOM></UOM>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Currency></Currency>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ProductType></ProductType>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <OrderSource></OrderSource>
      </TabPanel>
      <TabPanel value={value} index={6}>
        <SourceMapping></SourceMapping>
      </TabPanel>
    </Box>
  );
}
