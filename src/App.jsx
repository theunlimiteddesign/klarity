import { useState, useEffect, useRef } from "react";

const QUESTIONS = [
  // Core Personality
  { id: 1, category: "personality", text: "When you're given free time with no rules, what do you most naturally gravitate toward?", options: ["Creating or building something", "Exploring or researching a topic", "Connecting with or helping people", "Organizing or planning something"] },
  { id: 2, category: "personality", text: "In a group project, which role feels most natural to you?", options: ["The one with the vision and direction", "The one who researches and solves problems", "The one who keeps people motivated and together", "The one who manages timelines and execution"] },
  { id: 3, category: "personality", text: "How do you feel after a long day of social interaction?", options: ["Energized — I need people around me", "It depends on who I was with", "Somewhat drained — I need quiet recharge time", "Very drained — I strongly prefer solitude"] },
  { id: 4, category: "personality", text: "When you face a difficult decision, you typically:", options: ["Trust your gut and act quickly", "Research extensively before deciding", "Talk it through with others you trust", "Make a pros/cons list and analyze"] },
  { id: 5, category: "personality", text: "Which environment makes you feel most alive?", options: ["Fast-paced and unpredictable", "Structured with clear expectations", "Collaborative and social", "Independent with deep focus time"] },

  // Values & Goals
  { id: 6, category: "values", text: "What matters most to you in future work?", options: ["Making a meaningful difference in the world", "Financial security and wealth", "Creative freedom and expression", "Intellectual challenge and growth"] },
  { id: 7, category: "values", text: "If you could only achieve ONE of these in your career, which would you choose?", options: ["Fame or public recognition", "Deep expertise in a field", "Wealth and financial freedom", "Positive impact on others' lives"] },
  { id: 8, category: "values", text: "How important is work-life balance to you?", options: ["Critical — I won't sacrifice personal time", "Important but I'd grind hard for the right cause", "I thrive when work IS my life", "I want flexibility, not necessarily balance"] },
  { id: 9, category: "values", text: "Which future scenario excites you most?", options: ["Running your own company", "Being the world's best at one specific thing", "Traveling and working globally", "Building something that outlasts you"] },
  { id: 10, category: "values", text: "How do you feel about competition?", options: ["I love it — it pushes me to be the best", "I prefer collaboration over competition", "I compete only with my past self", "I find it stressful and prefer to avoid it"] },

  // Skills & Strengths
  { id: 11, category: "skills", text: "Which subject has ever made you lose track of time?", options: ["Math, logic, or coding", "Art, writing, or music", "Science or how things work", "History, people, or social dynamics"] },
  { id: 12, category: "skills", text: "When you need to communicate, you prefer:", options: ["Writing — I organize thoughts better on paper", "Speaking — I think out loud and persuade", "Visual — I show through diagrams and images", "I adapt to whatever works for the other person"] },
  { id: 13, category: "skills", text: "Which of these comes most naturally to you?", options: ["Spotting patterns and solving puzzles", "Empathizing and reading people", "Making things look or sound beautiful", "Organizing chaos into order"] },
  { id: 14, category: "skills", text: "If you had to teach a class tomorrow on something you already know, it would be about:", options: ["Technology or how digital systems work", "A creative craft or artistic skill", "A social issue or human behavior topic", "A scientific or analytical subject"] },
  { id: 15, category: "skills", text: "Your friends would describe your superpower as:", options: ["Always having a clever solution", "Being able to talk to anyone", "Creating things that wow people", "Being the most organized person they know"] },

  // Lifestyle & Environment
  { id: 16, category: "lifestyle", text: "Where would you ideally want to do your work?", options: ["In a city office with other professionals", "From anywhere — remotely", "Outdoors or in varied locations", "In a lab, studio, or specialized space"] },
  { id: 17, category: "lifestyle", text: "How do you feel about risk?", options: ["I embrace it — high risk, high reward", "Calculated risks are fine with research", "I prefer stable and predictable outcomes", "It depends heavily on the potential upside"] },
  { id: 18, category: "lifestyle", text: "What kind of daily routine appeals to you?", options: ["Highly varied — no two days the same", "Some structure with room for creativity", "Consistent and predictable", "Project-based — intense then relaxed"] },
  { id: 19, category: "lifestyle", text: "How do you feel about managing or leading other people?", options: ["I love it — I want to lead teams", "I'd do it if needed but prefer working directly", "I prefer being led by someone with vision", "I want to work solo as much as possible"] },
  { id: 20, category: "lifestyle", text: "How many years are you willing to study/train before entering a field?", options: ["2-3 years maximum", "4-6 years is fine", "7-10 years for the right career", "I'd rather learn on the job"] },

  // Modern World Awareness
  { id: 21, category: "future", text: "Which global trend excites you most?", options: ["AI and automation transforming industries", "Climate change and sustainability solutions", "Healthcare and extending human life", "Connecting the world through technology"] },
  { id: 22, category: "future", text: "How do you think about AI's impact on careers?", options: ["I want to build and develop AI systems", "I want to use AI as a powerful tool", "I'm focused on uniquely human skills AI can't replace", "I'm still figuring out what it means for me"] },
  { id: 23, category: "future", text: "Which industry feels most alive and important to you right now?", options: ["Tech and software", "Health and medicine", "Media, content, and entertainment", "Environment and sustainability"] },
  { id: 24, category: "future", text: "What kind of problems do you want your work to solve?", options: ["Technical or engineering problems", "Human and social problems", "Creative or cultural problems", "Business or economic problems"] },
  { id: 25, category: "future", text: "How do you think about money in your career planning?", options: ["I'm building toward financial independence first", "I'll sacrifice income for passion", "I want both — and believe I can have it", "I haven't thought much about it yet"] },

  // Deep Dive
  { id: 26, category: "deep", text: "What frustrates you most about the world right now?", options: ["Systems and institutions that are slow to change", "People not having access to information or opportunity", "Lack of beauty, creativity, or meaning in everyday life", "Inefficiency and wasted potential"] },
  { id: 27, category: "deep", text: "If you could spend a year doing anything and money wasn't a concern, you'd:", options: ["Build something — an app, a company, a product", "Travel and immerse yourself in different cultures", "Create — write, make films, music, or art", "Research and learn as deeply as possible"] },
  { id: 28, category: "deep", text: "Which kind of recognition would mean the most to you?", options: ["Being respected by peers as a top expert", "Being loved by a wide public audience", "Knowing your work helped someone personally", "Leaving a lasting legacy or innovation"] },
  { id: 29, category: "deep", text: "Which historical figure's career path do you find most inspiring?", options: ["An inventor or scientist (like Tesla or Curie)", "An entrepreneur or visionary (like Jobs or Musk)", "An artist or storyteller (like Kubrick or Kahlo)", "A leader or changemaker (like Mandela or MLK)"] },
  { id: 30, category: "deep", text: "What does success look like to you at age 35?", options: ["Running a company or leading a big team", "Recognized as a top expert in my field", "Creative work that resonates with millions", "Living freely with financial independence"] },

  // Adaptive bonus questions
  { id: 31, category: "adaptive", text: "Do you prefer working with things you can see and touch, or abstract ideas?", options: ["Definitely tangible — physical things", "Mostly tangible with some abstract thinking", "Mostly abstract with some practical application", "Purely abstract — ideas and concepts"] },
  { id: 32, category: "adaptive", text: "How do you handle ambiguity and undefined problems?", options: ["I love it — I define the problem myself", "I need some direction but can figure it out", "I prefer clear problems with defined solutions", "Ambiguity paralyzes me until I get clarity"] },
  { id: 33, category: "adaptive", text: "Which skill gap would you most willingly close?", options: ["Technical skills — coding, data, engineering", "Communication — writing, speaking, storytelling", "Business — strategy, finance, operations", "Creative skills — design, film, music"] },
  { id: 34, category: "adaptive", text: "How do you feel about public speaking and presentation?", options: ["I love being in front of people", "I can do it when I need to", "I prefer smaller audiences", "I avoid it as much as possible"] },
  { id: 35, category: "adaptive", text: "What's your relationship with technology?", options: ["I build and create with it", "I use it constantly but don't build", "I'm selective — use what I need", "I prefer minimal technology in my life"] },
];

