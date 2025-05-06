import './App.css';
import NotesComponent from './components/NotesComponent'; 


function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1></h1>
      </header>
      
      <main className="app-main">
        <NotesComponent />
      </main>

      <footer className="app-footer">
        <p>© 2023 Приложение для заметок</p>
      </footer>
    </div>
  );
}

export default App
