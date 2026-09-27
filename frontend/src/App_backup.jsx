import { useState } from "react"

function App() {
  const [prompt, setPrompt] = useState("")
  const [result, setResult] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

    const analyzePrompt = () => {
      if (!prompt.trim()) {
        alert("Please enter a prompt.")
        return
      }

      setIsAnalyzing(true)
      setResult(null)

      setTimeout(() => {
        const mockResult = {
          risk_score: 82,
          risk_level: "HIGH",
          confidence: 0.94,

          threats: {
            prompt_injection: true,
            jailbreak: false,
            unsafe_request: false,
            privacy_risk: true,
            data_leakage: true
          },

          explanation:
            "The prompt attempts to override existing instructions and requests access to potentially sensitive information.",

          recommendation:
            "Avoid sharing confidential information and remove sensitive data before submitting the prompt."
        }

          setResult(mockResult)
          setIsAnalyzing(false)
      }, 1200)
    }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="brand">
          🛡️ AI Guardian
        </div>
        
        <div className="nav-status">
          ● System Active
        </div>
      </nav>

      <header>
        <h1>AI Guardian</h1>
        <p>Responsible AI Security Platform</p>
      </header>

      <main>

        <section className="prompt-section">
          <div className="section-heading">
            <div>
              <h2>Prompt Security Analyzer</h2>
              <p>Analyze your prompt for potential AI security risks.</p>
            </div>
            <span className="security-badge">SECURITY SCAN</span>
          </div>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            rows="8"
          />
          
          <div className="input-footer">
            <span>{prompt.length} characters</span>
            <button
              onClick={analyzePrompt}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Prompt →"}
            </button>
          </div>
        </section>

        {isAnalyzing && (
          <div className="analysis-status">
            <div className="analysis-spinner"></div>

            <div>
              <strong>Analyzing security posture...</strong>
              <p>
                AI Guardian is evaluating the prompt for potential threats.
              </p>
            </div>
          </div>
        )}

        {!result && !isAnalyzing && (
          <section className="security-overview">

            <div className="overview-header">
              <div>
                <span className="overview-label">AI SECURITY ENGINE</span>
                <h2>Protect Your AI Interactions</h2>
                <p>
                  AI Guardian analyzes prompts for security threats,
                  privacy risks, and potential data leakage.
                </p>
              </div>

              <div className="overview-status">
                <span className="status-dot"></span>
                Ready to Analyze
              </div>
            </div>

            <div className="security-features">

              <div className="security-feature">
                <div className="feature-icon">⌁</div>
                <div>
                  <h3>Prompt Injection</h3>
                  <p>Detects attempts to manipulate AI instructions.</p>
                </div>
              </div>

              <div className="security-feature">
                <div className="feature-icon">◈</div>
                <div>
                  <h3>Privacy Protection</h3>
                  <p>Identifies prompts containing sensitive information.</p>
                </div>
              </div>

              <div className="security-feature">
                <div className="feature-icon">◆</div>
                <div>
                  <h3>Data Leakage</h3>
                  <p>Detects requests that may expose confidential data.</p>
                </div>
              </div>

              <div className="security-feature">
                <div className="feature-icon">✓</div>
                  <div>
                    <h3>Risk Assessment</h3>
                    <p>Generates a security score and recommended action.</p>
                  </div>
                </div>

              </div>

          </section>
        )}

        {result && (
          <section className="result-section">

            <h2>Security Analysis</h2>

            <div className="risk-card">
              <div className="risk-header">
                <div>
                  <h3>Overall Risk Score</h3>
                  <p>Security assessment</p>
                </div>
                
                <span className="risk-level">
                  {result.risk_level}
                </span>
             </div>
             
             <div className="risk-score-panel">
              <div
                className={`risk-circle risk-${result.risk_level.toLowerCase()}`}
              >
                <div className="risk-circle-inner">
                  <strong>{result.risk_score}</strong>
                  <span>/100</span>
                </div>
              </div>

              <div className="risk-summary">
                <span className="risk-summary-label">
                  CURRENT SECURITY LEVEL
                </span>

                <h3>{result.risk_level} RISK</h3>

                <p>
                  The analyzed prompt shows a significant number of
                  security indicators requiring attention.
                </p>
              </div>
            </div>

            <div className="risk-scale">
              <div className="risk-scale-track">
                <div
                  className="risk-scale-progress"
                  style={{ width: `${result.risk_score}%` }}
                ></div>
              </div>

              <div className="risk-scale-labels">
                <span>LOW</span>
                <span>MEDIUM</span>
                <span>HIGH</span>
                <span>CRITICAL</span>
              </div>
            </div>
            
            <div className="confidence">
              <span>Analysis Confidence</span>
              <strong>
                {Math.round(result.confidence * 100)}%
              </strong>
            </div>
          </div>


            <div className="threats-card">
              <div className="card-heading">
                <div>
                  <h3>Threat Detection</h3>
                  <p>Detected security risk categories</p>
                </div>
              </div>

              <div className="threat-grid">

                <div
                  className={`threat-item ${
                    result.threats.prompt_injection ? "detected" : "safe"
                  }`}
                >
                  <div className="threat-info">
                    <span className="threat-icon">⌁</span>
                    <div>
                      <span className="threat-name">Prompt Injection</span>
                      <small>Instruction manipulation</small>
                    </div>
                  </div>

                  <strong>
                    {result.threats.prompt_injection ? "Detected" : "Safe"}
                  </strong>
                </div>


                <div
                  className={`threat-item ${
                    result.threats.jailbreak ? "detected" : "safe"
                  }`}
                >
                  <div className="threat-info">
                    <span className="threat-icon">⚠</span>
                    <div>
                      <span className="threat-name">Jailbreak</span>
                      <small>Safety restriction bypass</small>
                    </div>
                  </div>

                  <strong>
                    {result.threats.jailbreak ? "Detected" : "Safe"}
                  </strong>
                </div>


                <div
                  className={`threat-item ${
                    result.threats.unsafe_request ? "detected" : "safe"
                  }`}
                >
                  <div className="threat-info">
                    <span className="threat-icon">!</span>
                    <div>
                      <span className="threat-name">Unsafe Request</span>
                      <small>Potentially harmful intent</small>
                    </div>
                  </div>

                  <strong>
                    {result.threats.unsafe_request ? "Detected" : "Safe"}
                  </strong>
                </div>


                <div
                  className={`threat-item ${
                    result.threats.privacy_risk ? "detected" : "safe"
                  }`}
                >
                  <div className="threat-info">
                    <span className="threat-icon">◉</span>
                  <div>
                    <span className="threat-name">Privacy Risk</span>
                    <small>Sensitive information exposure</small>
                  </div>
                </div>

                <strong>
                  {result.threats.privacy_risk ? "Detected" : "Safe"}
                </strong>
              </div>
            </div>


              <div
                className={`threat-item ${
                  result.threats.data_leakage ? "detected" : "safe"
                }`}
              >
                <div className="threat-info">
                  <span className="threat-icon">◆</span>
                <div>
                  <span className="threat-name">Data Leakage</span>
                  <small>Confidential data exposure</small>
                </div>
              </div>

              <strong>
                {result.threats.data_leakage ? "Detected" : "Safe"}
              </strong>
            </div>

            </div>

            <div className="insight-grid">

              <div className="insight-card explanation-card">
                <div className="insight-header">
                  <div className="insight-icon explanation-icon">
                    ✦
                  </div>

                  <div>
                    <span className="insight-label">EXPLAINABLE AI</span>
                    <h3>Why Was This Flagged?</h3>
                  </div>
                </div>

                <div className="insight-body">
                  <p>{result.explanation}</p>
                </div>

                <div className="insight-footer">
                  <span>Analysis generated from detected threat patterns</span>
                </div>
              </div>


              <div className="insight-card recommendation-card">
                <div className="insight-header">
                  <div className="insight-icon recommendation-icon">
                    ✓
                  </div>

                  <div>
                    <span className="insight-label">SECURITY GUIDANCE</span>
                    <h3>Recommended Action</h3>
                  </div>
                </div>

                <div className="insight-body">
                  <p>{result.recommendation}</p>
                </div>

                <div className="insight-footer">
                  <span>Recommended based on current risk assessment</span>
                </div>
              </div>

            </div>

          </section>
        )}

      </main>

    </div>
  )
}

export default App