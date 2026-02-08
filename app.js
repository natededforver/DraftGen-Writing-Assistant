const { useMemo, useState } = React;

const formatDate = (value) => {
  const pad = (num) => String(num).padStart(2, "0");
  const month = pad(value.getMonth() + 1);
  const day = pad(value.getDate());
  const year = value.getFullYear();
  return `${month}/${day}/${year}`;
};

const Header = ({ title }) => {
  const today = useMemo(() => formatDate(new Date()), []);

  return (
    <header className="header">
      <div>
        <div className="header__system">SYSTEM: DRAFTGEN-OS V1.0.4</div>
        <div className="header__section">&gt;&gt; {title}</div>
      </div>
      <div className="header__date">{today}</div>
    </header>
  );
};

const TerminalFrame = ({ children }) => (
  <div className="terminal-frame">
    <div className="terminal-frame__inner">{children}</div>
  </div>
);

const AuthScreen = ({ onConnect }) => {
  const [command, setCommand] = useState("");
  const [status, setStatus] = useState("WAITING");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (command.trim().toLowerCase() === "connect chatgpt") {
      setStatus("OK");
      setTimeout(() => onConnect(), 600);
      return;
    }
    setStatus("WAITING");
  };

  return (
    <TerminalFrame>
      <Header title="AUTH_GATEWAY" />
      <div className="divider" />
      <main className="auth">
        <h1 className="auth__logo">DRAFTGEN</h1>
        <div className="auth__log">
          <div>Writing Assistant Interface initialized...</div>
          <div>Loading stylistic mimicry modules... [OK]</div>
          <div>Checking ChatGPT API connection... [{status}]</div>
        </div>
        <form className="command" onSubmit={handleSubmit}>
          <div className="command__header">
            To proceed, please establish a connection.
          </div>
          <div className="command__line">
            Type <span className="command__accent">connect chatgpt</span> to
            authenticate.
          </div>
          <label className="command__input">
            <span>&gt;</span>
            <input
              type="text"
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              placeholder="awaiting_command..."
            />
          </label>
        </form>
        <div className="auth__footer">
          Use 'help' for available commands. (Mock Mode: just type 'connect
          chatgpt')
        </div>
      </main>
    </TerminalFrame>
  );
};

const FolderCard = ({ folder, onOpen }) => (
  <button className="folder" type="button" onClick={() => onOpen(folder.id)}>
    <div className="folder__title">
      <span className="folder__icon">📁</span>
      {folder.name}
    </div>
    <div className="folder__meta">ID: {folder.id}</div>
    <div className="folder__stats">
      <div className="folder__row">
        <span>KNOWLEDGE_ITEMS</span>
        <span>{folder.knowledgeItems}</span>
      </div>
      <div className="folder__row">
        <span>DRAFTS</span>
        <span>{folder.drafts}</span>
      </div>
    </div>
    <div className="folder__action">&gt; CLICK TO OPEN</div>
  </button>
);

const DirectoryScreen = ({ folders, onOpenFolder }) => (
  <TerminalFrame>
    <Header title="PROJECT_DIRECTORY" />
    <div className="divider" />
    <main className="directory">
      <div className="directory__header">
        <div className="directory__path">
          <span className="directory__icon">📁</span>
          /root/projects
        </div>
        <div className="directory__actions">
          <button className="pill">[+] NEW DIRECTORY</button>
          <button className="pill pill--danger">[X] LOGOUT</button>
        </div>
      </div>
      <div className="directory__grid">
        {folders.map((folder) => (
          <FolderCard
            key={folder.id}
            folder={folder}
            onOpen={onOpenFolder}
          />
        ))}
      </div>
    </main>
  </TerminalFrame>
);

const App = () => {
  const [connected, setConnected] = useState(false);
  const folders = [
    {
      id: "DEMO-1",
      name: "scifi-novel-draft",
      knowledgeItems: 2,
      drafts: 0,
    },
  ];

  return connected ? (
    <DirectoryScreen folders={folders} onOpenFolder={() => {}} />
  ) : (
    <AuthScreen onConnect={() => setConnected(true)} />
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
