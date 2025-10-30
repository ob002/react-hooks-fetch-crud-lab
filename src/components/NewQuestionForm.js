import React, { useState } from "react";
const API = "http://localhost:4000/questions";

export default function NewQuestionForm({ onAddQuestion }) {
  const [prompt, setPrompt] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  function updateAnswer(idx, value) {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[idx] = value;
      return copy;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      prompt: prompt.trim(),
      answers: answers.map((a) => a.trim()),
      correctIndex: Number(correctIndex)
    };

    // Simple validation - ensure prompt and answers exist
    if (!payload.prompt || payload.answers.some((a) => a === "")) {
      alert("Please provide a prompt and all answers.");
      return;
    }

    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then((r) => {
        if (!r.ok) throw new Error("Post failed");
        return r.json();
      })
      .then((newQuestion) => {
        onAddQuestion(newQuestion);
        // reset form
        setPrompt("");
        setAnswers(["", "", "", ""]);
        setCorrectIndex(0);
      })
      .catch((err) => console.error("Post error:", err));
  }

  return (
    <form onSubmit={handleSubmit} className="new-question-form">
      <h2>New Question</h2>

      <label>
        Prompt:
        <input value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      </label>

      {answers.map((ans, i) => (
        <label key={i}>
          Answer {i + 1}:
          <input value={ans} onChange={(e) => updateAnswer(i, e.target.value)} />
        </label>
      ))}

      <label>
        Correct answer index:
        <select value={correctIndex} onChange={(e) => setCorrectIndex(e.target.value)}>
          {answers.map((_, i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </label>

      <button type="submit">Add Question</button>
    </form>
  );
}


