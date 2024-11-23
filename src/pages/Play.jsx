import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue, refFromURL } from "firebase/database";

const Play = () => {
  const navigator = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [questionNo, setQuestionNo] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);

  const fetchQuizzesData = () => {
    const db = getDatabase();
    const starCountRef = ref(db, "quizzes/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      const newArr = Object.keys(data).map((quizId) => {
        return { id: quizId, ...data[quizId] };
      });
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
      <div className="w-full h-screen flex items-center p-4 bg-gradient-to-r from-blue-100 to-green-100">
        <div className="w-full max-w-xl mx-auto p-4   text-center border shadow-lg bg-white rounded-md">
          {/* Navigation Buttons */}
          {questionNo == quizzes.length ? (
            <FinalDecision score={score} quizzes={quizzes} setQuestionNo={setQuestionNo} setScore={setScore} setSelectedOption={setSelectedOption} />
          ) : (
            <div>
              <h1 className="text-2xl font-bold mb-4">Play Quiz</h1>

              <Display
                quiz={quizzes[questionNo]}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                setScore={setScore}
                score={score}
              />
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setQuestionNo(questionNo - 1)}
                  disabled={questionNo <= 0 && true}
                  className="py-2 px-4 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
                >
                  Previous
                </button>
                <button
                  onClick={() => {
                    setQuestionNo(questionNo + 1);
                    setSelectedOption(null);
                  }}
                  className="py-2 px-4 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Play;

function Display({ quiz, setSelectedOption, selectedOption, setScore, score }) {
  const handleOptionClick = (index, option) => {
    setSelectedOption(index);
    if (option == quiz[quiz.correctOption]) {
      setScore(score + 1);
    }
  };

  return (
    <>
      <div className="text-xl mb-6">
        <p>{quiz?.question}</p>
      </div>
      <div className="flex flex-col gap-4">
        {quiz &&
          [quiz.option1, quiz.option2, quiz.option3, quiz.option4].map(
            (option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(index, option)}
                className={`py-2 px-4 rounded-lg border ${
                  selectedOption === index
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {option}
              </button>
            )
          )}
      </div>
    </>
  );
}

function FinalDecision({ quizzes, score,setQuestionNo,setScore,setSelectedOption }) {
  return (
    <div className="min-h-[60vh] bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Quiz Completed!
        </h1>
        <p className="text-xl text-gray-600">
          You scored {score} out of{" "}
          <span className="font-semibold">{quizzes?.length}</span>.
        </p>
        <p className="text-2xl font-semibold mt-4 text-green-500">
          {Math.ceil((score / quizzes?.length) * 100)} % Correct
        </p>
        <button
          className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          onClick={() => {
            setQuestionNo(0);
            setScore(0);
            setSelectedOption(null);
          }} // Example: Restart the quiz
        >
          Retake Quiz
        </button>
      </div>
    </div>
  );
}
