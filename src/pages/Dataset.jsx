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

function TableHeader() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Subreddit</TableCell>
        <TableCell>Title</TableCell>
        <TableCell>Category</TableCell>
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
    </TableRow>
  );
}

export default function Dataset() {
  const { news, loadMore } = useNews();

  const [dataset, setDataset] = createLocalSignal("dataset", []);

  createEffect(() => {
    console.log(news());
    setDataset(uniqueByIdMerger(news().map(enchanceDatasetRow)));
  });

  function enchanceDatasetRow(item) {
    return {
      ...item,
      category: "UNKNOWN",
    };
  }

  return (
    <Container>
      <Typography variant="h4">News dataset</Typography>
      <Stack direction="row" sx={{ paddingBottom: 1, paddingTop: 1 }}>
        <Button component="p" variant="contained" onClick={loadMore}>
          Load more
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
