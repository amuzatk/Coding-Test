import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import News from "./components/News/News";
import Article from "./components/Article/Article";
import NavBar from "./components/NavBar/NavBar";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<News />} />
          <Route path="/article/:uuid" element={<Article />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
