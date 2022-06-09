import { useEffect, useState } from "react";
import axios from "axios";

function User() {
  const [users, setUser] = useState([]);
  const [page, setPage] = useState(0);
  const [currentPage, setcurrentPage] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/user/?page=${page}`).then((res) => {
      if (res.data.statusCode === 200) {
        setUser(res.data.data.content);
        setPage(res.data.data.totalPages);
      }
    });
  }, []);

  async function getUser(hasNext) {
    let helper = currentPage;
    if (hasNext) helper++;
    else helper--;
    await axios
      .get(`http://localhost:8080/api/v1/user/?page=${helper}`)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setUser(res.data.data.content);
          setPage(res.data.data.totalPages);
          setcurrentPage(helper);
        }
      });
  }

  return (
    <div>
      <table className={"table"}>
        <thead>
          <tr>
            <th>#</th>
            <th>email</th>
            <th>username</th>
            <th>phone number</th>
            <th>created date</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, cnt) => {
            return (
              <tr>
                <td>{currentPage * 15 + cnt + 1}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.createdDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button className={"btn btn-primary"} onClick={() => getUser(false)}>
        prev
      </button>
      <button className={"btn btn-primary"}>{currentPage}</button>
      <button className={"btn btn-primary"} onClick={() => getUser(true)}>
        next
      </button>
    </div>
  );
}

export default User;
