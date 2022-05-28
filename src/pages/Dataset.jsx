import Button from "@suid/material/Button";
import Container from "@suid/material/Container";
import Paper from "@suid/material/Paper";
import Stack from "@suid/material/Stack";
import Table from "@suid/material/Table";
import TableBody from "@suid/material/TableBody";
import TableCell from "@suid/material/TableCell";
import TableContainer from "@suid/material/TableContainer";
import TableHead from "@suid/material/TableHead";
import TableRow from "@suid/material/TableRow";
import Typography from "@suid/material/Typography";
import styled from "@suid/system/styled";
import { createEffect } from "solid-js";
import { useNews } from "../hooks/useNews";
import { uniqueByIdMerger } from "../util/merger";
import { createLocalSignal } from "../util/util";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  // whiteSpace: "nowrap",
  // textOverflow: "ellipsis",
  // width: "600px",
  // display: "block",
  overflow: "hidden",
  whiteSpace: "nowrap",
  maxWidth: theme.spacing(30),
}));

function enchanceDatasetRow(item) {
  return {
    ...item,
    category: "UNKNOWN",
    isPredictionCorrect: false,
  };
}

function HeaderRow() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Subreddit</TableCell>
        <TableCell>Title</TableCell>
        <TableCell>Category</TableCell>
        <TableCell>Prediction correct</TableCell>
      </TableRow>
    </TableHead>
  );
}

function NewsTableRow({ news }) {
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        r/{news.subChannel}
      </TableCell>
      <StyledTableCell>
        {news.title}
      </StyledTableCell>
      <TableCell>{news.category}</TableCell>
      <TableCell>{news.isPredictionCorrect ? "Yes" : "No"}</TableCell>
    </TableRow>
  );
}

export default function Dataset() {
  const { news, loadMore, reloadNews } = useNews();

  const [dataset, setDataset] = createLocalSignal("dataset", []);

  createEffect(() => {
    setDataset(uniqueByIdMerger(news().map(enchanceDatasetRow)));
  });

  function clearDataset() {
    reloadNews();
    setDataset([]);
  }

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Dataset
      </Typography>
      <Stack direction="row" spacing={1} sx={{ paddingBottom: 1 }}>
        <Button component="p" variant="contained" onClick={loadMore}>
          Load more
        </Button>
        <Button component="p" variant="contained" onClick={clearDataset}>
          Clear
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <HeaderRow />
          <TableBody>
            {dataset().map((news) => (
              <NewsTableRow news={news} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
