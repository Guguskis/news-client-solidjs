import Card from "@suid/material/Card";
import CardContent from "@suid/material/CardContent";
import Typography from "@suid/material/Typography";
import Link from "@suid/material/Link";
import createTimeAgo from "../util/createTimeAgo";

const NewsCard = ({ news, sx }) => {
  const timeAgo = createTimeAgo({ date: news.created });

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
          {timeAgo}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
