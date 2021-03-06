import Card from "@suid/material/Card";
import CardContent from "@suid/material/CardContent";
import Link from "@suid/material/Link";
import Typography from "@suid/material/Typography";
import { useTimeAgo } from "../hooks/useTimeAgo";
import SentimentScore from "./SentimentScore";

const NewsCard = ({ news, sx }) => {
  const timeAgo = useTimeAgo({ date: news.created });

  return (
    <Card sx={sx}>
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
          {timeAgo}
        </Typography>
        <SentimentScore sentiment={news.sentiment} />
      </CardContent>
    </Card>
  );
};

export default NewsCard;
