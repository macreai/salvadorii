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
import LiquidGlassContainer from './components/common/LiquidGlassContainer';

function App() {

  const url = "URL Check URL Check URL Check URL Check "

  return (
      <>        
        <div className="flex flex-col gap-4 mb-4">

          <div className="flex items-center gap-3">
            <LiquidGlassContainer className='flex items-center justify-center w-30 h-30 rounded-2xl'>
              <img src="/logo.png" alt="Logo" className="w-30 h-30 object-cover scale-110" />
            </LiquidGlassContainer>

            <LiquidGlassContainer className='flex items-center justify-center w-70 h-30 px-3 text-white rounded-2xl'>
              <span className="truncate text-nowrap">
                {url.length > 30 ? url.slice(0, 30) + '...' : url}
              </span>
            </LiquidGlassContainer>
          </div>


        </div>


        <LiquidGlassContainer className='h-100'>
          Hello
        </LiquidGlassContainer>
      </>
  );
}

export default App;
