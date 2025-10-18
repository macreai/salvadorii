import './App.css';
import IconUrl from './components/IconUrl';
import ChatRoom from './components/ChatRoom';
import UserInput from './components/UserInput';
import Credit from './components/Credit';
import { useApp } from './useApp';

function App() {

  const { input, setInput, inputRef, queryPrompt, addToChats, chats, progressState, url, emoji } = useApp();

  return (
    <div className="flex flex-col">
      <main className="flex-1">
        <IconUrl 
          url={url}
          emoji={emoji}
        />
        <div className="max-w-lg mx-auto space-y-6">
          <ChatRoom
            chats={chats}
            progressState={progressState}
          />
          <UserInput
            addToChats={addToChats}
            input={input}
            setInput={setInput}
            inputRef={inputRef}
            queryPrompt={queryPrompt}
          />
        </div>
       <Credit />
      </main>
    </div>
  );
}

export default App;
