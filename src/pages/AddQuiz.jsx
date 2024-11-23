import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

const AddQuiz = () => {
  const navigator = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const quizData = {
      question: e.target.question.value,
      option1: e.target.option1.value,
      option2: e.target.option2.value,
      option3: e.target.option3.value,
      option4: e.target.option4.value,
      correctOption: e.target.correctOption.value,
    };
    const quizId = uuidv4();
    const db = getDatabase();
    set(ref(db, "quizzes/" + quizId), quizData);

    console.log(quizData);

    e.target.reset();
  };

  useEffect(() => {
    const lsUserData = localStorage.getItem("user");
    if (lsUserData == null) {
      navigator("/login");
    }
  }, []);
  return (
    <>
      <div className="flex items-center justify-center p-4 min-h-screen bg-gradient-to-r from-blue-100 to-green-100">
        <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Add Quiz
          </h2>
          <form onSubmit={submitHandler} className="space-y-4">
            {/* Question Input */}
            <div>
              <label
                htmlFor="question"
                className="block text-sm font-medium text-gray-700"
              >
                Question
              </label>
              <input
                type="text"
                id="question"
                name="question"
                placeholder="Enter your question"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
              />
            </div>

            {/* Options Inputs */}
            <div>
              <label
                htmlFor="option1"
                className="block text-sm font-medium text-gray-700"
              >
                Option 1
              </label>
              <input
                type="text"
                id="option1"
                name="option1"
                placeholder="Enter option 1"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="option2"
                className="block text-sm font-medium text-gray-700"
              >
                Option 2
              </label>
              <input
                type="text"
                id="option2"
                name="option2"
                placeholder="Enter option 2"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="option3"
                className="block text-sm font-medium text-gray-700"
              >
                Option 3
              </label>
              <input
                type="text"
                id="option3"
                name="option3"
                placeholder="Enter option 3"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="option4"
                className="block text-sm font-medium text-gray-700"
              >
                Option 4
              </label>
              <input
                type="text"
                id="option4"
                name="option4"
                placeholder="Enter option 4"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
              />
            </div>

            {/* Correct Option Selection */}
            <div>
              <label
                htmlFor="correctOption"
                className="block text-sm font-medium text-gray-700"
              >
                Correct Option
              </label>
              <select
                id="correctOption"
                name="correctOption"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
              >
                <option value="" disabled selected>
                  Select correct option
                </option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
                <option value="option4">Option 4</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
            >
              Add Quiz
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddQuiz;
