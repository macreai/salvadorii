import './App.css';
import IconUrl from './components/IconUrl';
import ChatRoom from './components/ChatRoom';
import UserInput from './components/UserInput';
import Credit from './components/Credit';

function App() {

  return (
    <div className="flex flex-col">
      <main className="flex-1">
        <IconUrl />
        <div className="max-w-lg mx-auto space-y-6">
          <ChatRoom />
          <UserInput />
        </div>
       <Credit />
      </main>

    </div>
  );
}

export default App;
