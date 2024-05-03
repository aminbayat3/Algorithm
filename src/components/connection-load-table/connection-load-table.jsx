import dayjs from "dayjs";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

import {
  StyledTableContainer,
  StyledTableRow,
  StyledTableCell,
} from "../table-style/table-styles";

import { TABLE_ELEMENT_TYPES } from "../../constants/project-constant";
import { Box } from "@mui/material";

const ConnectionLoadTable = ({ infrastructureData, setTableCLInputValues }) => {
  const { connectionLoads } = infrastructureData;
  
  const handleInputChange = (clId, target) => {
    const { name, value } = target;

    setTableCLInputValues((prev) => ({
      ...prev,
      [clId]: {
        ...prev[clId],
        [name]: value,
      },
    }));
  };

  return (
    <Box sx={{ margin: "45px", flexGrow: "1" }}>
      <StyledTableContainer component={Paper}>
        <Table size="small" sx={{ minWidth: 50 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow type={TABLE_ELEMENT_TYPES.TITLE}>
              <StyledTableCell align="center">Time</StyledTableCell>
              <StyledTableCell align="center">ConnectionLoad</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {connectionLoads.map(cl => {
                return(
                <StyledTableRow
                key={`connection-load-table-${cl.id}`}
                type={TABLE_ELEMENT_TYPES.BODY}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  sx={{ paddingBottom: "4px", paddingTop: "4px" }}
                  align="center"
                  component="th"
                  scope="row"
                >
                  {dayjs(cl.time).format('D HH:mm')}
                </TableCell>
                <TableCell
                  sx={{ paddingBottom: "4px", paddingTop: "4px" }}
                  align="center"
                >
                  <TextField
                    name="value"
                    sx={{ width: "40px", margin: "5px" }}
                    id={`standard-basic-${cl.id}`}
                    onChange={(e) => handleInputChange(cl.id, e.target)}
                    type="number"
                    defaultValue={cl.value}
                    variant="standard"
                  />
                </TableCell>
              </StyledTableRow>
                )
            })
            }
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Box>
  );
};

export default ConnectionLoadTable;
