import TodoList from './components/TodoList';
import EditModal from "./components/EditModal";
import AddSubTaskModal from './components/AddSubtaskModal';
import useFetch from "./hooks/useFetch";
import { Routes, Route } from "react-router-dom";
import './App.scss';

const App = () => {
  const { data, setData } = useFetch('http://localhost:8000/todoData');

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/edit/:id" element={<EditModal data={data} setData={setData}/>} />
        <Route path="/add/:id" element={<AddSubTaskModal data={data} setData={setData}/>} />
      </Routes>
    </div>
  );
};

export default App;
