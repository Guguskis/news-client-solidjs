import NewsCard from "../components/NewsCard";

const singleNews = {
  id: 74654,
  title:
    "Fascinating description of the communication history in a war zone. Dear Mods -please leave it up for a while. Patron has friends in the sky if needed.",
  url: "https://old.reddit.com/r/ukraine/comments/ur19np/fascinating_description_of_the_communication/",
  created: "2022-05-16T17:28:58Z",
  subChannel: "ukraine",
  channel: "REDDIT",
};

const news = [];
for (let i = 0; i < 100; i++) {
  news.push(singleNews);
}

function MainPage() {
  const newsList = [];

  return (
    <div>
      {news.map((news, index) => (
        <NewsCard news={news} key={index} />
      ))}
    </div>
  );
}

export default MainPage;
