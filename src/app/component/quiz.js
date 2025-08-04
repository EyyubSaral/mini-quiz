import { useEffect, useState } from "react";

export default function Quiz() {
  const [quizData, setQuizData] = useState(null);
  const [question, setQuestion] = useState(0);
  const [trueQuestion, setTrue] = useState(0);
  const [falseQuestion, setFalse] = useState(0);
  const [end, setEnd] = useState(false);

  const handleTrue = () => {
    if (question < 9) {
      setTrue((prev) => prev + 1);
      setQuestion((prev) => prev + 1);
    } else {
      setTrue((prev) => prev + 1);
      setEnd(true);
    }
  };

  const handleFalse = () => {
    if (question < 9) {
      setFalse((prev) => prev + 1);
      setQuestion((prev) => prev + 1);
    } else {
      setFalse((prev) => prev + 1);
      setEnd(true);
    }
  };

  const handleBack = () => {
    setQuestion(0);
    setTrue(0);
    setFalse(0);
    setEnd(false);
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

  if (!quizData) {
    return "Yükleniyor...";
  }

  if (end) {
    return (
      <div className="h-auto w-[500px] bg-green-800 text-white p-5 rounded-xl shadow-lg flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Quiz Bitti!</h1>
        <p className="text-xl">Toplam Soru: 10</p>
        <p className="text-green-300">Doğru Sayısı: {trueQuestion}</p>
        <p className="text-red-300">Yanlış Sayısı: {falseQuestion}</p>
        <p className="text-yellow-300">
          Başarı Oranı: %{Math.round((trueQuestion / 10) * 100)}
        </p>
        <button
          onClick={handleBack}
          className="active:scale-95 hover:scale-105 py-2 px-4 rounded-xl bg-white text-black"
        >
          Başa Dön
        </button>
      </div>
    );
  }

  return (
    <div className="h-auto w-auto bg-gray-700 text-white p-2">
      <div className="flex justify-around">
        <h1 className="text-2xl font-bold">
          {quizData[question]?.category}
        </h1>
        <h2>Soru {question + 1}</h2>
        <h3 className="pt-1 text-orange-400">
          {quizData[question].difficulty}
        </h3>
      </div>

      <p className="text-emerald-400">{trueQuestion}/10 doğru</p>
      <p className="text-xl my-4">{quizData[question].question}</p>

      <div className="flex justify-around gap-5 pb-4 flex-wrap">
        <button
          onClick={handleTrue}
          className="active:scale-95 hover:scale-105 py-1 px-2 rounded-xl bg-gray-600"
        >
          {quizData[question].correct_answer}
        </button>
        <button
          onClick={handleFalse}
          className="active:scale-95 hover:scale-105 py-1 px-2 rounded-xl bg-gray-600"
        >
          {quizData[question].incorrect_answers[0]}
        </button>
        <button
          onClick={handleFalse}
          className="active:scale-95 hover:scale-105 py-1 px-2 rounded-xl bg-gray-600"
        >
          {quizData[question].incorrect_answers[1]}
        </button>
      </div>

      <button
        onClick={handleBack}
        className="active:scale-95 hover:scale-105 py-1 px-2 rounded-xl bg-white text-black"
      >
        Başa Dön
      </button>
    </div>
  );
}
