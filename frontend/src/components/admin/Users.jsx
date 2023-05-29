import { useState, useEffect, React } from "react";

import "../../styles/style.scss";
import { getUsers } from "../../services/user.service";

import Header from "../common/Header";
import User from "./User";

/**
 *
 * @returns {React.Component} Users list component
 */
const Users = () => {
  // State variable for users list
  const [users, setUsers] = useState();

  // State variable for search text
  const [search, setSearch] = useState();

  useEffect(() => {
    (async ()=>{
      const users = await getUsers();
      setUsers(users.users);
    })();
  }, []);

  /**
   * Function to handle the search bar
   * @returns users list according to the search text
   */
  const handleSearch = () => {
    if (search == null) {
      return users;
    }

    return users.filter((user) =>
      user.username.toLowerCase().includes(search.trim())
    );
  };

  return (
    <>
     <Header></Header>
      <div className="container bookList">
        <h3 className="my-3">Users</h3>
        <div className="components">
          <input
            className="searchBar"
            placeholder="Search user..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <table className="usersTable">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Number of donations</th>
            </tr>
          </thead>
          <tbody>
            {handleSearch() &&
              handleSearch().map((user) => {
                return <User user={user} key={user._id} />;
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
