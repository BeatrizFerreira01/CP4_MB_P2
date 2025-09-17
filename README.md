# Lista Tarefas Plus

Aplicativo mobile em **Expo (React Native)** com autenticação Firebase, tarefas por usuário em **Firestore**, **tema claro/escuro** persistente, **i18n (PT/EN)**, **notificações locais** agendadas e **TanStack Query** (frases motivacionais).

## 👥 Equipe
- Beatriz Ferreira Cruz — RM555698  
- Gabrielly Campos Macedo — RM558962

## ✅ Requisitos do CheckPoint
- Autenticação **Google** e **E-mail/Senha** (Firebase) — configure os client IDs do Google em `app.json` (ver abaixo).  
- **Login persistente** com `initializeAuth` + `AsyncStorage`.  
- **Firestore por usuário** com **onSnapshot** (tempo real) e CRUD completo.  
- **Tema claro/escuro** com persistência.  
- **i18n PT/EN** com troca dinâmica.  
- **Notificações locais** com agendamento e reprogramação ao editar.  
- **TanStack Query** consumindo `https://api.quotable.io/random`.

## 🏗️ Estrutura
```
src/
  components/TaskItem.js
  contexts/{AuthContext.js, ThemeContext.js}
  firebase/config.js
  hooks/useQuote.js
  i18n/{index.js,en.json,pt.json}
  navigation/index.js
  screens/{SignInScreen,TaskListScreen,TaskFormScreen,SettingsScreen}.js
  services/{tasks.js,notifications.js}
App.js
```

## 🔧 Setup
1. **Node:** 18.x / npm 9+  
2. **Instalar deps:** `npm install`  
3. **Firebase:** credenciais mantidas em `src/firebase/config.js` (preservadas do seu projeto).  
4. **Google Sign-In:** adicione em `app.json` → `expo.extra.googleIds` os 3 client IDs (`iosClientId`, `androidClientId`, `webClientId`).  
5. **Rodar:** `npm run start` (Expo Go ou emulador).

## 🔔 Notificações
- Pede permissão na primeira execução.
- Android: canal `default` configurado automaticamente.

## 🌐 TanStack Query
- `src/hooks/useQuote.js` consulta e cacheia por ~30 min.

## ▶️ EAS Build (APK)
- Arquivo `eas.json` incluso com **profile `preview`** gerando **APK**.
- Com a CLI logada: `eas build -p android --profile preview`  
- Depois do build, baixe o **.apk** na página do job.

## 🧪 Checklist demo
- Login (E-mail + Google)
- CRUD de tarefas em tempo real
- Alternar tema / idioma
- Agendar notificação e mostrar disparo
- Frase motivacional no topo
