import React from "react";

function UserModal({ isOpen, onClose, user }) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-3/4 max-w-lg rounded-lg p-6 relative">
        <button
          className="absolute top-3 right-3 text-red-500 font-bold"
          onClick={onClose}
        >
          X
        </button>
        <img
          src={user.profilePhotoUrl || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
        <h2 className="text-xl font-bold">{user.username}</h2>
        <p className="text-gray-600">{user.email}</p>
        <div className="flex gap-5 mt-4">
          <div className="text-center">
            <p className="text-lg font-bold">{user.followers.length}</p>
            <p className="text-sm text-gray-500">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">{user.following.length}</p>
            <p className="text-sm text-gray-500">Following</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserModal;
