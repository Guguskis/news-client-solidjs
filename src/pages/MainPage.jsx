import NewsCard from "../components/NewsCard";

const singleNews = {
  id: 74838,
  title:
    "What are you doing with your hard wallets? Is there anywhere to place your cold storage which insures it's value?",
  url: "https://old.reddit.com/r/CryptoCurrency/comments/ur66wa/what_are_you_doing_with_your_hard_wallets_is/",
  created: "2022-05-16T21:11:16Z",
  subChannel: "cryptocurrency",
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