const CAREER_PATHS = {
  "Software Engineer": { icon: "⚙️", match: 0, description: "Build the digital world. Design systems, write code, solve complex technical problems.", salary: "$85k–$200k+", growth: "Very High", timeToEntry: "2–4 years" },
  "UX/Product Designer": { icon: "🎨", match: 0, description: "Shape how people interact with technology. Bridge creativity and functionality.", salary: "$70k–$160k", growth: "High", timeToEntry: "2–3 years" },
  "Data Scientist": { icon: "📊", match: 0, description: "Extract meaning from data. Find patterns, build models, drive decisions.", salary: "$90k–$180k", growth: "Very High", timeToEntry: "3–5 years" },
  "Entrepreneur": { icon: "🚀", match: 0, description: "Build your own thing. Identify problems, build solutions, create value.", salary: "Variable (unlimited ceiling)", growth: "High Risk/Reward", timeToEntry: "Anytime" },
  "Clinical Psychologist": { icon: "🧠", match: 0, description: "Help people understand and improve their mental health and wellbeing.", salary: "$80k–$150k", growth: "High", timeToEntry: "7–10 years" },
  "Filmmaker / Content Creator": { icon: "🎬", match: 0, description: "Tell stories that move people. Direct, produce, and create visual narratives.", salary: "$40k–$300k+", growth: "Medium", timeToEntry: "1–5 years" },
  "Environmental Scientist": { icon: "🌱", match: 0, description: "Protect the planet. Study ecosystems, develop sustainability solutions.", salary: "$55k–$120k", growth: "High", timeToEntry: "4–6 years" },
  "Doctor / Surgeon": { icon: "🩺", match: 0, description: "Directly save lives. Diagnose, treat, and restore health.", salary: "$150k–$400k+", growth: "Stable", timeToEntry: "10–14 years" },
  "Marketing Strategist": { icon: "📣", match: 0, description: "Make ideas spread. Understand audiences, craft messages, build brands.", salary: "$50k–$150k", growth: "Medium", timeToEntry: "2–4 years" },
  "AI/ML Engineer": { icon: "🤖", match: 0, description: "Build the intelligence of tomorrow. Train models, design AI systems.", salary: "$110k–$250k", growth: "Explosive", timeToEntry: "3–5 years" },
  "Architect": { icon: "🏛️", match: 0, description: "Design spaces where people live and work. Blend art and engineering.", salary: "$60k–$130k", growth: "Medium", timeToEntry: "7–9 years" },
  "Journalist / Writer": { icon: "✍️", match: 0, description: "Tell the truth. Investigate, report, and inform the world.", salary: "$35k–$100k", growth: "Medium", timeToEntry: "2–4 years" },
};

