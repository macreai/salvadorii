import { appHooks } from "../hooks";
import { useStore } from "../model/zustand";
import LiquidGlassContainer from "./common/LiquidGlassContainer";

const UserInput = () => {

    const { input, setInput, inputRef } = appHooks();

    const { queryPrompt, addToChats } = useStore();

    const handleSubmit = () => {
        if (!input.trim()) return;
        queryPrompt(input);
        addToChats({ fromAi: false, content: input });
        setInput("");
    };

    return (
        <div className="flex items-center gap-3 w-full">
            <LiquidGlassContainer className="flex-1 rounded-4xl" onClick={() => inputRef.current?.focus()}>
              <input
                type="text"
                className="w-full bg-transparent outline-none text-white placeholder-white/70"
                placeholder="Ask your question"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                ref={inputRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
            </LiquidGlassContainer>
            <LiquidGlassContainer className='rounded-4xl' onClick={handleSubmit}>
              <button
                className="bg-transparent text-white"
              >
                Send
              </button>
            </LiquidGlassContainer>
          </div>
    )
}

export default UserInput;