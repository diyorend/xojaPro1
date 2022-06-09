import React, { useEffect, useState } from "react";
import axios from "axios";

const CourseUpdateModal = ({ toggle, isOpen, getCourse, updatingModal }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  function handleUpdate() {
    let data = {
      name,
      description,
      price,
      duration,
    };
    axios
      .put(`http://localhost:8080/api/course/update/${updatingModal}`, data)
      .then((res) => {
        if (res.data.status) {
          console.log(res);
          console.log("Successfully updated");
          toggle();
          getCourse(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getOneCourse(updatingModal);
  }, [updatingModal]);

  function getOneCourse(id) {
    axios
      .get(`http://localhost:8080/api/course/get/${id}`)
      .then((res) => {
        console.log(res.data, "Update Modal Get one course");
        if (res.data.status) {
          setName(res.data.data.name);
          setDescription(res.data.data.description);
          setDuration(res.data.data.duration);
          setPrice(res.data.data.price);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <div isOpen={isOpen} toggle={toggle}>
        <div toggle={toggle}>Modal title</div>
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
                }}
              >
                Cancel
              </button>
              <button
                color={"danger"}
                className={"float-right mx-1"}
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseUpdateModal;