function scoreCareerPaths(answers) {
  const scores = { ...CAREER_PATHS };
  Object.keys(scores).forEach(k => scores[k] = { ...scores[k], match: 50 });

  answers.forEach(({ questionId, optionIndex }) => {
    const q = QUESTIONS.find(q => q.id === questionId);
    if (!q) return;

    // Scoring logic based on answers
    if (q.id === 1) {
      if (optionIndex === 0) { scores["Software Engineer"].match += 15; scores["Entrepreneur"].match += 12; scores["Architect"].match += 10; scores["AI/ML Engineer"].match += 10; }
      if (optionIndex === 1) { scores["Data Scientist"].match += 15; scores["Environmental Scientist"].match += 10; scores["AI/ML Engineer"].match += 12; }
      if (optionIndex === 2) { scores["Clinical Psychologist"].match += 15; scores["Marketing Strategist"].match += 10; scores["Journalist / Writer"].match += 8; }
      if (optionIndex === 3) { scores["Marketing Strategist"].match += 12; scores["Entrepreneur"].match += 10; scores["Architect"].match += 10; }
    }
    if (q.id === 2) {
      if (optionIndex === 0) { scores["Entrepreneur"].match += 18; scores["Filmmaker / Content Creator"].match += 10; }
      if (optionIndex === 1) { scores["Data Scientist"].match += 12; scores["Software Engineer"].match += 10; scores["AI/ML Engineer"].match += 12; }
      if (optionIndex === 2) { scores["Clinical Psychologist"].match += 15; scores["Marketing Strategist"].match += 12; scores["Doctor / Surgeon"].match += 8; }
      if (optionIndex === 3) { scores["Architect"].match += 12; scores["Marketing Strategist"].match += 10; }
    }
    if (q.id === 3) {
      if (optionIndex === 0) { scores["Marketing Strategist"].match += 10; scores["Clinical Psychologist"].match += 8; scores["Journalist / Writer"].match += 8; }
      if (optionIndex === 3) { scores["Software Engineer"].match += 10; scores["Data Scientist"].match += 10; scores["AI/ML Engineer"].match += 10; }
    }
    if (q.id === 6) {
      if (optionIndex === 0) { scores["Environmental Scientist"].match += 15; scores["Clinical Psychologist"].match += 12; scores["Doctor / Surgeon"].match += 15; }
      if (optionIndex === 1) { scores["Entrepreneur"].match += 12; scores["Software Engineer"].match += 10; scores["Doctor / Surgeon"].match += 10; }
      if (optionIndex === 2) { scores["Filmmaker / Content Creator"].match += 18; scores["UX/Product Designer"].match += 15; scores["Journalist / Writer"].match += 12; scores["Architect"].match += 10; }
      if (optionIndex === 3) { scores["AI/ML Engineer"].match += 15; scores["Data Scientist"].match += 12; scores["Software Engineer"].match += 10; }
    }
    if (q.id === 9) {
      if (optionIndex === 0) { scores["Entrepreneur"].match += 20; }
      if (optionIndex === 1) { scores["Software Engineer"].match += 10; scores["Data Scientist"].match += 10; scores["Doctor / Surgeon"].match += 12; scores["AI/ML Engineer"].match += 10; }
      if (optionIndex === 2) { scores["Journalist / Writer"].match += 12; scores["Environmental Scientist"].match += 10; scores["Filmmaker / Content Creator"].match += 10; }
      if (optionIndex === 3) { scores["Architect"].match += 12; scores["Environmental Scientist"].match += 10; scores["Doctor / Surgeon"].match += 10; }
    }
    if (q.id === 11) {
      if (optionIndex === 0) { scores["Software Engineer"].match += 18; scores["Data Scientist"].match += 18; scores["AI/ML Engineer"].match += 18; }
      if (optionIndex === 1) { scores["Filmmaker / Content Creator"].match += 18; scores["Journalist / Writer"].match += 15; scores["UX/Product Designer"].match += 12; }
      if (optionIndex === 2) { scores["Doctor / Surgeon"].match += 15; scores["Environmental Scientist"].match += 15; scores["AI/ML Engineer"].match += 10; }
      if (optionIndex === 3) { scores["Clinical Psychologist"].match += 18; scores["Marketing Strategist"].match += 12; scores["Journalist / Writer"].match += 10; }
    }
    if (q.id === 17) {
      if (optionIndex === 0) { scores["Entrepreneur"].match += 18; scores["Filmmaker / Content Creator"].match += 10; }
      if (optionIndex === 2) { scores["Doctor / Surgeon"].match += 10; scores["Environmental Scientist"].match += 8; }
    }
    if (q.id === 21) {
      if (optionIndex === 0) { scores["AI/ML Engineer"].match += 20; scores["Software Engineer"].match += 15; scores["Data Scientist"].match += 15; }
      if (optionIndex === 1) { scores["Environmental Scientist"].match += 20; scores["Doctor / Surgeon"].match += 8; }
      if (optionIndex === 2) { scores["Doctor / Surgeon"].match += 20; scores["Clinical Psychologist"].match += 12; }
      if (optionIndex === 3) { scores["Software Engineer"].match += 12; scores["Marketing Strategist"].match += 10; scores["Journalist / Writer"].match += 8; }
    }
    if (q.id === 22) {
      if (optionIndex === 0) { scores["AI/ML Engineer"].match += 20; scores["Software Engineer"].match += 15; scores["Data Scientist"].match += 12; }
      if (optionIndex === 2) { scores["Clinical Psychologist"].match += 12; scores["Filmmaker / Content Creator"].match += 10; scores["Doctor / Surgeon"].match += 10; }
    }
    if (q.id === 13) {
      if (optionIndex === 0) { scores["Data Scientist"].match += 15; scores["Software Engineer"].match += 12; scores["AI/ML Engineer"].match += 12; }
      if (optionIndex === 1) { scores["Clinical Psychologist"].match += 18; scores["Doctor / Surgeon"].match += 12; scores["Marketing Strategist"].match += 10; }
      if (optionIndex === 2) { scores["UX/Product Designer"].match += 18; scores["Filmmaker / Content Creator"].match += 15; scores["Architect"].match += 12; }
      if (optionIndex === 3) { scores["Architect"].match += 12; scores["Marketing Strategist"].match += 10; scores["Entrepreneur"].match += 10; }
    }
    if (q.id === 29) {
      if (optionIndex === 0) { scores["Data Scientist"].match += 12; scores["Environmental Scientist"].match += 10; scores["Doctor / Surgeon"].match += 10; scores["AI/ML Engineer"].match += 10; }
      if (optionIndex === 1) { scores["Entrepreneur"].match += 20; scores["Software Engineer"].match += 8; }
      if (optionIndex === 2) { scores["Filmmaker / Content Creator"].match += 20; scores["Journalist / Writer"].match += 15; scores["UX/Product Designer"].match += 10; }
      if (optionIndex === 3) { scores["Doctor / Surgeon"].match += 15; scores["Environmental Scientist"].match += 12; scores["Clinical Psychologist"].match += 10; }
    }
  });

  // Normalize to 0-100
  Object.keys(scores).forEach(k => {
    scores[k].match = Math.min(99, Math.max(10, scores[k].match));
  });

  return scores;
}

