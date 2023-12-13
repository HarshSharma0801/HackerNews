import Header from "./Components/Header";
import Display from "./Components/Display/Display";
import { Routes, Route } from "react-router";
import ParentItem from "./Components/Display/DisplayItem";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Display />} />
        <Route path="/item/:id" element={<ParentItem />} />
      </Routes>
    </>
  );
}

export default App;
