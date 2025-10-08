import { useState } from 'react';
import { Landing } from './pages/Landing';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Success } from './pages/Success';

type Page = 'landing' | 'register' | 'login' | 'success';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [authenticatedUser, setAuthenticatedUser] = useState<string | null>(null);

  const handleLogin = (username: string) => {
    setAuthenticatedUser(username);
  };

  const handleLogout = () => {
    setAuthenticatedUser(null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <Landing onNavigate={setCurrentPage} />;
      case 'register':
        return <Register onNavigate={setCurrentPage} />;
      case 'login':
        return <Login onNavigate={setCurrentPage} onLogin={handleLogin} />;
      case 'success':
        return authenticatedUser ? (
          <Success
            username={authenticatedUser}
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
          />
        ) : (
          <Landing onNavigate={setCurrentPage} />
        );
      default:
        return <Landing onNavigate={setCurrentPage} />;
    }
  };

  return <>{renderPage()}</>;
}

export default App;
