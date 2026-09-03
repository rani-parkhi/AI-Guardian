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
             
             <div className="risk-score">
              {result.risk_score}
              <span>/100</span>
            </div>
            
            <div className="risk-bar">
              <div
                className="risk-progress"
                style={{ width: `${result.risk_score}%` }}
              ></div>
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
                
                <div className={`threat-item ${result.threats.prompt_injection ? "detected" : "safe"}`}>
                  <span>Prompt Injection</span>
                  <strong>
                    {result.threats.prompt_injection ? "Detected" : "Safe"}
                  </strong>
                </div>
                
                <div className={`threat-item ${result.threats.jailbreak ? "detected" : "safe"}`}>
                  <span>Jailbreak</span>
                  <strong>
                    {result.threats.jailbreak ? "Detected" : "Safe"}
                  </strong>
                </div>

                <div className={`threat-item ${result.threats.unsafe_request ? "detected" : "safe"}`}>
                  <span>Unsafe Request</span>
                  <strong>
                    {result.threats.unsafe_request ? "Detected" : "Safe"}
                  </strong>
                </div>

                <div className={`threat-item ${result.threats.privacy_risk ? "detected" : "safe"}`}>
                  <span>Privacy Risk</span>
                  <strong>
                    {result.threats.privacy_risk ? "Detected" : "Safe"}
                  </strong>
                </div>

                <div className={`threat-item ${result.threats.data_leakage ? "detected" : "safe"}`}>
                  <span>Data Leakage</span>
                  <strong>
                    {result.threats.data_leakage ? "Detected" : "Safe"}
                  </strong>
                </div>

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