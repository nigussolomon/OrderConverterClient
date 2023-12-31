import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import { menus } from "./Menus";
import { UilAngleRightB } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";
export default function PLHome() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "100%",
        marginTop: "13%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card variant="outlined" sx={{ width: 520 }}>
        <CardContent orientation="vertical">
          {menus.map((menu) => (
            <Button
              onClick={() => {
                navigate(menu.path);
              }}
              key={menu.id}
              variant="solid"
              size="lg"
              color={menu.logout ? "danger" : "primary"}
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
