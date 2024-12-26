import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../api/userApi/api";

function ProfileCom({ theme }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("id"); // Récupère l'ID utilisateur
    if (storedUserId) {
      getUserById(parseInt(storedUserId)) // S'assure que l'ID est converti en entier
        .then((response) => {
          setUserData(response.data); // Définit les données utilisateur
        })
        .catch((error) => {
          console.error("Failed to fetch user data", error);
        });
    } else {
      console.error("No user ID found in localStorage");
    }
  }, []);

  return (
    <div
      className={`${
        theme === "dark" ? "bg-black" : "bg-white"
      } w-4/5 h-auto shadow-md rounded-3xl overflow-hidden flex flex-col items-center justify-center text-black dark:text-white p-5`}
    >
      {userData ? (
        <>
          {/* Image de profil avec image par défaut */}
          <img
            src={userData.profilePhotoUrl || "https://images.freeimages.com/fic/images/icons/2526/bloggers/256/admin.png"}
            alt="Profile"
            className="w-full h-56 object-cover rounded-md mb-4"
          />

          {/* Informations utilisateur */}
          <div className="text-center">
            <h2 className="text-lg font-semibold">{userData.username}</h2>
            <p className="text-sm text-gray-500">{userData.email}</p>
          </div>

          {/* Longueur des followers et following */}
          <div className="mt-4 flex gap-5">
            <div className="text-center">
              <p className="text-lg font-bold">{userData.followers.length}</p>
              <p className="text-sm text-gray-500">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">{userData.following.length}</p>
              <p className="text-sm text-gray-500">Following</p>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p> // État de chargement si les données ne sont pas encore disponibles
      )}
    </div>
  );
}

export default ProfileCom;
