import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import News from "./components/News/News";
import Article from "./components/Article/Article";
import "./App.css";

const queryClient = new QueryClient();
function App() {
  // const { data, isFetching } = useGetCurrentWeatherDataQuery("london, uk");

  // if (isFetching) return "Loading...";
  // console.log(data);

  return (
    <QueryClientProvider client={queryClient}>
      <News />
    </QueryClientProvider>
  );
}

export default App;
