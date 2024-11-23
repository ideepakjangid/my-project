import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";

const ViewQuiz = () => {
  const navigator = useNavigate();
  const [quizzes, setQuizzes] = useState([]);

  const fetchQuizzesData = () => {
    const db = getDatabase();
    const starCountRef = ref(db, "quizzes/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);

      const newArr = Object.keys(data).map((quizId) => {
        return { id: quizId, ...data[quizId] };
      });
      console.log(Object.keys(data));
      setQuizzes(newArr);
    });
  };

  useEffect(() => {
    fetchQuizzesData();
    const lsUserData = localStorage.getItem("user");
    if (lsUserData == null) {
      navigator("/");
    }
  }, []);
  return (
    <>
      <div className="flex py-4 justify-center min-h-[90vh] bg-gray-100">
        <div className="w-full p-8 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            All Quizzes
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-4 py-2 border border-gray-300">S.No</th>
                  <th className="px-4 py-2 border border-gray-300">Question</th>
                  <th className="px-4 py-2 border border-gray-300">Answer</th>
                </tr>
              </thead>
              <tbody>
                {quizzes.map((quiz, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border border-gray-300 text-center">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {quiz.question}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-[green] font-bold">
                      {quiz[quiz.correctOption]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewQuiz;
