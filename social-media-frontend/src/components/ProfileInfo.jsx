import React, { useState, useEffect } from "react";

function ProfileInfo() {
  const [loc, setLoc] = useState("-");
  const [work, setWork] = useState("-");
  const [rel, setRel] = useState("-");
  const [edit, setEdit] = useState(true);
  const [bio, setBio] = useState(null);

  const triggerEdit = () => {
    return setEdit(!edit);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEdit(!edit);

    const updatedFields = {};
    if (loc.trim() !== "") {
      updatedFields.loc = loc;
    }
    if (work.trim() !== "") {
      updatedFields.work = work;
    }

    fetch(`http://127.0.0.1:5000/bio/1`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        rel: rel,
        work: work,
        loc: loc,
        id: 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Handle the response from the backend if needed
      });
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/bio`)
      .then((res) => res.json())
      .then((data) => {
        setBio(data.bio[0]);
      });
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      {bio && (
        <div className="flex flex-col gap-3 bg-slate-200 p-4 rounded-lg w-90% shadow-md mt-3 ml-3 font-poppins">
          <div className="flex justify-between items-center cursor-pointer">
            <h4 className="text-lg">
              <b>Bio</b>
            </h4>
          </div>
          <div className="bio" key={bio.id}>
            <div className="info">
              <span>
                <b>Relationship Status</b>
              </span>
              {edit ? (
                <span>{bio.rel}</span>
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
                <b>Lives in</b>
              </span>
              {edit ? (
                <span>{bio.loc}</span>
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
                <b>Works at</b>
              </span>
              {edit ? (
                <span>{bio.work}</span>
              ) : (
                <input
                  type="text"
                  value={work}
                  onChange={(e) => setWork(e.target.value)}
                />
              )}
            </div>
          </div>
          <div className="self-end">
            {edit ? (
              <button
                onClick={triggerEdit}
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Done
              </button>
            )}
          </div>
        </div>
      )}
    </form>
  );
}

export default ProfileInfo;
