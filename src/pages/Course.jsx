import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseAddModal from "../components/CourseAddModal";
import CourseUpdateModal from "../components/CourseUpdateModal";
import styled from "styled-components";
import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(0);
  const [currentPage, setcurrentPage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updatingModal, setUpdatingModal] = useState("");
  const [search, setSearch] = useState("");

  const onSearch = (value) => {
    setSearch(value);

    axios
      .get(`http://localhost:8080/api/course/get?name=${value}`)
      .then((res) => {
        if (res.data.status) {
          console.log(res.data.data);
          setCourses([
            {
              ...res.data.data,
            },
          ]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function toggle(id) {
    setUpdatingModal(id);
    setModalOpen(!modalOpen);
  }

  useEffect(() => {
    axios.get("http://localhost:8080/api/course/list/").then((res) => {
      if (res.data.status) {
        setCourses(res.data.data.content);
        setPage(res.data.data.totalPages);
      }
    });
  }, []);

  function getCourse(hasNext) {
    let helper = currentPage;
    if (hasNext === 1) helper++;
    else if (hasNext === -1) helper--;
    axios
      .get(`http://localhost:8080/api/course/list/?page=${helper}`)
      .then((res) => {
        if (res.data.status) {
          setCourses(res.data.data.content);
          setPage(res.data.data.totalPages);
          setcurrentPage(helper);
        }
      });
  }

  // 1 = true, -1 = false, 0 = nothing
  function deleteCourse(id) {
    axios
      .delete(`http://localhost:8080/api/course/delete/${id}`)
      .then((res) => {
        if (res.status === 204) {
          alert("Deleted");
          getCourse(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function toggleUpdate(id) {
    setUpdatingModal(id);
    setUpdateModalOpen(!updateModalOpen);
  }

  return (
    <div>
      <Row>
        <Column>
          <button color="success" onClick={() => toggle()}>
            + Add Course
          </button>
        </Column>
        <Column sm={{ size: 1, offset: 4 }}>
          {search && (
            <button
              color="link"
              onClick={() => {
                getCourse(0);
                setSearch("");
              }}
            >
              Clear
            </button>
          )}
        </Column>
        <Column sm={4}>
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
          />
          {/*onChange={(e) => setSearch(e.target.value)}*/}
        </Column>
      </Row>

      <table className={"table mt-4"}>
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>description</th>
            <th>price</th>
            <th>duration</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, cnt) => {
            return (
              <tr key={course.id}>
                <td>{course.id}</td>
                {/*((currentPage * 15)) + cnt + 1 */}
                <td>{course.name}</td>
                <td>{course.description}</td>
                <td>{course.price}</td>
                <td>{course.duration}</td>
                <td>
                  <button
                    color="danger"
                    onClick={() => deleteCourse(course.id)}
                  >
                    Delete
                  </button>
                  <button
                    color="secondary"
                    className="m-1"
                    onClick={() => toggleUpdate(course.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button
        disabled={currentPage === 0}
        className={"btn btn-primary"}
        onClick={() => getCourse(-1)}
      >
        prev
      </button>
      <button className={"btn btn-primary m-2"}>{currentPage}</button>
      <button
        disabled={currentPage === page - 1}
        className={"btn btn-primary"}
        onClick={() => getCourse(1)}
      >
        next
      </button>

      <CourseAddModal
        isOpen={modalOpen}
        toggle={toggle}
        getCourse={getCourse}
      />
      <CourseUpdateModal
        isOpen={updateModalOpen}
        toggle={toggleUpdate}
        updatingModal={updatingModal}
        getCourse={getCourse}
      />
    </div>
  );
};

const Row = styled.div``;
const Column = styled.div``;

export default Course;
