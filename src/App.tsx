// import { useEffect, useState } from 'react';
// import './App.css'
// import { useStore } from './model/zustand';

// function App() {
//   const { url, setUrl, question } = useStore();
//   const [answer, setAnswer] = useState<string | null>(null);
//   const [input, setInput] = useState("");

//   // Ambil URL tab aktif saat mount
//   useEffect(() => {
//     setUrl();
//   }, []);

//   // Fungsi untuk kirim pertanyaan
//   const handleAsk = async () => {
//     if (!input) return;
//     const response = await question(input);  // async
//     setAnswer(response || "No response");
//   };

//   return (
//     <div style={{ padding: "1rem" }}>
//       <h2>Active URL:</h2>
//       <p>{url || "Fetching..."}</p>

//       <h2>Ask a question:</h2>
//       <input
//         type="text"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Type your question"
//       />
//       <button onClick={handleAsk}>Ask</button>

//       <h2>Answer:</h2>
//       <p>{answer || "No answer yet"}</p>
//     </div>
//   );
// }

// export default App;

import './App.css';
import LiquidGlassContainer from './components/LiquidGlassContainer';

function App() {
  const url = "URL";

  return (
    <div className="flex flex-col">
      <main className="flex-1">
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex items-center gap-3">
            <LiquidGlassContainer className="flex items-center justify-center w-20 h-20 rounded-4xl">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-20 h-20 object-cover scale-110"
              />
            </LiquidGlassContainer>

            <LiquidGlassContainer className="flex items-center justify-center w-70 h-20 px-3 text-white rounded-4xl">
              <span className="truncate text-nowrap">
                {url.length > 30 ? url.slice(0, 30) + '...' : url}
              </span>
            </LiquidGlassContainer>
          </div>
        </div>

        <div className="max-w-lg mx-auto space-y-6">
          <LiquidGlassContainer className="w-full h-60 flex flex-col p-4 overflow-y-auto rounded-4xl">
            <div className="flex-1 space-y-2 text-white/80">
              
            </div>
          </LiquidGlassContainer>

          <div className="flex items-center gap-3 w-full">
            <LiquidGlassContainer className="flex-1 rounded-4xl">
              <input
                type="text"
                className="w-full bg-transparent outline-none text-white placeholder-white/70"
                placeholder="Ask your question"
              />
            </LiquidGlassContainer>
            <LiquidGlassContainer className='rounded-4xl'>
              <button
                onClick={() => alert('OK!')}
                className="bg-transparent text-white"
              >
                Send
              </button>
            </LiquidGlassContainer>
          </div>
        </div>
        <div className="w-full py-4 mt-6">
          <div className="max-w-lg mx-auto">
              © {new Date().getFullYear()} Salvadorii · by Macreai
          </div>
        </div>
      </main>

    </div>
  );
}

export default App;
