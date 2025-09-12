import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './src/contexts/AuthContext';
import { ThemeProvider, useThemeSwitcher } from './src/contexts/ThemeContext';
import './src/i18n'; // inicializa i18n
import Routes from './src/navigation';

const queryClient = new QueryClient();

function AppProviders() {
  const { navTheme, paperTheme } = useThemeSwitcher();
  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={navTheme}>
        <Routes />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <AppProviders />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
