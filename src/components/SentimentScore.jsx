import RecommendIcon from "@suid/icons-material/Recommend";
import Stack from "@suid/material/Stack";
import Typography from "@suid/material/Typography";
import { mergeProps } from "solid-js";

export default function SentimentScore({ sentiment }) {
  if (!sentiment) return;

  function Icon({ sx }) {
    switch (sentiment.sentiment) {
      case "POSITIVE":
        return <RecommendIcon sx={sx} color="success" />;
        break;
      case "NEGATIVE":
        return (
          <RecommendIcon
            color="error"
            sx={mergeProps({ transform: "scaleY(-1)" }, sx)}
          />
        );
        break;
    }
  }

  function Score({ sx }) {
    switch (sentiment.sentiment) {
      case "POSITIVE":
        return (
          <Typography sx={sx} variant="caption">
            {sentiment.scorePositive}%
          </Typography>
        );
        break;
      case "NEGATIVE":
        return (
          <Typography sx={sx} variant="caption">
            {sentiment.scoreNegative}%
          </Typography>
        );
        break;
    }
  }

  return (
    <Stack direction="row" spacing={1}>
      <Icon />
      <Score sx={{ paddingTop: 0.25, fontWeight: "bold" }} />
    </Stack>
  );
}