const CATEGORY_COLORS = {
  personality: "#FF6B6B",
  values: "#4ECDC4",
  skills: "#FFE66D",
  lifestyle: "#A8E6CF",
  future: "#C3A6FF",
  deep: "#FF9A9E",
  adaptive: "#96CEB4",
};

const CATEGORY_LABELS = {
  personality: "Who You Are",
  values: "What You Value",
  skills: "Your Strengths",
  lifestyle: "How You Work",
  future: "Where You're Headed",
  deep: "Deep Self",
  adaptive: "Adaptive"
};

export default function Klarity() {
  const [screen, setScreen] = useState("landing"); // landing, quiz, results, paywall
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [scores, setScores] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [particles, setParticles] = useState([]);
  const progressRef = useRef(null);

  useEffect(() => {
    setParticles(Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    })));
  }, []);

  const totalQuestions = QUESTIONS.length;
  const progress = (currentQ / totalQuestions) * 100;
  const currentQuestion = QUESTIONS[currentQ];

  const handleAnswer = (optionIndex) => {
    if (animating) return;
    setSelectedOption(optionIndex);
    setAnimating(true);
    setTimeout(() => {
      const newAnswers = [...answers, { questionId: currentQuestion.id, optionIndex }];
      setAnswers(newAnswers);
      if (currentQ + 1 >= totalQuestions) {
        const computedScores = scoreCareerPaths(newAnswers);
        setScores(computedScores);
        setScreen("results");
        fetchAIAnalysis(newAnswers, computedScores);
      } else {
        setCurrentQ(currentQ + 1);
        setSelectedOption(null);
      }
      setAnimating(false);
    }, 350);
  };

  const fetchAIAnalysis = async (answeredQuestions, computedScores) => {
    setLoadingAnalysis(true);
    const topCareers = Object.entries(computedScores)
      .sort((a, b) => b[1].match - a[1].match)
      .slice(0, 3)
      .map(([name]) => name);

    const answerSummary = answeredQuestions.slice(0, 15).map(({ questionId, optionIndex }) => {
      const q = QUESTIONS.find(q => q.id === questionId);
      return `Q: "${q?.text}" → "${q?.options[optionIndex]}"`;
    }).join("\n");

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are a career counselor specializing in helping 15–25 year olds find direction. You provide deeply personalized, honest, and inspiring career guidance. Be warm, direct, and specific. Do NOT be generic. Reference the actual answers given. Return exactly 3 sections separated by ||| with NO markdown, no asterisks, no pound signs, no bullet dashes — just clean plain text. Sections: (1) A 3-sentence personality profile (2) Why their top 3 careers (${topCareers.join(", ")}) fit them — 2 sentences each (3) One honest challenge they'll face and how to prepare — 3 sentences total.`,
          messages: [{ role: "user", content: `Based on these career quiz answers, give me a deeply personalized analysis:\n\n${answerSummary}\n\nTop career matches: ${topCareers.join(", ")}` }]
        })
      });
      const data = await response.json();
      const text = data.content?.find(c => c.type === "text")?.text || "";
      setAiAnalysis(text);
    } catch (e) {
      setAiAnalysis("Unable to load analysis. Please refresh.");
    }
    setLoadingAnalysis(false);
  };

  const sortedCareers = scores
    ? Object.entries(scores).sort((a, b) => b[1].match - a[1].match)
    : [];

  const analysisSections = aiAnalysis.split("|||").map(s => s.trim()).filter(Boolean);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0a0f 0%, #0d0d1a 40%, #0a0f0a 100%)",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      color: "#f0f0f0",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 2px; }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes pulse { 0%,100% { opacity: 0.3; } 50% { opacity: 0.8; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes barGrow { from { width: 0; } to { width: var(--target-width); } }
        .slide-up { animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .fade-in { animation: fadeIn 0.4s ease forwards; }
        .option-btn {
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 16px 20px;
          color: #e8e8e8;
          cursor: pointer;
          text-align: left;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          line-height: 1.4;
          transition: all 0.2s;
          width: 100%;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .option-btn:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.25); transform: translateX(4px); }
        .option-btn.selected { background: rgba(120, 220, 160, 0.15); border-color: #78DCA0; color: #fff; }
        .cta-btn {
          background: linear-gradient(135deg, #78DCA0, #4ECDC4);
          border: none;
          border-radius: 50px;
          padding: 16px 40px;
          font-family: 'Syne', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #0a0a0f;
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 0.5px;
        }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(120,220,160,0.35); }
        .career-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 20px;
          transition: all 0.2s;
        }
        .career-card:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.15); }
        .lock-overlay {
          filter: blur(6px);
          pointer-events: none;
          user-select: none;
        }
      `}</style>

      {/* Ambient particles */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {particles.map(p => (
          <div key={p.id} style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: p.id % 3 === 0 ? "#78DCA0" : p.id % 3 === 1 ? "#4ECDC4" : "#C3A6FF",
            animation: `float ${p.speed}s ease-in-out infinite, pulse ${p.speed * 0.7}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
            opacity: 0.2,
          }} />
        ))}
      </div>

      {/* ─── LANDING ─── */}
      {screen === "landing" && (
        <div className="slide-up" style={{ maxWidth: 620, margin: "0 auto", padding: "80px 24px", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(120,220,160,0.1)", border: "1px solid rgba(120,220,160,0.3)", borderRadius: "50px", padding: "6px 16px", fontSize: 13, color: "#78DCA0", marginBottom: 32 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#78DCA0", display: "inline-block" }} />
              Klarity · AI-Powered Career Discovery · 2025
            </div>
          </div>

          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(42px, 8vw, 68px)", fontWeight: 800, lineHeight: 1.05, marginBottom: 20, letterSpacing: "-2px" }}>
            Find Your
            <span style={{ display: "block", background: "linear-gradient(90deg, #78DCA0, #4ECDC4, #C3A6FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Direction.
            </span>
          </h1>

          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 16, maxWidth: 480, margin: "0 auto 16px" }}>
            The world is changing fast. So are careers. This isn't a generic quiz — it's a deep, AI-powered assessment that maps who you truly are to where you'll actually thrive.
          </p>

          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", marginBottom: 48 }}>
            35 questions · ~8 minutes · Instant results
          </p>

          <button className="cta-btn" onClick={() => setScreen("quiz")} style={{ fontSize: 17, padding: "18px 52px" }}>
            Start Your Assessment →
          </button>

          <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              { icon: "🧠", label: "Personality Mapping", desc: "Deep trait analysis" },
              { icon: "🌍", label: "Future-Forward", desc: "AI & 2030 career trends" },
              { icon: "🎯", label: "Precision Matching", desc: "35 adaptive questions" },
            ].map(item => (
              <div key={item.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "20px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, color: "rgba(255,255,255,0.8)" }}>{item.label}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── QUIZ ─── */}
      {screen === "quiz" && currentQuestion && (
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "40px 24px", position: "relative", zIndex: 1 }}>
          {/* Progress */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `rgba(${currentQuestion.category === 'personality' ? '255,107,107' : currentQuestion.category === 'values' ? '78,205,196' : currentQuestion.category === 'skills' ? '255,230,109' : currentQuestion.category === 'future' ? '195,166,255' : '168,230,207'},0.15)`, border: `1px solid rgba(${currentQuestion.category === 'personality' ? '255,107,107' : currentQuestion.category === 'values' ? '78,205,196' : currentQuestion.category === 'skills' ? '255,230,109' : currentQuestion.category === 'future' ? '195,166,255' : '168,230,207'},0.35)`, borderRadius: "50px", padding: "4px 12px", fontSize: 11, color: CATEGORY_COLORS[currentQuestion.category] || "#78DCA0" }}>
                {CATEGORY_LABELS[currentQuestion.category] || currentQuestion.category}
              </div>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>{currentQ + 1} of {totalQuestions}</span>
            </div>
            <div style={{ height: 3, background: "rgba(255,255,255,0.07)", borderRadius: 2 }}>
              <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #78DCA0, #4ECDC4)", borderRadius: 2, transition: "width 0.4s ease" }} />
            </div>
          </div>

          {/* Question */}
          <div key={currentQ} className="slide-up">
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(20px, 4vw, 26px)", fontWeight: 700, lineHeight: 1.3, marginBottom: 32, letterSpacing: "-0.5px", color: "#fff" }}>
              {currentQuestion.text}
            </h2>

            <div>
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  className={`option-btn ${selectedOption === idx ? "selected" : ""}`}
                  onClick={() => handleAnswer(idx)}
                  disabled={animating}
                >
                  <span style={{ width: 28, height: 28, borderRadius: "50%", border: `1.5px solid ${selectedOption === idx ? "#78DCA0" : "rgba(255,255,255,0.2)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 12, color: selectedOption === idx ? "#78DCA0" : "rgba(255,255,255,0.4)", fontWeight: 600, fontFamily: "'Syne', sans-serif" }}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {option}
                </button>
              ))}
            </div>
          </div>

          {currentQ > 0 && (
            <button onClick={() => { setCurrentQ(currentQ - 1); setAnswers(answers.slice(0, -1)); setSelectedOption(null); }} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: 13, marginTop: 16, padding: "8px 0" }}>
              ← Back
            </button>
          )}
        </div>
      )}

      {/* ─── RESULTS ─── */}
      {screen === "results" && scores && (
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px", position: "relative", zIndex: 1 }}>
          <div className="slide-up">
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎯</div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 12 }}>Your Results Are In</h2>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15 }}>Based on your 35 answers, here's where you're headed</p>
            </div>

            {/* Top 3 free careers */}
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "2px", color: "#78DCA0", textTransform: "uppercase", marginBottom: 16 }}>Your Top Matches</h3>

            {sortedCareers.slice(0, 3).map(([name, data], i) => (
              <div key={name} className="career-card" style={{ marginBottom: 12, borderColor: i === 0 ? "rgba(120,220,160,0.3)" : "rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
                  <div style={{ fontSize: 28 }}>{data.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                      <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17 }}>{name}</span>
                      {i === 0 && <span style={{ background: "rgba(120,220,160,0.15)", color: "#78DCA0", fontSize: 10, fontWeight: 700, letterSpacing: "1px", padding: "2px 8px", borderRadius: "50px", textTransform: "uppercase" }}>Best Match</span>}
                    </div>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.4 }}>{data.description}</p>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: i === 0 ? "#78DCA0" : "#fff" }}>{data.match}%</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>match</div>
                  </div>
                </div>
                <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
                  <div style={{ height: "100%", width: `${data.match}%`, background: i === 0 ? "linear-gradient(90deg,#78DCA0,#4ECDC4)" : "rgba(255,255,255,0.25)", borderRadius: 2, transition: "width 1s ease" }} />
                </div>
                <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>💰 {data.salary}</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>📈 {data.growth} growth</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>⏱ {data.timeToEntry}</span>
                </div>
              </div>
            ))}

            {/* AI Analysis — free preview */}
            <div style={{ margin: "32px 0", background: "rgba(120,220,160,0.05)", border: "1px solid rgba(120,220,160,0.2)", borderRadius: 16, padding: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 16 }}>🤖</span>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "#78DCA0", letterSpacing: "1px", textTransform: "uppercase" }}>AI Personality Profile</h3>
              </div>
              {loadingAnalysis ? (
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <div style={{ display: "flex", gap: 4 }}>
                    {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#78DCA0", animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />)}
                  </div>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>Analyzing your responses...</span>
                </div>
              ) : analysisSections.length > 0 ? (
                <p style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,0.65)" }}>{analysisSections[0]}</p>
              ) : null}
            </div>

            {/* Locked section */}
            {!unlocked ? (
              <div style={{ position: "relative", borderRadius: 16, overflow: "hidden" }}>
                <div className="lock-overlay">
                  {sortedCareers.slice(3, 8).map(([name, data]) => (
                    <div key={name} className="career-card" style={{ marginBottom: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 24 }}>{data.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, marginBottom: 4 }}>{name}</div>
                          <div style={{ height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2 }}>
                            <div style={{ height: "100%", width: `${data.match}%`, background: "rgba(255,255,255,0.2)", borderRadius: 2 }} />
                          </div>
                        </div>
                        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18 }}>{data.match}%</span>
                      </div>
                    </div>
                  ))}
                  {analysisSections[1] && <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 20, marginTop: 10, fontSize: 14, lineHeight: 1.7 }}>{analysisSections[1]}</div>}
                </div>
                {/* Lock overlay */}
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(10,10,15,0.85)", backdropFilter: "blur(2px)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>🔒</div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, marginBottom: 8 }}>Unlock Full Results</h3>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", textAlign: "center", maxWidth: 280, lineHeight: 1.6, marginBottom: 24 }}>
                    Get all 12 career matches, deep AI analysis, your full personality report, and a personalized study roadmap.
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                    {["12 careers ranked", "Deep AI analysis", "Study roadmap", "Share results"].map(f => (
                      <span key={f} style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", gap: 4 }}>
                        <span style={{ color: "#78DCA0" }}>✓</span> {f}
                      </span>
                    ))}
                  </div>
                  <button className="cta-btn" onClick={() => setUnlocked(true)}>
                    Unlock for $4.99 →
                  </button>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 10 }}>One-time payment · Instant access</p>
                </div>
              </div>
            ) : (
              <div className="fade-in">
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "2px", color: "#4ECDC4", textTransform: "uppercase", marginBottom: 16, marginTop: 8 }}>All Career Matches</h3>
                {sortedCareers.slice(3).map(([name, data]) => (
                  <div key={name} className="career-card" style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                      <span style={{ fontSize: 22 }}>{data.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, marginBottom: 2 }}>{name}</div>
                        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{data.description}</p>
                      </div>
                      <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: "rgba(255,255,255,0.6)" }}>{data.match}%</span>
                    </div>
                    <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
                      <div style={{ height: "100%", width: `${data.match}%`, background: "rgba(78,205,196,0.5)", borderRadius: 2 }} />
                    </div>
                  </div>
                ))}

                {analysisSections.slice(1).map((section, i) => (
                  <div key={i} style={{ background: "rgba(195,166,255,0.05)", border: "1px solid rgba(195,166,255,0.15)", borderRadius: 16, padding: 24, marginTop: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                      <span style={{ fontSize: 16 }}>{i === 0 ? "🎯" : "⚡"}</span>
                      <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: "#C3A6FF", letterSpacing: "1px", textTransform: "uppercase" }}>
                        {i === 0 ? "Why These Careers Fit You" : "Your Challenge Ahead"}
                      </h3>
                    </div>
                    <p style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,0.65)" }}>{section}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Retake */}
            <div style={{ textAlign: "center", marginTop: 40 }}>
              <button onClick={() => { setScreen("landing"); setAnswers([]); setCurrentQ(0); setScores(null); setAiAnalysis(""); setUnlocked(false); }} style={{ background: "none", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "50px", padding: "10px 28px", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
                ↺ Start Over
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
