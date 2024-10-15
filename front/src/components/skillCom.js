import { MdClose } from "react-icons/md";

function SkillCom({  theme }) {
  const skill = [
    "html",
    "css",
    "javascript",
    "bootstrap",
    "tailwind",
    "jquery",
    "react js",
    "wordpress",
    "Git & Github",
    "GSAP",
  ];

  return (
    <div
      className={`w-full max-w-3xl h-auto my-5 shadow-md rounded-3xl overflow-hidden relative flex items-center justify-center flex-col p-5 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
     <span className="w-full flex flex-col items-center mb-4">
        <span className="font-bold text-2xl">Skills</span>
        {/* Uncomment this if you want the input back
        <input
          type="text"
          className={`w-40 h-10 bg-transparent outline-none border ${
            theme === "dark" ? "border-gray-600 text-gray-300" : "border-gray-400 text-black"
          } text-sm font-thin px-2 rounded-md placeholder:text-xs`}
          placeholder="Type here your skills..."
        />
        */}
      </span>
      <span className="w-full flex items-center justify-start flex-wrap p-2">
        {skill.map((item, index) => {
          return (
            <div
              key={index}
              className="flex items-center justify-center mx-1 mb-2"
            >
              <span
                className={`capitalize px-3 p-1 text-xs font-semibold rounded-xl ${
                  theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
                }`}
              >
                {item}
              </span>
              <MdClose className="icon cursor-pointer mr-0 ml-2 text-gray-300" />
            </div>
          );
        })}
      </span>
  
    </div>
  );
}

export default SkillCom;
