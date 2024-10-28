import { BsImage, BsFillCalendar2HeartFill } from "react-icons/bs";
import { MdOutlineSlowMotionVideo, MdOutlinePoll } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { useState } from "react";

function NewpostUploader({theme}) {
  const [uploadData, setUploadData] = useState(false);
  const [cover, setCover] = useState(null);
  const [disc, setDisc] = useState("");
  const [value, setValue] = useState("Upload");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Instead of sending to Firebase, log to the console or handle accordingly
    console.log("Post submitted:", { title: disc, cover });
    setUploadData(false);
  };

  const handleClick = () => {
    const submit = document.querySelector(".submit");
    submit.style.cursor = "no-drop";
    setValue("Uploading...");
    setTimeout(() => {
      setValue("Upload");
      submit.style.cursor = "pointer";
    }, 2500);
  };

  return (
<div className={`${theme === "dark" ? "bg-black" : "bg-white"} w-full lg:w-9/12 rounded-xl px-3 py-2 flex items-center justify-center flex-col`}>
<span className="flex items-center justify-center w-full ">
        <img
          src="data:image/jpeg;base64,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" // Static user image
          alt="User Avatar"
          className="lg:w-12 bg-black lg:h-12 w-10 h-10 rounded-2xl border-2 border-gray-500 object-cover overflow-hidden"
        />
        <input
          type="text"
          className={`bg-white text-black w-3/4 lg:h-9 h-8  mx-2 rounded-lg px-4  outline-none text-xs lg:text-sm rounded-lg`}
          placeholder="Tell your friends about your thoughts..."
          maxLength={150}
          
        />
      </span>

      <span className="flex items-center justify-end w-full  lg:w-4/5 my-3">
        <label
          className={`${theme === "dark" ? "bg-white" : "bg-black"} flex items-center  justify-center  px-3 rounded-lg cursor-pointer py-2 lg:mr-8 mx-2`}
          onClick={() => setUploadData(true)}
        >
          <BsImage className={`${theme === "dark" ? "text-black" : "text-white"} mx-1`} />
          <h3 className={`${theme === "dark" ? "text-black" : "text-white"} text-xs my-1`}>Photo</h3>
        </label>
        {/* <label className="flex items-center justify-center bg-black/20 px-3 rounded-lg cursor-pointer py-2 mr-1 lg:mr-8">
          <MdOutlineSlowMotionVideo fontSize={18} className="text-blue-600 mx-1" />
          <h3 className="text-white text-xs">Video</h3>
        </label>
        <label className="flex items-center justify-center bg-black/20 px-3 rounded-lg cursor-pointer py-2 mr-1 lg:mr-8">
          <MdOutlinePoll fontSize={18} className="text-orange-600 mx-1" />
          <h3 className="text-white text-xs">Poll</h3>
        </label>
        <label className="flex items-center justify-center bg-black/20 px-3 rounded-lg cursor-pointer py-2">
          <BsFillCalendar2HeartFill className="text-yellow-600 mx-1" />
          <h3 className="text-white text-xs">Schedule</h3>
        </label> */}
      </span>

      {uploadData && (
        <div className="fixed w-screen h-screen top-0 left-0 bg-black/50 z-50 flex items-center justify-center">
          <form
            className="w-full flex items-center justify-center h-full"
            onSubmit={handleSubmit}
          >
            <div className="md:w-1/4 bg-gray-700 relative shadow-lg rounded-md flex items-center justify-center flex-col text-white px-3">
              <input
                type="file"
                id="image"
                accept="image/*"
                className="my-3 cursor-pointer file:bg-yellow-200 file:border-yellow-400 file:text-base file:font-semibold file:rounded-md file:mx-5 file:outline-none file:shadow-md file:font-sans file:cursor-pointer file:px-4"
                onChange={(e) => setCover(e.target.files[0])}
                required
              />
              <input
                type="text"
                maxLength={150}
                placeholder="Post title..."
                onChange={(e) => setDisc(e.target.value)}
                value={disc}
                className="w-full my-3 bg-transparent border border-gray-900 rounded px-2 text-sm outline-none py-2 placeholder:text-gray-300"
                required
              />
              <input
                type="submit"
                className="bg-yellow-500 px-5 py-2 my-4 text-white font-semibold rounded-md cursor-pointer submit"
                value={value}
                onClick={handleClick}
              />
              <ImCross
                fontSize={15}
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => setUploadData(false)}
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default NewpostUploader;
