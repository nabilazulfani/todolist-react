import { useState } from "react";

import classnames from "classnames";

import Navbar from "./components/navbar";
import Container from "./components/Container";
import SearchInput from "./components/SearchInput/indx";
import Info from "./components/Info";
import Todos from "./components/Todos";

function App() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([
    { title: "Susu Ultra", count: 1 },
    { title: "Tahu Sumedang", count: 1 },
    { title: "Semangka", count: 1 },
  ]);

  //funtion Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value) {
      alert("No blank list !");
      return;
    }

    const addedTodos = [
      ...todos,
      {
        title: value,
        count: 1,
      },
    ];

    setTodos(addedTodos);
    setValue("");
  };

  //funtion penambahan count
  const handleAdditionCount = (index) => {
    const newTodos = [...todos];

    newTodos[index].count = newTodos[index].count + 1;

    setTodos(newTodos);
  };

  //funtion penguran count
  const handleAdditionCountMinus = (index) => {
    const newTodos = [...todos];

    if (newTodos[index].count > 0) {
      // Cek jumlah count masih lebih besar dari 0
      newTodos[index].count = newTodos[index].count - 1;
    } else {
      // Jika count sudah kurang dari 0 maka akan langsung terhapus
      newTodos.splice(index, 1);
    }
    setTodos(newTodos);
  };

  // Function total count
  const getTotalCoutnts = () => {
    const totalCounts = todos.reduce((total, num) => {
      return total + num.count;
    }, 0);

    return totalCounts;
  };

  return (
    <>
      <Navbar />

      <Container>
        <SearchInput
          onSubmit={handleSubmit}
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />

        <Info
          todosLength={todos.length}
          totalCounts={getTotalCoutnts()}
          onDelete={() => setTodos([])}
        />

        {todos.length > 0 ? (
          <Todos
            todos={todos}
            onSubstraction={(index) => handleAdditionCountMinus(index)}
            onAddition={(index) => handleAdditionCount(index)}
          />
        ) : (
          <div>Kosong</div>
        )}
      </Container>
    </>
  );
}

export default App;
