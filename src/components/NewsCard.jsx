import Card from "@suid/material/Card";
import CardContent from "@suid/material/CardContent";
import Typography from "@suid/material/Typography";
import Link from "@suid/material/Link";
import TimeAgo from 'javascript-time-ago'
import { createSignal } from "solid-js";

const NewsCard = ({ news, sx }) => {
  const [timeAgo] = createSignal(new TimeAgo())

  return (
    <Card>
      <CardContent sx={{ flexDirection: "column", display: "flex" }}>
        <Link
          variant="h5"
          href={news.url}
          target="_blank"
          underline="none"
          rel="noopener"
        >
          {news.title}
        </Link>
        <Typography color="text.secondary">
          {news.channel === "REDDIT" ? "r/" + news.subChannel : news.subChannel}
        </Typography>
        <Typography variant="caption" sx={{ mb: 1.5 }} color="text.secondary">
          {timeAgo().format(Date.parse(news.created))}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
