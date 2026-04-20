import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    age: '',
    department: 'Sales',
    distance_from_home: '',
    job_role: 'Sales Executive',
    salary: '',
    job_satisfaction: '3',
    years_at_company: ''
  });

  const [prediction, setPrediction] = useState<{
    prediction: string;
    risk_score_percentage: number;
  } | null>(null);
  
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Convert necessary strings to numbers
    const payload = {
      age: Number(formData.age) || 0,
      department: formData.department,
      distance_from_home: Number(formData.distance_from_home) || 0,
      job_role: formData.job_role,
      salary: Number(formData.salary) || 0,
      job_satisfaction: Number(formData.job_satisfaction) || 3,
      years_at_company: Number(formData.years_at_company) || 0
    };

    try {
      // Getting API URL from environment variables, fallback for local dev
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      
      const res = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      setPrediction(data);
    } catch (error) {
      console.error("Error connecting to backend API:", error);
      alert("Failed to connect to backend. Is FastAPI running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white font-sans selection:bg-indigo-500/30">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 mb-2 drop-shadow-sm">
            HR Analytics
          </h1>
          <p className="text-slate-400 text-lg">AI-Powered Employee Attrition Prediction</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Input Form Column */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl relative overflow-hidden transition-all duration-300 hover:shadow-indigo-500/10 hover:border-slate-600/50">
              <div className="absolute top-0 right-0 p-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
              
              <h2 className="text-2xl font-semibold mb-6 flex items-center text-slate-100">
                <svg className="w-5 h-5 mr-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                Employee Profile Analyzer
              </h2>
              
              <form onSubmit={handlePredict} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Age */}
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Age</label>
                    <input 
                      type="number" name="age" required min="18" max="65" value={formData.age} onChange={handleInputChange}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="e.g. 35"
                    />
                  </div>

                  {/* Department */}
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Department</label>
                    <select 
                      name="department" value={formData.department} onChange={handleInputChange}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    >
                      <option value="Sales">Sales</option>
                      <option value="R&D">Research & Development</option>
                      <option value="HR">Human Resources</option>
                    </select>
                  </div>

                  {/* Distance From Home */}
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Distance From Home (km)</label>
                    <input 
                      type="number" name="distance_from_home" required min="0" max="200" value={formData.distance_from_home} onChange={handleInputChange}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="e.g. 10"
                    />
                  </div>

                  {/* Job Role */}
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Job Role</label>
                    <select 
                      name="job_role" value={formData.job_role} onChange={handleInputChange}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    >
                      <option value="Sales Executive">Sales Executive</option>
                      <option value="Research Scientist">Research Scientist</option>
                      <option value="Laboratory Technician">Laboratory Technician</option>
                      <option value="Manager">Manager</option>
                    </select>
                  </div>

                  {/* Salary */}
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Annual Salary (₹)</label>
                    <input 
                      type="number" name="salary" required min="50000" max="10000000" value={formData.salary} onChange={handleInputChange}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="e.g. 600000"
                    />
                  </div>

                   {/* Job Satisfaction */}
                   <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Job Satisfaction (1-4)</label>
                    <select 
                      name="job_satisfaction" value={formData.job_satisfaction} onChange={handleInputChange}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    >
                      <option value="1">1 - Low</option>
                      <option value="2">2 - Medium</option>
                      <option value="3">3 - High</option>
                      <option value="4">4 - Very High</option>
                    </select>
                  </div>

                  {/* Years at company */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-400 mb-2">Years at Company</label>
                    <input 
                      type="number" name="years_at_company" required min="0" max="50" value={formData.years_at_company} onChange={handleInputChange}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="e.g. 5"
                    />
                  </div>

                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full md:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-medium rounded-xl transition-colors focus:outline-none focus:ring-4 focus:ring-indigo-500/30 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Analyzing Profile...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Generate Risk Assessment
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8 h-full flex flex-col items-center justify-center text-center shadow-xl">
              {!prediction ? (
                <div className="text-slate-500 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-slate-600 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                  </div>
                  <p className="text-sm">Submit an employee profile to see their flight risk assessment.</p>
                </div>
              ) : (
                <div className="w-full animate-in fade-in zoom-in duration-500">
                  <h3 className="text-lg text-slate-400 mb-2 font-medium">Attrition Risk Assessment</h3>
                  
                  <div className="py-8">
                    <div className="relative inline-flex items-center justify-center">
                      <svg className="w-40 h-40 transform -rotate-90">
                        <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-700" />
                        <circle 
                          cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" 
                          strokeDasharray={`${prediction.risk_score_percentage * 4.4} 440`} 
                          className={prediction.prediction === "Yes" ? "text-rose-500" : "text-emerald-500"} 
                          style={{ transition: 'stroke-dasharray 1s ease-out' }}
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold">{prediction.risk_score_percentage}%</span>
                        <span className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Risk Score</span>
                      </div>
                    </div>
                  </div>

                  <div className={`mt-6 p-4 rounded-xl border ${prediction.prediction === "Yes" ? "bg-rose-500/10 border-rose-500/30 text-rose-400" : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"}`}>
                    <div className="font-bold text-lg mb-1">
                      {prediction.prediction === "Yes" ? "High Risk of Leaving" : "Likely to Stay"}
                    </div>
                    <p className="text-sm opacity-80">
                      {prediction.prediction === "Yes" 
                        ? "This employee profile indicates a strong likelihood of attrition in the near future." 
                        : "This profile shows stable engagement metrics currently."}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
