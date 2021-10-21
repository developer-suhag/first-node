import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState();
  const nameRef = useRef();
  const addressRef = useRef();

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const address = addressRef.current.value;
    console.log(name);

    const newUser = { name, address };

    fetch("http://localhost:5000/users", {
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const addedUser = data;
        const newUsers = [...users, addedUser];
        setUsers(newUsers);
      });

      nameRef.current.value = '';
      addressRef.current.value = '';
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" ref={nameRef} placeholder="name" />
        <input type="text" ref={addressRef} placeholder="address" />
        <input type="submit" value="Submit" />
      </form>

      <h3>uses found : {users?.length}</h3>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>{user?.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
