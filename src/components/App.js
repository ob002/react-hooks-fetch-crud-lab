import React, { useState } from "react";
import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  function addQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function deleteQuestion(id) {
    setQuestions(questions.filter((question) => question.id !== id));
  }

  function updateQuestion(updatedQuestion) {
    setQuestions(
      questions.map((question) =>
        question.id === updatedQuestion.id ? updatedQuestion : question
      )
    );
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm /> : <QuestionList />}
      {page === "Form" ? (
        <QuestionForm onAddQuestion={addQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={deleteQuestion}
          onUpdateQuestion={updateQuestion}
        />
      )}
    </main>
  );
}
