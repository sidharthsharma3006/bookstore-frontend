import React, { useState, useEffect } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  // Fetch books from backend
  useEffect(() => {
    fetch("http://localhost:8080/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error(err));
  }, []);

  // Add book
  const addBook = () => {
    fetch(`http://localhost:8080/books?title=${title}&author=${author}`, {
      method: "POST",
    })
      .then(() => {
        setBooks([...books, { title, author }]);
        setTitle("");
        setAuthor("");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ margin: "2rem" }}>
      <h1>📚 Bookstore</h1>

      <h2>Add a Book</h2>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <button onClick={addBook}>Add</button>

      <h2>Books List</h2>
      <ul>
        {books.map((b, idx) => (
          <li key={idx}>
            {b.title} by {b.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
