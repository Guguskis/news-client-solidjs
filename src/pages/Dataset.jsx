import Container from "@suid/material/Container";
import Paper from "@suid/material/Paper";
import Table from "@suid/material/Table";
import TableBody from "@suid/material/TableBody";
import TableCell from "@suid/material/TableCell";
import TableContainer from "@suid/material/TableContainer";
import TableHead from "@suid/material/TableHead";
import TableRow from "@suid/material/TableRow";
import Typography from "@suid/material/Typography";
import { useNews } from "../hooks/useNews";

export default function Dataset() {
  const { news } = useNews();

  return (
    <Container>
      <Typography variant="h4">News dataset</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Subreddit</TableCell>
              <TableCell align="right">Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {news().map((row) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                r/{row.subChannel}
                </TableCell>
                <TableCell align="right" sx={{maxWidth: "100px"}}>{row.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
