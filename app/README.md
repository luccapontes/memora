# Memora - App Educacional

Um aplicativo mobile desenvolvido em React Native com Expo para ajudar estudantes do ensino médio a memorizarem conteúdos vistos em sala de aula.

## 🚀 Funcionalidades

### Telas Implementadas

1. **Onboarding** - Tela de boas-vindas com design fluido
2. **Login** - Tela de login com validação e autenticação
3. **Cadastro de Usuário** - Formulário completo de registro com validação
4. **Home (Início)** - Dashboard principal com atividades do dia
5. **Resumos** - Lista de resumos por matéria com filtros
6. **Quiz** - Sistema de perguntas e respostas
7. **Notificações** - Lista de notificações do dia
8. **Progresso** - Estatísticas e métricas de performance
9. **Meus Dados** - Perfil do usuário e configurações
10. **Meu Perfil** - Visualização e edição de dados pessoais
11. **Análise Geral** - Gráficos e correlações de performance
12. **Conteúdos Estudados** - Histórico de resumos e quizzes

### Características

- ✅ Sistema de autenticação completo
- ✅ Validação de formulários com react-hook-form e yup
- ✅ Navegação completa entre todas as telas
- ✅ Dados mockados para demonstração
- ✅ Interface moderna e intuitiva
- ✅ Componentes reutilizáveis
- ✅ TypeScript para type safety
- ✅ Design responsivo
- ✅ Ícones do Ionicons
- ✅ Persistência de dados (localStorage/AsyncStorage)

## 🛠️ Tecnologias Utilizadas

- **React Native** - Framework principal
- **Expo** - Plataforma de desenvolvimento
- **TypeScript** - Linguagem de programação
- **React Navigation** - Navegação entre telas
- **React Hook Form** - Gerenciamento de formulários
- **Yup** - Validação de esquemas
- **Expo Vector Icons** - Ícones
- **Context API** - Gerenciamento de estado global

## 📁 Estrutura do Projeto

```
app/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   ├── contexts/           # Contextos globais
│   │   └── AuthContext.tsx
│   ├── data/               # Dados mockados
│   │   └── mockData.ts
│   ├── navigation/         # Configuração de navegação
│   │   └── AppNavigator.tsx
│   ├── screens/           # Telas do aplicativo
│   │   ├── HomeScreen.tsx
│   │   ├── OnboardingScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── UserProfileScreen.tsx
│   │   ├── GeneralAnalysisScreen.tsx
│   │   ├── StudiedContentScreen.tsx
│   │   ├── ProgressScreen.tsx
│   │   ├── QuizScreen.tsx
│   │   ├── SummariesScreen.tsx
│   │   └── NotificationsScreen.tsx
│   ├── types/             # Definições de tipos
│   │   └── index.ts
│   └── utils/             # Utilitários
│       └── storage.ts
├── App.tsx                # Componente principal
└── package.json
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Expo CLI

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd memora/app
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
# Para web
npm run web

# Para mobile
npm start
```

4. Use o Expo Go no seu dispositivo móvel para escanear o QR code ou execute em um emulador.

## 🔐 Sistema de Autenticação

### Credenciais de Demonstração

- **E-mail**: sofia@escola.com
- **Senha**: 123456

### Funcionalidades

- Login com validação
- Registro de novos usuários
- Persistência de sessão
- Logout
- Proteção de rotas

## 📱 Telas do Aplicativo

### Onboarding
- Design fluido com formas geométricas
- Botão "Get Started" para iniciar

### Login
- Formulário com validação
- Campos: e-mail e senha
- Credenciais de demonstração
- Link para cadastro

### Cadastro
- Formulário completo com validação
- Campos: nome, email, CPF, data de nascimento, turma, senha
- Validação em tempo real
- Link para login

### Home
- Saudação personalizada
- Cards de atividades do dia
- Barra de progresso diária
- Calendário de revisões

### Resumos
- Filtros por matéria
- Cards com imagens e descrições
- Busca integrada

### Quiz
- Sistema de perguntas e respostas
- Barra de progresso
- Feedback final com pontuação

### Notificações
- Lista organizada por tipo
- Imagens associadas
- Horários e emojis

### Progresso
- Estatísticas gerais
- Performance por matéria
- Gráficos de progresso

### Meus Dados
- Informações do perfil
- Menu de opções
- Botão de logout

### Meu Perfil
- Visualização de dados pessoais
- Edição de informações
- Estatísticas do usuário
- Logout

### Análise Geral
- Performance geral
- Gráficos de progresso
- Tendências de aprendizado
- Recomendações

### Conteúdos Estudados
- Histórico de resumos
- Histórico de quizzes
- Filtros por matéria
- Estatísticas

## 🔄 Fluxo de Navegação

```
Onboarding → Login/Register → MainTabs (Home, Resumos, Quizzes, Progresso, Meus Dados)
                                    ↓
                              Sub-telas (Meu Perfil, Análise Geral, Conteúdos Estudados)
```

## 📊 Dados Mockados

O aplicativo utiliza dados simulados para demonstração:

- **Usuários**: Sofia e João (estudantes)
- **Quizzes**: 5 questões de diferentes matérias
- **Resumos**: 3 resumos (Matemática, Português, História)
- **Notificações**: 2 notificações (agendada e recebida)
- **Progresso**: Métricas de performance

## 🎨 Design System

### Cores
- **Primária**: #4A90E2 (Azul)
- **Secundária**: #666 (Cinza)
- **Background**: #F8F9FA (Cinza claro)
- **Texto**: #000 (Preto)
- **Erro**: #FF6B6B (Vermelho)

### Tipografia
- **Títulos**: 18-24px, bold
- **Corpo**: 14-16px, regular
- **Legendas**: 12-14px, regular

### Ícones
- **Biblioteca**: Expo Vector Icons (Ionicons)
- **Estilo**: Outline e filled
- **Tamanhos**: 16px, 20px, 24px

## 🔮 Próximos Passos

- [ ] Integração com backend
- [ ] Push notifications
- [ ] Modo offline
- [ ] Testes automatizados
- [ ] Deploy para produção
- [ ] Analytics e métricas
- [ ] Gamificação
- [ ] Social features

## 📄 Licença

Este projeto está sob a licença MIT. 