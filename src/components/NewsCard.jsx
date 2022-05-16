import Card from "@suid/material/Card";
import CardContent from "@suid/material/CardContent";
import Typography from "@suid/material/Typography";
import Link from "@suid/material/Link";

const NewsCard = ({ news, sx }) => {
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
          {/* <ReactTimeAgo date={news.created} locale="en-US" /> */}
          5h ago
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
