import { MdClose } from "react-icons/md";
import { useState, useEffect } from "react";
import { getSkillsByUserId, getAllSkills, createSkill } from "../api/skillApi/api"; // Importer createSkill

function SkillCom({ theme }) {
  const [skills, setSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([]); // État pour toutes les compétences
  const [selectedSkill, setSelectedSkill] = useState(""); // État pour la compétence sélectionnée
  const [error, setError] = useState(""); // État pour gérer les erreurs
  const [success, setSuccess] = useState(""); // État pour gérer les succès

  // Récupération des compétences de l'utilisateur
  useEffect(() => {
    const userId = localStorage.getItem("id");
    console.log(userId);
    if (userId) {
      getSkillsByUserId(parseInt(userId))
        .then((response) => {
          setSkills(response);
          console.log("Compétences récupérées:", response.map((item) => item.skill.name));
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des compétences :", error);
        });
    }
  }, []);

  // Récupération de toutes les compétences disponibles
  useEffect(() => {
    getAllSkills()
      .then((response) => {
        setAllSkills(response);
        console.log("Toutes les compétences:", response);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des compétences disponibles:", error);
      });
  }, []);

  // Gestion de la sélection d'une compétence
  const handleSelectSkill = async (event) => {
    const selectedId = event.target.value;
    setSelectedSkill(selectedId);

    if (selectedId) {
      const userId = localStorage.getItem("id");
      if (userId) {
        try {
          console.log("userID:", userId);
          console.log("skillID:", selectedId);
          const response = await createSkill(parseInt(userId),parseInt(selectedId));
          
          setSuccess("Skill successfully added!");
          setError(""); 
          console.log("Skill created:", response);
        } catch (err) {
          setError("An error occurred while adding the skill.");
          setSuccess(""); 
          console.error("Error creating skill:", err);
        }
      }
    }
  };

  return (
    <div
      className={`w-full max-w-3xl h-auto my-5 shadow-md rounded-3xl overflow-hidden relative flex items-center justify-center flex-col p-5 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <span className="w-full flex flex-col items-center mb-4">
        <span className="font-bold text-2xl">Skills</span>
      </span>

      <div className="w-full flex items-center justify-start flex-wrap p-2">
        {/* Liste des compétences récupérées de l'API de l'utilisateur */}
        {skills.length > 0 ? (
          skills.map((item, index) => (
            <div key={index} className="flex items-center justify-center mx-1 mb-2">
              <span
                className={`capitalize px-3 p-1 text-xs font-semibold rounded-xl ${
                  theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
                }`}
              >
                {item.skill.name}
              </span>
              <MdClose className="icon cursor-pointer mr-0 ml-2 text-gray-300" />
            </div>
          ))
        ) : (
          <p>No skills available</p> // Message lorsqu'il n'y a pas de compétences
        )}
      </div>

      {/* Sélecteur de compétences disponibles */}
      <div className="w-full mt-4">
        <label className="text-lg font-semibold">Select a Skill</label>
        <select
          value={selectedSkill}
          onChange={handleSelectSkill}
          className={`w-full p-2 mt-2 rounded-lg ${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-black"}`}
        >
          <option value="">Choose a skill</option>
          {allSkills.map((skill) => (
            <option key={skill.id} value={skill.id}>
              {skill.name}
            </option>
          ))}
        </select>
      </div>

      {/* Affichage des messages de succès ou d'erreur */}
      {success && <p className="text-green-500 mt-2">{success}</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default SkillCom;
