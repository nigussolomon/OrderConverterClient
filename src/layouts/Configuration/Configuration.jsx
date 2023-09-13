import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import { configurationMenus } from "../../components/ConfigurationMenus";
import { UilAngleRightB } from "@iconscout/react-unicons";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";
import { UilSlidersV } from "@iconscout/react-unicons";
import IconButton from "@mui/joy/IconButton";
export default function Configuration() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "98vw",
        height: "98vh",
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
            <UilSlidersV />
            <div className="space" style={{ width: "10px" }}></div>
            <Typography level="title-lg">SYSTEM CONFIGURATION</Typography>
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
          {configurationMenus.map((menu) => (
            <Button
              onClick={() => navigate(menu.path)}
              key={menu.id}
              variant="solid"
              size="lg"
              color="primary"
              disabled={menu.disabled}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                fontWeight: 600,
                width: "100%",
                padding: "20px",
              }}
              endDecorator={<UilAngleRightB />}
            >
              <div
                className="content"
                style={{ display: "flex", alignItems: "center" }}
              >
                {menu.icon}
                <div className="space" style={{ width: "20px" }}></div>
                {menu.title}
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
