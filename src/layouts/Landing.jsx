import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import { landingMenus } from "../components/LandingMenus";
import { UilAngleRightB } from "@iconscout/react-unicons";
import { UilApps } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";
export default function Landing() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "100%",
        marginTop: "13%",
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
            <UilApps />
            <div className="space" style={{ width: "10px" }}></div>
            <Typography level="title-lg">CHOOSE AN APPLICATION</Typography>
          </div>
          <Typography
            sx={{
              padding: "10px",
              paddingInline: "40px",
              backgroundColor: "#0B6BCB",
              borderRadius: "6px",
              color: "#fff",
            }}
            level="title-lg"
          >
            MAVEKO
          </Typography>
        </div>
        <Divider />
        <CardContent orientation="vertical">
          {landingMenus.map((menu) => (
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
