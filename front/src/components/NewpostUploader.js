import { useState } from "react";
import { uploadPostApi } from "../api/postApi/api"; // Import the uploadPostApi function
import { toast } from "react-toastify";

function NewpostUploader({ theme }) {
  const [uploadData, setUploadData] = useState(false);
  const [cover, setCover] = useState(null); // Image file state
  const [disc, setDisc] = useState(""); // Description state
  const [value, setValue] = useState("Upload");

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setCover(file); // Set the file to state
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cover || !disc) {
      console.error("Missing image or text");
      return;
    }

    try {
      setValue("Uploading...");
      setUploadData(true);

      const userId = localStorage.getItem("id"); // Replace with actual user ID

      // Call the API with individual parameters
      const response = await uploadPostApi(cover, disc, userId);

      if (response.status === 201) {
        toast.success("Post uploaded successfully:", response.data);
        setCover(null); // Reset image state
        setDisc(""); // Reset description state
      } else {
        toast.error("Error uploading post:", response);
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    } finally {
      setValue("Upload");
      setUploadData(false);
    }
  };

  return (
    <div className={`${theme === "dark" ? "bg-black" : "bg-white"} w-full lg:w-9/12 rounded-xl px-3 py-2 flex items-center justify-center flex-col`}>
      <span className="flex items-center justify-center w-full">
        {cover && (
          <img
            src={URL.createObjectURL(cover)} // Show the selected image preview
            alt="cover"
            className="w-full h-64 object-cover rounded-md mb-3"
          />
        )}
      </span>

      <form className="w-full flex flex-col" onSubmit={handleSubmit}>
        <div className="w-full flex items-center justify-center mb-2">
          <textarea
            placeholder="Enter post description"
            value={disc}
            onChange={(e) => setDisc(e.target.value)}
            className="p-3 w-full bg-gray-100 rounded-xl"
          />
        </div>

        {/* File input to handle image upload */}
        <div className="w-full flex items-center justify-center mb-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="p-3 w-full bg-gray-100 rounded-xl"
          />
        </div>

        <button
          type="submit"
          className={`submit w-full p-3 text-white bg-blue-600 rounded-lg ${uploadData && "opacity-50 cursor-not-allowed"}`}
          disabled={uploadData}
        >
          {value}
        </button>
      </form>
    </div>
  );
}

export default NewpostUploader;
