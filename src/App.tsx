import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Landing } from './pages/Landing';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Success } from './pages/Success';

type Page = 'landing' | 'register' | 'login' | 'success';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [authenticatedUser, setAuthenticatedUser] = useState<string | null>(null);
  const [authMethod, setAuthMethod] = useState<string>('cued-click-points');

  const handleLogin = (username: string, method: string) => {
    setAuthenticatedUser(username);
    setAuthMethod(method);
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
            authMethod={authMethod}
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

  return (
    <AuthProvider>
      {renderPage()}
    </AuthProvider>
  );
}

export default App;
