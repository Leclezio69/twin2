'use client';

import TwinTwo from '@/components/twin-two';
import { Sparkles, MessageSquare, Brain, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

const allQuestions = [
  // Achievements & Results
  "How did you achieve 80% reduction in audit returns at Citi?",
  "Tell me about your $30M portfolio optimization at Deutsche Bank",
  "How did you improve operational accuracy by 30% at Credit Suisse?",
  "How did you achieve 95% staff retention in your teams?",
  "How did you enhance Internal Audit Validation efficiency by 25%?",
  "Tell me about delivering 100% of programs within budget",

  // Regulatory & Compliance
  "What regulatory programs have you led?",
  "What's your experience with AML and compliance transformations?",
  "How do you turn regulatory findings into actionable delivery plans?",
  "What's your experience with MRA governance and consent orders?",
  "How do you balance speed of delivery with regulatory rigor?",
  "What does 'good control' actually look like in practice?",

  // Leadership & Career
  "What leadership roles have you held in banking?",
  "How would you describe your leadership style?",
  "How do you lead teams through ambiguity or regulatory pressure?",
  "How do you build trust quickly with senior leadership?",
  "What mistakes have taught you the most as a leader?",
  "What skills have mattered most as you progressed into senior roles?",

  // Banks & Experience
  "Tell me about your work at Bank of America",
  "What did you accomplish at Deutsche Bank over 15 years?",
  "What was your role at Credit Suisse?",
  "Tell me about your time at Citi in Private Banking",
  "What did you do at Israel Discount Bank?",
  "How did you build the valuation business at Deutsche Bank?",

  // Military Background
  "Tell me about your military background in 1 Parachute Battalion",
  "How did your military background influence your professional life?",
  "What skills did you develop as a paratrooper?",

  // AI & Technology
  "What's your experience with Generative AI and agentic systems?",
  "Where do you see AI delivering real value in regulated environments?",
  "Why are you focused on applied AI rather than experimentation?",
  "What needs to change for AI agents to operate safely in production?",
  "What advice would you give leaders who want to move beyond AI pilots?",
  "How do you think about AI risk, model governance, and accountability?",

  // Decision Making & Pressure
  "How do you make decisions with incomplete information?",
  "What does staying calm under pressure actually look like?",
  "How do you prioritize when everything is 'urgent'?",
  "How do you handle stakeholder resistance or competing priorities?",

  // Global Experience
  "What countries have you worked in?",
  "How did your global career shape your perspective on leadership?",
  "Tell me about leading teams across New York, London, and Bangalore",

  // Process & Governance
  "What's your approach to regulatory compliance?",
  "How do you prevent PMO processes from becoming bureaucratic?",
  "What's the biggest misconception about governance in large institutions?",
  "How do you know when a program is genuinely on track?",

  // Transformation
  "How do you approach digital transformation projects?",
  "What's the most complex transformation you've led?",
  "What lessons have you carried from global banks that apply across industries?",
  "What kinds of problems do organizations typically bring you in to solve?",

  // Personal & Fun Facts
  "What do you do to reset outside of work?",
  "What's something people would be surprised to learn about you?",
  "Tell me about your scuba diving hobby",
  "What are your certifications?",
  "If you weren't in finance and technology, what would you be doing?",

  // Skills & Approach
  "What's your Lean Six Sigma experience?",
  "How do you manage cross-functional teams?",
  "Tell me about your experience with process automation",
  "What differentiates you from other transformation leaders?",
  "How do you bridge business, risk, compliance, and technology?",
];

function getRandomQuestions(count: number) {
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function DigitalTwinTwoPage() {
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);

  useEffect(() => {
    setSuggestedQuestions(getRandomQuestions(6));
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Hero Section */}
      <header className="border-b border-purple-500/20 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Richard's Digital Twin 2.0
                </h1>
                <p className="text-sm text-slate-400">AI-Powered Professional Assistant</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs text-green-400 font-medium">Online</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Features Banner */}
      <div className="border-b border-purple-500/10 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 text-slate-300">
              <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium">24/7 Availability</p>
                <p className="text-xs text-slate-500">Ask me anything, anytime</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-slate-300">
              <div className="w-8 h-8 bg-pink-500/10 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-pink-400" />
              </div>
              <div>
                <p className="text-sm font-medium">Powered by AI</p>
                <p className="text-xs text-slate-500">GPT-4o intelligent responses</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-slate-300">
              <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium">Instant Insights</p>
                <p className="text-xs text-slate-500">Get answers in seconds</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="mb-2">
            <h2 className="text-3xl font-bold text-slate-100">
              Meet My Digital Twin
            </h2>
          </div>
          <p className="text-slate-400 text-lg">
            Ask me anything about my professional background, work experience, skills, and achievements
            across 20+ years in global banking, regulatory transformation, and technology leadership.
          </p>
        </div>

        {/* Chat Component */}
        <TwinTwo />

        {/* Suggested Questions */}
        <div className="mt-8 bg-slate-900/30 border border-purple-500/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
            Try asking about:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {suggestedQuestions.map((question, idx) => (
              <div
                key={idx}
                className="px-4 py-3 bg-slate-800/50 border border-purple-500/10 rounded-lg hover:border-purple-500/30 transition-colors cursor-pointer group"
              >
                <p className="text-sm text-slate-300 group-hover:text-purple-300 transition-colors">
                  "{question}"
                </p>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-purple-500/10 bg-slate-900/30 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-slate-400">
            <p>
              © 2025 Richard's Digital Twin. Powered by Next.js & OpenAI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
