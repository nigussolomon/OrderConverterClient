import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const renderTextField = (field) =>
  field.options ? (
    <TextField
      key={field.label}
      select
      disabled={field.disabled ? field.disabled : false}
      value={field.value}
      style={{
        width: field.width ? field.width : "400px",
        marginBottom: "15px",
      }}
      label={field.label}
      variant="outlined"
      onChange={(e) => field.change(e.target.value)}
    >
      {field.options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  ) : field.date ? (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        disabled={
          field.disabled
            ? field.disabled
            : field.value == undefined
            ? false
            : field.label == "Expected Date"
            ? false
            : true
        }
        label={field.label}
        value={field.value}
        onChange={(newValue) => {
          field.change ? field.change(newValue) : null;
        }}
      ></DatePicker>
    </LocalizationProvider>
  ) : (
    <TextField
      disabled={field.disabled ? field.disabled : false}
      focused={field.value == "" ? true : false}
      value={field.value}
      style={{
        width: field.width ? field.width : "400px",
        marginBottom: "15px",
      }}
      label={field.label}
      variant="outlined"
      onChange={(e) => (field.change ? field.change(e.target.value) : null)}
    />
  );
