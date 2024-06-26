import React, { useState } from 'react';
import './App.css';

function App() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [editValue, setEditValue] = useState("");

  function addItem() {
    if (!newItem) {
      alert("Insira um item");
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
      isCompleted: false
    };

    setItems(oldList => [...oldList, item]);
    setNewItem("");
  }

  function deleteItem(id) {
    const newArray = items.filter(item => item.id !== id);
    setItems(newArray);
  }

  function toggleComplete(id) {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    });
    setItems(updatedItems);
  }

  function editItem(id, value) {
    setEditItemId(id);
    setEditValue(value);
  }

  function saveEdit(id) {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        return { ...item, value: editValue };
      }
      return item;
    });
    setItems(updatedItems);
    setEditItemId(null);
    setEditValue("");
  }

  return (
    <div className="App">
      <h1>CRUD</h1>

      <input
        type='text'
        placeholder='Adicionar uma tarefa'
        value={newItem}
        onChange={e => setNewItem(e.target.value)}
      />

      <button onClick={addItem}>Add</button>

      <ul>
        {items.map(item => {
          return(
            <li key={item.id} className={item.isCompleted ? 'completed' : ''}>
              {editItemId === item.id ? (
                <>
                  <input
                    type='text'
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                  />
                  <button onClick={() => saveEdit(item.id)}>Salvar</button>
                </>
              ) : (
                <>
                  {item.value}
                  <button className='delete-button' onClick={() => deleteItem(item.id)}>Deletar</button>
                  <button className='complete-button' onClick={() => toggleComplete(item.id)}>
                    {item.isCompleted ? 'Desfazer' : 'Concluir'}
                  </button>
                  <button className='edit-button' onClick={() => editItem(item.id, item.value)}>Editar</button>
                </>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
