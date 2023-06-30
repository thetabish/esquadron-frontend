import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProfileInfo = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { viewedProfileId } = useParams();
  const userId = userData.id;
  const [loc, setLoc] = useState("-");
  const [work, setWork] = useState("-");
  const [rel, setRel] = useState("-");
  const [edu, setEdu] = useState("-");
  const [gender, setGender] = useState("-");
  const [maritalStatus, setMaritalStatus] = useState("-");
  const [interestedInDating, setInterestedInDating] = useState("-");
  const [sexualOrientation, setSexualOrientation] = useState("-");
  const [edit, setEdit] = useState(true);
  
  useEffect(() => {
    fetchData();
  }, [viewedProfileId]);

  const fetchData = async () => {
    try {
      setLoc(userData.country + ", " + userData.city);
      const url = `http://127.0.0.1:5000/bio?user_id=${parseInt(
        viewedProfileId,
        10
      )}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if(data.message == 'not found'){
        setRel("-");
        setLoc( "-");
        setWork( "-");
        setEdu( "-");
        setGender("-");
        setMaritalStatus("-");
        setInterestedInDating("-");
        setSexualOrientation("-");
      }

      if (data) {
        setRel(data.relationship_status || "-");
        setLoc(data.lives_in || "-");
        setWork(data.works_at || "-");
        setEdu(data.education || "-");
        setGender(data.gender || "-");
        setMaritalStatus(data.marital_status || "-");
        setInterestedInDating(data.interested_in_dating || "-");
        setSexualOrientation(data.sexual_orientation || "-");
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
    let id = userData.id;
    const info = {
      id,
      rel,
      loc,
      work,
      edu,
      gender,
      maritalStatus,
      interestedInDating,
      sexualOrientation,
    };
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

  const isCurrentUser = parseInt(viewedProfileId) === userId;
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
            <>
            <span>{work ? work : "-"}</span>
            </>
          ) : (
            <div>
              <input
                type="text"
                value={work}
                onChange={(e) => setWork(e.target.value)}
                className="mt-2"
              />
            </div>
          )}
        </div>
        <div className="info">
          <span>
            <b>
              Education<br></br>
            </b>
          </span>
          {edit ? (
            <span>{edu ? edu : "-"}</span>
          ) : (
            <div>
              <input
                type="text"
                value={edu}
                onChange={(e) => setEdu(e.target.value)}
              />
            </div>
          )}
        </div>
        <div className="info">
          <span>
            <b>Gender:</b>
          </span>
          {edit ? (
            <span>{gender ? gender : "-"}</span>
          ) : (
            <div>
              <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
          )}
        </div>
        <div className="info">
          <span>
            <b>Marital Status:</b>
          </span>
          {edit ? (
            <span>{maritalStatus ? maritalStatus : "-"}</span>
          ) : (
            <div>
              <input
                type="text"
                value={maritalStatus}
                onChange={(e) => setMaritalStatus(e.target.value)}
              />
            </div>
          )}
        </div>
        <div className="info">
          <span>
            <b>Interested in dating?:</b>
          </span>
          {edit ? (
            <span>{interestedInDating ? interestedInDating : "-"}</span>
          ) : (
            <div>
              <input
                type="text"
                value={interestedInDating}
                onChange={(e) => setInterestedInDating(e.target.value)}
              />
            </div>
          )}
        </div>
        <div className="info">
          <span>
            <b>Sexual Orientation:</b>
          </span>
          {edit ? (
            <span>{sexualOrientation ? sexualOrientation : "-"}</span>
          ) : (
            <div>
              <input
                type="text"
                value={sexualOrientation}
                onChange={(e) => setSexualOrientation(e.target.value)}
              />
            </div>
          )}
        </div>
        <div className="self-end">
        {isCurrentUser && edit ? (
            <button
              onClick={triggerEdit}
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Edit
            </button>
          ) : null}
          {isCurrentUser && !edit ? (
            <button
              onClick={handleSubmit}
              type="submit"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Done
            </button>
          ) : null}
        </div>
      </div>
    </form>
  );
};

export default ProfileInfo;
