import { useEffect, useState } from "react";

export default function Quiz() {
  const [quizData, setQuizData] = useState(null);
  const [question, setQuestion] = useState(0);
  const [trueQuestion, setTrue] = useState(0);
  const [falseQuestion, setFalse] = useState(0);

  const handleTrue = () => {
    if (question < 9) {
      setTrue((prev) => prev + 1);
      setQuestion((prev) => prev + 1);
    } else {
      setTrue((prev) => prev + 1);
      alert(`${trueQuestion + 1} soruyu doğru yanıtladın`);
    }
  };

  const handleFalse = () => {
    if (question < 9) {
      setFalse((prev) => prev + 1);
      setQuestion((prev) => prev + 1);
    } else {
      setFalse((prev) => prev + 1);
      alert(`${trueQuestion + 1} soruyu doğru yanıtladın`);
    }
  };

  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple"
    )
      .then((res) => res.json())
      .then((data) => {
        setQuizData(data.results);
        console.log("Gelen veri:", data);
      })
      .catch((err) => console.error(err));
  }, []);

  return quizData ? (
    <div className="h-auto w-auto bg-gray-700 text-white p-2">
      <div className="flex justify-around">
        <h1 className="flex justify-center text-2xl font-bold">
          {quizData[question]?.category}
        </h1>
        <h2>Soru.{question+1}</h2>

        <h3 className="pt-1 text-orange-400">
          {quizData[question].difficulty}
        </h3>
      </div>
      <p className="text-emerald-400">{trueQuestion}/10</p>
      <p className="text-xl">{quizData[question].question}</p>

      <div className="flex justify-around gap-5 pb-2">
        <button
          onClick={handleTrue}
          className="active:scale-95 hover:scale-105 py-1 px-2 rounded-xl bg-gray-600"
        >
          {quizData[question].correct_answer}
        </button>{" "}
        <button
          onClick={handleFalse}
          className="active:scale-95 hover:scale-105 py-1 px-2 rounded-xl bg-gray-600"
        >
          {quizData[question].incorrect_answers[0]}
        </button>{" "}
        <br />
        <button
          onClick={handleFalse}
          className="active:scale-95 hover:scale-105 py-1 px-2 rounded-xl bg-gray-600"
        >
          {quizData[question].incorrect_answers[1]}
        </button>
      </div>

      <button
        onClick={() => setQuestion(0)}
        className="active:scale-95 hover:scale-105 py-1 px-2 rounded-xl bg-white text-black"
      >
        Başa dön
      </button>
    </div>
  ) : (
    "Yükleniyor..."
  );
}
