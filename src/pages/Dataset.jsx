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
import { createEffect } from "solid-js";
import { useNews } from "../hooks/useNews";
import { uniqueByIdMerger } from "../util/merger";
import { createLocalSignal } from "../util/util";

function enchanceDatasetRow(item) {
  return {
    ...item,
    category: "UNKNOWN",
    isPredictionCorrect: false,
  };
}

function TableHeader() {
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

function NewsTableCell({ news }) {
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        r/{news.subChannel}
      </TableCell>
      <TableCell sx={{ maxWidth: "150px" }}>{news.title}</TableCell>
      <TableCell>{news.category}</TableCell>
      <TableCell>{news.isPredictionCorrect ? "Yes" : "No"}</TableCell>
    </TableRow>
  );
}

export default function Dataset() {
  const { news, loadMore, resetQuery } = useNews();

  const [dataset, setDataset] = createLocalSignal("dataset", []);

  createEffect(() => {
    setDataset(uniqueByIdMerger(news().map(enchanceDatasetRow)));
  });

  function clearDataset() {
    resetQuery();
    setDataset([]);
  }

  return (
    <Container>
      <Typography variant="h3" gutterBottom >Dataset</Typography>
      <Stack direction="row" spacing={1} sx={{ paddingBottom: 1}} >
        <Button component="p" variant="contained" onClick={loadMore}>
          Load more
        </Button>
        <Button component="p" variant="contained" onClick={clearDataset}>
          Clear
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHeader />
          <TableBody>
            {dataset().map((news) => (
              <NewsTableCell news={news} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
