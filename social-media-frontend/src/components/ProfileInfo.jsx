import React from "react";
import { useState, useEffect } from "react";

const ProfileInfo = () => {
  const [loc, setLoc] = useState("-");
  const [work, setWork] = useState("-");
  const [rel, setRel] = useState("-");
  const [edit, setEdit] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/bio");
      const data = await response.json();

      if (data) {
        setRel(data.relationshipStatus || "-");
        setLoc(data.livesIn || "-");
        setWork(data.worksAt || "-");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const triggerEdit = () => {
    return setEdit(!edit);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const info = { rel, loc, work };
    setEdit(!edit);
    console.log(info);
    try {
      const response = await fetch("http://127.0.0.1:5000/bio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });

      if (response.ok) {
        fetchData(); // Call the fetchData function to update the data after saving
      } else {
        console.error("Failed to update bio data");
      }
    } catch (error) {
      console.error("Error updating bio data:", error);
    }
  };
  //   const userData = JSON.parse(localStorage.getItem("userData"));
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3 bg-slate-200 p-4 rounded-lg w-90% shadow-md mt-3 ml-3 font-poppins">
        <div className="flex justify-between items-center">
          <h4 className="text-lg">
            <b>Bio</b>
          </h4>
        </div>
        <div className="info">
          <span>
            <b>
              Relationship Status<br></br>
            </b>
          </span>
          {edit ? (
            <span>{rel ? rel : "-"}</span>
          ) : (
            <select value={rel} onChange={(e) => setRel(e.target.value)}>
              <option value="Single">Single</option>
              <option value="In a relationship">In a Relationship</option>
              <option value="It's complicated">It's complicated</option>
              <option value="-">-</option>
            </select>
          )}
        </div>
        <div className="info">
          <span>
            <b>
              Lives in<br></br>
            </b>
          </span>
          {edit ? (
            <span>{loc ? loc : "-"}</span>
          ) : (
            <input
              type="text"
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
            />
          )}
        </div>
        <div className="info">
          <span>
            <b>
              Works at<br></br>
            </b>
          </span>
          {edit ? (
            <span>{work ? work : "-"}</span>
          ) : (
            <input
              type="text"
              value={work}
              onChange={(e) => setWork(e.target.value)}
            />
          )}
        </div>
        <div className="self-end">
          {edit ? (
            <button
              onClick={triggerEdit}
              class=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              type="button"
              class=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ProfileInfo;
