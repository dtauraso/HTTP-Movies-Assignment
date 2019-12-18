import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialItem = {
    title : '',
    director: '',
    metascore: '',
    stars: ''
};

const UpdateMovie = props => {
  console.log("props", props)
  const [item, setItem] = useState(initialItem);
  useEffect(() => {
      console.log("props for useEffect", props)
    const itemToEdit = props.movies.find(
      e => `${e.id}` === props.match.params.id
    );
    console.log(props.movies, "item to edit", itemToEdit);
    // prevent useEffect from racing the one in
    if (itemToEdit) {
      setItem(itemToEdit);
    }
  }, [props.movies, props.match.params.id]);

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    // if (ev.target.name === 'price') {
    //   value = parseInt(value, 10);
    // }

    setItem({
      ...item,
      [ev.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // make a PUT request to edit the item
    axios
      .put(`http://localhost:5000/api/movies/${item.id}`, item)
      .then(res => {
        // res.data ==> full array with updated item
        // usually APIs return just the updated item, or just the id of the update item - you need to make a new array with all the old items, and replace the updated item with the updated item
        // const newItemsArr = props.items.map
        console.log("updated", res)

        setItem(res.data);
        props.history.push(`/movies/${item.id}`);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
      {/* title
director
metascore
stars */}
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={item.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={item.director}
        />
        <div className="baseline" />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={item.metascore}
        />
        <div className="baseline" />

        <input
          type="number"
          name="stars"
          onChange={changeHandler}
          placeholder="Stars"
          value={item.stars}
        />


        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
