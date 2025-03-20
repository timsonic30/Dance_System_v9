"use client";
import { useState, useEffect } from "react";
import Loading from "@/app/components/loading";

export default function Information() {
  const [username, setUserName] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [point, setPoint] = useState(null);
  const [instagram, setInstagram] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [style, setStyle] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const handleEdit = (field) => {
    setEditField(field);
    setEditValue(
      field === "username"
        ? username
        : field === "dateOfBirth"
        ? dateOfBirth
        : field === "gender"
        ? gender
        : field === "email"
        ? email
        : field === "phone"
        ? phone
        : ""
    );
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    console.log(editValue, editField);
    try {
      const res = await fetch("http://localhost:3030/teacher/edit", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          editField,
          editValue,
        }),
      });

      if (!res.ok) {
        throw new Error("Server Error");
      }

      editField === "username"
        ? setUserName(editValue)
        : editField === "dateOfBirth"
        ? setDateOfBirth(editValue)
        : editField === "gender"
        ? setGender(editValue)
        : editField === "email"
        ? setEmail(editValue)
        : editField === "phone"
        ? setPhone(editValue)
        : "";
    } catch (err) {
      console.log(err.message);
    }

    setIsModalOpen(false);
    setEditField(null);
    setEditValue("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const renderFieldInput = () => {
    switch (editField) {
      case "username":
        return (
          <input
            type="text"
            value={editValue || ""}
            onChange={(e) => setEditValue(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter your username"
          />
        );
      case "dateOfBirth":
        return (
          <input
            type="text"
            value={editValue || ""}
            onChange={(e) => setEditValue(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter your birthday"
          />
        );
      case "gender":
        return (
          <select
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        );
      case "email":
        return (
          <input
            type="email"
            value={editValue || ""}
            onChange={(e) => setEditValue(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter your email"
          />
        );
      case "phone":
        return (
          <input
            type="tel"
            value={editValue || ""}
            onChange={(e) => setEditValue(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter your phone number"
          />
        );
      default:
        return null;
    }
  };

  // Starting
  useEffect(() => {
    const token = localStorage.getItem("token");

    async function fetchUser() {
      try {
        const res = await fetch("http://localhost:3030/teacher/information", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
          // body: JSON.stringify({
          //   objectId: "67d3eb571cc1f316f7a27482",
          // }),
        });

        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await res.json();
        setUserName(data.username);
        setDateOfBirth(data.birthday);
        setGender(data.gender);
        setEmail(data.email);
        setPhone(data.phone);
        setPoint(data.point);
        setInstagram(data.instagram);
        setNickname(data.nickname);
        setStyle(data.style);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    }
    // dummy code
    async function getUser() {
      try {
        const res = await fetch("http://localhost:3030/teacher/reg", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: "Mary",
            phone: "98788888",
            email: "ade@gmail.com",
            password: Ab12,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await res.json();
        console.log("Teacher register OK");
      } catch (err) {
        console.log(err.message);
      }
    }

    // getUser();
    fetchUser();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full max-w-2xl mx-auto p-4 space-y-4 border-amber-2">
          {/* Basic Information */}
          <div className="bg-white rounded-lg p-6 border-2 border-gray-400">
            <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
            <div className="flex items-center justify-center mb-4 p-4 border-b-2 border-gray-300">
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center border-b-2 border-gray-300 pb-4 pl-3 pr-3">
                <span className="w-28">Username:</span>
                <span className="flex-grow px-4">
                  {username ? username : "Not yet set"}
                </span>
                <button
                  className="btn btn-sm normal-case bg-gray-500 hover:bg-gray-600 text-white border-none rounded-xl"
                  onClick={() => handleEdit("username")}
                >
                  Edit
                </button>
              </div>

              <div className="flex items-center border-b-2 border-gray-300 pb-4 pl-3 pr-3">
                <span className="w-28">Date of Birth:</span>
                <span className="flex-grow px-4">
                  {dateOfBirth ? dateOfBirth : "Not yet set"}
                </span>
                <button
                  className="btn btn-sm normal-case bg-gray-500 hover:bg-gray-600 text-white border-none rounded-xl"
                  onClick={() => handleEdit("dateOfBirth")}
                >
                  Edit
                </button>
              </div>

              <div className="flex items-center border-b-2 border-gray-300 pb-4 pl-3 pr-3">
                <span className="w-28">Gender:</span>
                <span className="flex-grow px-4">
                  {gender ? gender : "Not yet set"}
                </span>
                <button
                  className="btn btn-sm normal-case bg-gray-500 hover:bg-gray-600 text-white border-none rounded-xl"
                  onClick={() => handleEdit("gender")}
                >
                  Edit
                </button>
              </div>

              <div className="flex items-center border-b-2 border-gray-300 pb-4 pl-3 pr-3">
                <span className="w-28">Nick Name:</span>
                <span className="flex-grow px-4">
                  {nickname ? nickname : "Not yet set"}
                </span>
                <button
                  className="btn btn-sm normal-case bg-gray-500 hover:bg-gray-600 text-white border-none rounded-xl"
                  onClick={() => handleEdit("nickname")}
                >
                  Edit
                </button>
              </div>

              <div className="flex items-center pb-2 pl-3 pr-3">
                <span className="w-28">Dance Style:</span>
                <span className="flex-grow px-4">
                  {style ? style : "No data"}
                </span>
                <button
                  className="btn btn-sm normal-case bg-gray-500 hover:bg-gray-600 text-white border-none rounded-xl"
                  onClick={() => handleEdit("style")}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg p-6 border-2 border-gray-400">
            <h2 className="text-xl font-semibold mb-6 border-b-2 border-gray-300 pb-2">
              Contact Information
            </h2>
            <div className="space-y-6">
              <div className="flex items-center border-b-2 border-gray-300 pb-4 pl-3 pr-3">
                <span className="w-28">Email:</span>
                <span className="flex-grow px-4">
                  {email ? email : "Not yet set"}
                </span>
                <button
                  className="btn btn-sm normal-case bg-gray-500 hover:bg-gray-600 text-white border-none rounded-xl"
                  onClick={() => handleEdit("email")}
                >
                  Edit
                </button>
              </div>

              <div className="flex items-center border-b-2 border-gray-300 pb-4 pl-3 pr-3">
                <span className="w-28">Phone:</span>
                <span className="flex-grow px-4">
                  {phone ? phone : "Not yet set"}
                </span>
                <button
                  className="btn btn-sm normal-case bg-gray-500 hover:bg-gray-600 text-white border-none rounded-xl"
                  onClick={() => handleEdit("phone")}
                >
                  Edit
                </button>
              </div>

              <div className="flex items-center pb-2 pl-3 pr-3">
                <span className="w-28">IG:</span>
                <span className="flex-grow px-4">
                  {instagram ? instagram : "Not yet set"}
                </span>
                <button
                  className="btn btn-sm normal-case bg-gray-500 hover:bg-gray-600 text-white border-none rounded-xl"
                  onClick={() => handleEdit("instagram")}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>

          {/* Purchase Rewards */}
          <div className="bg-white rounded-lg p-6 border-2 border-gray-400">
            <h2 className="text-xl font-semibold mb-6 border-b-2 border-gray-300 pb-2">
              Purchase Rewards
            </h2>
            <div className="space-y-6">
              <div className="flex items-center border-b-2 border-gray-300 pb-4 pl-3 pr-3">
                <span className="w-28">Reward Points:</span>
                <span className="flex-grow px-4">{point ? point : 0}</span>
                <span className="text-gray-500">1 Point = $1</span>
              </div>

              <div className="flex items-center pb-2 pl-3">
                <span className="w-28">Special Tags:</span>
                {/* <div className="flex flex-col px-4 gap-3 flex-grow">
                  {userData.tags.map((tag, index) => (
                    <div
                      key={index}
                      className={`${tag.color} text-white px-4 py-2 rounded-full flex items-center gap-2 justify-between w-full`}
                    >
                      <span>{tag.name}</span>
                      <span className="text-sm">Level: {tag.level}</span>
                    </div>
                  ))}
                </div> */}
              </div>
            </div>
          </div>

          {/* Modal for Editing */}
          {isModalOpen && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-lg">
                <h3 className="text-lg font-semibold mb-4">
                  Edit{" "}
                  {editField === "dateOfBirth"
                    ? "Birthday"
                    : editField === "style"
                    ? "Dance Style"
                    : editField}
                </h3>
                {renderFieldInput()}
                <div className="flex justify-end mt-4">
                  <button
                    className="btn btn-sm bg-gray-500 hover:bg-gray-600 text-white rounded mr-2"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white rounded"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
