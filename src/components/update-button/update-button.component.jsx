import Button from "@mui/material/Button";


export const UpdateButton = ({ name, onHandleUpdate }) => {
    return (
        <Button
            sx={{
              width: "70px",
              height: "60px",
              display: "block",
              margin: "15px auto",
              borderRadius: "10px",
              fontSize: "11px",
              padding: "0px",
              fontWeight: "bold",
              position: "absolute",
              left: "36%"
            }}
            type="button"
            variant="contained"
            color="secondary"
            onClick={onHandleUpdate}
          >
            {name}
          </Button>
    )
}