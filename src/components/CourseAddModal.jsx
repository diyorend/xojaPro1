import React, { useState } from "react";
import axios from "axios";

const CourseAddModal = ({ toggle, isOpen, getCourse }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  function handleSubmit() {
    let data = {
      name,
      description,
      price,
      duration,
    };

    axios
      .post("http://localhost:8080/api/course/add", data)
      .then((res) => {
        console.log(res);
        toggle();
        clearInput();
        getCourse(0);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function clearInput() {
    setName("");
    setDescription("");
    setPrice(0);
    setDuration(0);
  }

  return (
    <div>
      <div isOpen={isOpen} toggle={toggle}>
        <h3>Modal title</h3>
        <div>
          <form>
            <div>
              <label for="courseName">Name</label>
              <input
                type="text"
                name="name"
                id="courseName"
                placeholder="Enter a course name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
              />
            </div>
            <div>
              <label for="courseDescription">Description</label>
              <input
                type="textarea"
                name="description"
                id="courseDescription"
                placeholder="Enter a course description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                value={description}
              />
            </div>
            <div>
              <label for="coursePrice">Price</label>
              <input
                type="number"
                name="price"
                id="coursePrice"
                placeholder="Enter a course price"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                value={price}
              />
            </div>
            <div>
              <label for="courseDuration">Duration</label>
              <input
                type="number"
                name="duration"
                id="courseDuration"
                placeholder="Enter a course duration"
                onChange={(e) => {
                  setDuration(e.target.value);
                }}
                value={duration}
              />
            </div>
            <div sm={{ size: 8, offset: 8 }}>
              <button
                color="secondary"
                onClick={() => {
                  toggle();
                  clearInput();
                }}
              >
                Cancel
              </button>
              <button
                color={"danger"}
                className={"float-right mx-1"}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseAddModal;
