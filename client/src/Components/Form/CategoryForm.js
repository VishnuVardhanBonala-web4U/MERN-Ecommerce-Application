import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4 mx-24">
      <div className="flex justify-center items-center ">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter new category"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="min-w-40 p-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
      >
        Submit
      </button>
    </form>
  );
};

export default CategoryForm;
