import TableCell from "@suid/material/TableCell";
import styled from "@suid/system/styled";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  // whiteSpace: "nowrap",
  // textOverflow: "ellipsis",
  // width: "600px",
  // display: "block",
  overflow: "hidden",
  whiteSpace: "nowrap",
  maxWidth: theme.spacing(30),
}));

export { StyledTableCell };

