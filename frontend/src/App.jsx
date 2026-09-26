import { useState } from "react";
import "./App.css";

function App() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const validateIdea = async () => {
        if (!title.trim() || !description.trim()) {
            setError("Enter a title and description first.");
            return;
        }

        setLoading(true);
        setError("");
        setResult(null);

        try {
            const response = await fetch(
                "http://localhost:5000/api/ideas/validate",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title,
                        description
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Something went wrong."
                );
            }

            setResult(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const evaluations = result
        ? [
              {
                  name: "Problem",
                  score: result.idea.evaluation.problemStrength.score,
                  reason: result.idea.evaluation.problemStrength.reason
              },
              {
                  name: "Market",
                  score: result.idea.evaluation.marketDemand.score,
                  reason: result.idea.evaluation.marketDemand.reason
              },
              {
                  name: "Feasibility",
                  score: result.idea.evaluation.feasibility.score,
                  reason: result.idea.evaluation.feasibility.reason
              },
              {
                  name: "Competition",
                  score: result.idea.evaluation.competition.score,
                  reason: result.idea.evaluation.competition.reason
              },
              {
                  name: "Differentiation",
                  score: result.idea.evaluation.differentiation.score,
                  reason: result.idea.evaluation.differentiation.reason
              },
              {
                  name: "Monetization",
                  score: result.idea.evaluation.monetization.score,
                  reason: result.idea.evaluation.monetization.reason
              }
          ]
        : [];

    return (
        <main className="app">

            {/* NAVBAR */}

            <nav className="navbar">
                <div className="brand">
                    IDEA / VALIDATOR
                </div>

                <div className="nav-status">
                    <span className="status-dot"></span>
                    AI ENGINE ONLINE
                </div>
            </nav>


            {/* HERO */}

            <section className="hero">

                <div className="eyebrow">
                    STARTUP IDEA ANALYSIS
                </div>

                <h1>
                    Is your idea
                    <br />
                    <span>actually worth building?</span>
                </h1>

                <p className="hero-description">
                    Get a structured evaluation of your startup idea
                    across problem, market, feasibility, competition,
                    differentiation and monetization.
                </p>

            </section>


            {/* INPUT */}

            <section className="input-section">

                <div className="input-header">
                    <span>01</span>
                    <p>YOUR IDEA</p>
                </div>

                <div className="form">

                    <input
                        type="text"
                        placeholder="Name your idea"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <textarea
                        placeholder="What are you building? Who is it for? What problem does it solve?"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                    />

                    <div className="form-footer">

                        <span>
                            {description.length} characters
                        </span>

                        <button
                            onClick={validateIdea}
                            disabled={loading}
                        >
                            {loading
                                ? "ANALYZING..."
                                : "ANALYZE IDEA →"}
                        </button>

                    </div>

                    {error && (
                        <div className="error">
                            {error}
                        </div>
                    )}

                </div>

            </section>


            {/* RESULTS */}

            {result && (
                <section className="results">

                    <div className="section-label">
                        <span>02</span>
                        <p>ANALYSIS</p>
                    </div>


                    {/* SCORE */}

                    <div className="score-section">

                        <div>
                            <p className="result-label">
                                OVERALL SCORE
                            </p>

                            <h2>
                                {result.idea.overallScore}
                                <span>/10</span>
                            </h2>
                        </div>

                        <div className="score-line">
                            <div
                                className="score-fill"
                                style={{
                                    width: `${result.idea.overallScore * 10}%`
                                }}
                            ></div>
                        </div>

                    </div>


                    {/* EVALUATION */}

                    <div className="evaluation-grid">

                        {evaluations.map((evaluation, index) => (
                            <article
                                className="evaluation-card"
                                key={evaluation.name}
                                style={{
                                    animationDelay: `${index * 80}ms`
                                }}
                            >
                                <div className="card-top">
                                    <span>
                                        0{index + 1}
                                    </span>

                                    <strong>
                                        {evaluation.score}/10
                                    </strong>
                                </div>

                                <h3>
                                    {evaluation.name}
                                </h3>

                                <p>
                                    {evaluation.reason}
                                </p>
                            </article>
                        ))}

                    </div>


                    {/* INSIGHTS */}

                    <div className="insights">

                        <div className="insight-card strengths">
                            <span className="insight-number">
                                03
                            </span>

                            <h3>Strengths</h3>

                            <ul>
                                {result.idea.keyStrengths.map(
                                    (strength, index) => (
                                        <li key={index}>
                                            {strength}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>


                        <div className="insight-card risks">
                            <span className="insight-number">
                                04
                            </span>

                            <h3>Risks</h3>

                            <ul>
                                {result.idea.keyRisks.map(
                                    (risk, index) => (
                                        <li key={index}>
                                            {risk}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>


                        <div className="insight-card">
                            <span className="insight-number">
                                05
                            </span>

                            <h3>Target Customer</h3>

                            <p>
                                {result.idea.targetCustomer}
                            </p>
                        </div>


                        <div className="insight-card">
                            <span className="insight-number">
                                06
                            </span>

                            <h3>Suggested Improvement</h3>

                            <p>
                                {result.idea.suggestedImprovement}
                            </p>
                        </div>

                    </div>

                </section>
            )}


            {/* FOOTER */}

            <footer>
                <span>IDEA / VALIDATOR</span>
                <span>BUILT FOR FOUNDERS</span>
            </footer>

        </main>
    );
}

export default App;