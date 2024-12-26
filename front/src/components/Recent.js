import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import styled from "styled-components";
import { getAllUsers, followUser } from "../api/userApi/api";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify'; // Importer toast
import "react-toastify/dist/ReactToastify.css";  // Import des styles nécessaires

const PostContainer = styled.div`
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  transition: all 0.4s ease;
  padding: 20px;
  border-radius: 10px;
`;

const ActivityContainer = styled.div`
  width: 75%;
  margin: 20px 0;
  background: ${({ theme }) => theme.cardBackground};
  box-shadow: ${({ theme }) => theme.shadow};
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ActivityItem = styled.span`
  width: 100%;
  height: 64px;
  background: ${({ theme }) => theme.itemBackground};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow};
  margin: 8px 0;
  display: flex;
  flex-direction: column;
`;

const ActivityContent = styled.span`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 8px;
`;

function Recent() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]); // Initialisation par défaut avec un tableau vide
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true); // État pour gérer le chargement
  const [error, setError] = useState(null); // État pour gérer les erreurs

  // Charger les utilisateurs depuis l'API
  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (userId) {
      setCurrentUserId(userId);  // Ne mettez à jour `currentUserId` qu'une seule fois
    }
  }, []);  // Le tableau vide signifie que cet effet se déclenche une seule fois lors du montage du composant

  useEffect(() => {
    if (currentUserId) {
      async function fetchUsers() {
        try {
          const response = await getAllUsers(parseInt(currentUserId));
          if (response.status === 200) {
            setUsers(response.data); 
          } else {
            setError("Failed to fetch users");
          }
        } catch (error) {
          console.error("Error fetching users:", error);
          setError("Error fetching users");
        } finally {
          setLoading(false);
        }
      }

      fetchUsers();
    }
  }, [currentUserId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Correction de la définition de handleAddFollow
  const handleAddFollow = (userId, user2Id) => {
    followUser(userId, user2Id)
      .then(() => {
        // Afficher un toast de confirmation
        toast.success('Follow successful!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        });

        // Recharger la page ou rediriger vers la page actuelle
        window.location.reload();
        // Si vous préférez utiliser `navigate` pour recharger la page :
        // navigate(0);  // Cette ligne recharge la page actuelle
      })
      .catch((error) => {
        toast.error('Follow failed, please try again.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        });
        console.error("Error following user:", error);
      });
  };

  return (
    <PostContainer className="w-full max-w-4xl mx-auto p-4">
      <ActivityContainer>
        <span className="w-full font-bold text-xl sm:text-lg md:text-xl lg:text-2xl flex items-start justify-start overflow-y-auto my-2">
          Suggestions
        </span>

        {/* Liste dynamique des utilisateurs */}
        <div className="flex flex-col w-full">
          {users
            .filter((user) => user.id !== parseInt(currentUserId))
            .map((user) => (
              <ActivityItem key={user.id} className="sm:w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto">
                <ActivityContent className="flex flex-col sm:flex-row md:flex-row lg:flex-row items-center justify-between">
                  <img
                    src={user.profilePhotoUrl || "https://via.placeholder.com/40"}
                    alt={user.username}
                    className="w-12 h-12 sm:w-10 sm:h-10 border-2 border-gray-300 mx-1 rounded-lg cursor-pointer"
                    onClick={() => navigate(`userProfile/${user.id}`)}
                  />
                  <h1
                    className="text-xs sm:text-sm md:text-md lg:text-lg font-semibold cursor-pointer"
                    onClick={() => navigate(`userProfile/${user.id}`)}
                  >
                    {user.username}
                  </h1>
                  <button
                    onClick={() => handleAddFollow( parseInt(currentUserId),user.id)} // Appel de la fonction avec les paramètres
                    className="bg-yellow-300 font-semibold text-xs sm:text-sm px-3 py-1 my-1 rounded-xl"
                  >
                    Follow
                  </button>
                  <RxCross2 className="cursor-pointer" />
                </ActivityContent>
              </ActivityItem>
            ))}
        </div>
      </ActivityContainer>
    </PostContainer>
  );
}

export default Recent;
