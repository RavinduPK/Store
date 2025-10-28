import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoHomeOutline } from "react-icons/io5";

import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(""); 
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [joined, setJoined] = useState("Jan 2025");

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (storedProfile) {
      setProfilePic(storedProfile.profilePic);
      setFirstName(storedProfile.firstName);
      setLastName(storedProfile.lastName);
      setEmail(storedProfile.email);
      setAddress(storedProfile.address);
      setPostalCode(storedProfile.postalCode);
      setPhone1(storedProfile.phone1);
      setPhone2(storedProfile.phone2);
      setJoined(storedProfile.joined);
    } else {
      const loginEmail = localStorage.getItem("userEmail");
      if (loginEmail) setEmail(loginEmail);
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!profilePic || !firstName.trim() || !lastName.trim() || !address.trim() || !postalCode.trim() || !phone1.trim() || !phone2.trim()) {
      toast.error("All fields are required ❌");
      return;
    }

    const userProfile = {
      profilePic,
      firstName,
      lastName,
      email,
      address,
      postalCode,
      phone1,
      phone2,
      joined,
    };

    localStorage.setItem("userProfile", JSON.stringify(userProfile));
    toast.success("Profile saved successfully ✅");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative">
      <Toaster position="top-right" />

      {/* Back Button */}
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={() => navigate("/dashboard")}
          className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:scale-110 transition transform duration-300"
        >
          <IoHomeOutline className="text-xl" />
        </button>
      </div>

      {/* Profile Form */}
      <div className="flex items-center justify-center px-4 py-8">
        <form 
          onSubmit={handleSave}
          className="w-full max-w-4xl bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-6 sm:p-10"
        >
          <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-6 drop-shadow">
            My Profile
          </h2>

          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative group">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  className="h-32 w-32 sm:h-40 sm:w-40 rounded-full object-cover border-4 border-purple-300 shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="h-32 w-32 sm:h-40 sm:w-40 flex items-center justify-center rounded-full bg-purple-200 text-5xl text-white shadow-lg">
                  +
                </div>
              )}
              <input
                type="file"
                id="upload"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="upload"
                className="absolute bottom-0 right-0 bg-purple-600 text-white text-sm px-3 py-1 rounded-full cursor-pointer shadow-md hover:bg-pink-500 transition"
              >
                {profilePic ? "Change" : "Upload"}
              </label>
            </div>
            <p className="text-gray-600 text-sm mt-2">Profile Picture</p>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="flex flex-col text-gray-700 font-semibold">
              First Name
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
                required
                className="mt-1 px-4 py-2 rounded-lg border border-purple-300 focus:ring-2 focus:ring-pink-400 focus:outline-none shadow-sm"
              />
            </label>

            <label className="flex flex-col text-gray-700 font-semibold">
              Last Name
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
                required
                className="mt-1 px-4 py-2 rounded-lg border border-purple-300 focus:ring-2 focus:ring-pink-400 focus:outline-none shadow-sm"
              />
            </label>

            <label className="flex flex-col text-gray-700 font-semibold">
              Email
              <input
                type="email"
                value={email}
                disabled
                className="mt-1 px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed shadow-sm"
              />
            </label>

            <label className="flex flex-col text-gray-700 font-semibold">
              Home Address
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                required
                className="mt-1 px-4 py-2 rounded-lg border border-purple-300 focus:ring-2 focus:ring-pink-400 focus:outline-none shadow-sm"
              />
            </label>

            <label className="flex flex-col text-gray-700 font-semibold">
              Postal Code
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="Enter postal code"
                required
                className="mt-1 px-4 py-2 rounded-lg border border-purple-300 focus:ring-2 focus:ring-pink-400 focus:outline-none shadow-sm"
              />
            </label>

            <label className="flex flex-col text-gray-700 font-semibold">
              Phone Number 1
              <input
                type="tel"
                value={phone1}
                onChange={(e) => setPhone1(e.target.value)}
                placeholder="Enter primary phone"
                required
                className="mt-1 px-4 py-2 rounded-lg border border-purple-300 focus:ring-2 focus:ring-pink-400 focus:outline-none shadow-sm"
              />
            </label>

            <label className="flex flex-col text-gray-700 font-semibold">
              Phone Number 2
              <input
                type="tel"
                value={phone2}
                onChange={(e) => setPhone2(e.target.value)}
                placeholder="Enter secondary phone"
                required
                className="mt-1 px-4 py-2 rounded-lg border border-purple-300 focus:ring-2 focus:ring-pink-400 focus:outline-none shadow-sm"
              />
            </label>
          </div>

          {/* Joined Info */}
          <p className="mt-6 text-gray-600 text-center">
            <strong className="text-purple-700">Joined:</strong> {joined}
          </p>

          {/* Save Button */}
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
