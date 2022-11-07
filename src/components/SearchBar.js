import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [query, setQuery] = useState("");
  const [query2, setQuery2] = useState("");
  const [fullTime, setFullTime] = useState("fullTime");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getUsers();
  }, [keyword, location, fullTime]);

  const getUsers = async () => {
    const response = await axios.get(
      `http://dev3.dansmultipro.co.id/api/recruitment/positions.json?description=${keyword}&location=${location}&type=${fullTime}`
    );
    setUsers(response.data);
    setPage(response.data.length);
  };

  const changePage = ({ selected }) => {
    setPage(selected);
    if (selected === page) {
      setMsg("Last Page");
    } else {
      setMsg("");
    }
  };

  const searchData = (e) => {
    e.preventDefault();
    setKeyword(query);
    setLocation(query2);
    setFullTime(fullTime);
  };

  const getName = localStorage.getItem("name");
  return (
    <div className="text-white">
      <div className="w-full">
        <div className="w-full">
          <h1 className="text-center mb-5">User: {getName}</h1>
          <form onSubmit={searchData}>
            <div className="">
              <div className="relative">
                <div className="flex gap-10">
                  <input
                    type="text"
                    className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Find title"
                  />
                  <input
                    type="text"
                    className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={query2}
                    onChange={(e) => setQuery2(e.target.value)}
                    placeholder="Find title"
                  />
                  <div class="flex items-center mb-4">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value={fullTime}
                      class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="default-checkbox"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Full Time
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="text-white right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </form>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-10">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Copmany</th>
                <th className="py-3 px-6">Location</th>
                <th className="py-3 px-6">Type</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={user.id}
                >
                  <td className="py-4 px-6">{user.title}</td>
                  <td className="py-4 px-6">{user.company}</td>
                  <td className="py-4 px-6">{user.location}</td>
                  <td className="py-4 px-6">{user.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate
            previousLabel={"< Prev"}
            nextLabel={"Next >"}
            pageCount={Math.min(2, page)}
            onPageChange={changePage}
            pageRangeDisplayed={2}
            className="flex gap-10"
          />
        </div>
      </div>
    </div>
  );
};

export default UserList;
