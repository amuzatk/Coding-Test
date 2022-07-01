import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { v4 as uuid } from "uuid";

import News from "./components/News/News";
import Article from "./components/Article/Article";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";

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
