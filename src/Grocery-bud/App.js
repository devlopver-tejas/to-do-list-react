import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {

    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};

function App() {
  const [text, setText] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [editing, setEditing] = useState(false);
  const [editID, seteditID] = useState("");
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  const onsubmitHandler = (e) => {
    e.preventDefault();
     if(!text){
 
        showAlert(true, 'danger', 'please enter value');
     }
    else if (text && editing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: text };
          }
          return item;
        })
      );
      setText("")
      setEditing(false);
    } else {
      console.log("submited");
      const newItem = { id: new Date().getTime().toString(), title: text };

      setList([...list, newItem]);
      setText("");

    }
  };

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  const handleClearbtn = () => {
    setList([]);
  };

  const handleEditbtn = (id) => {
    setEditing(true);
    const specificItem = list.find((item) => item.id === id);
    setText(specificItem.title);
    seteditID(id);
  };

  const handlDelete = (id)=>{
    const newList = list.filter((item)=>item.id != id)
    setList(newList)
  }
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);
  return (
    <>
      <section className="section-center">
      {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Grocery bud</h3>
        <form className="form-control" onSubmit={onsubmitHandler}>
  
          <input
            className="grocery"
            type="text"
            id="list-items"
            placeholder="add items here"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {editing ? "update" : "submit"}
          </button>
        </form>
        {list.length > 0 && (
          <div className="grocery-container">
            <List items={list} handleEditbtn={handleEditbtn} handlDelete={handlDelete}/>
            <button className="clear-btn" onClick={handleClearbtn}>
              clear items
            </button>
          </div>
        )}
      </section>
    </>
  );
}

export default App;
