# Prompt para ChatGPT - Desenvolvimento de Backoffice/CRM para Memora

## Contexto do Projeto

Estou desenvolvendo um aplicativo educacional chamado **Memora** que ajuda estudantes do ensino médio a memorizarem conteúdos vistos em sala de aula. O projeto já possui:

### Aplicativo Mobile (React Native + Expo)
- Sistema de autenticação completo
- Telas: Onboarding, Login, Cadastro, Home, Resumos, Quizzes, Progresso, Perfil
- Navegação completa entre todas as telas
- Dados mockados para demonstração
- Interface moderna e intuitiva

### Backend (Node.js + Express + MongoDB)
- Autenticação JWT
- Modelos: User, Summary, Quiz, Progress
- API RESTful
- Validação de dados
- Middleware de autenticação

## Necessidade: Backoffice/CRM

Preciso desenvolver um **sistema de backoffice/CRM** completo para gerenciar o aplicativo Memora. Este sistema deve permitir que administradores e professores gerenciem usuários, conteúdos, relatórios e configurações.

## Escopo Detalhado

### 1. **Sistema de Autenticação e Autorização**
- Login para administradores e professores
- Diferentes níveis de acesso (Admin, Professor, Coordenador)
- Gerenciamento de permissões por módulo
- Recuperação de senha
- Logs de acesso

### 2. **Dashboard Principal**
- Visão geral do sistema
- Métricas em tempo real:
  - Total de usuários ativos
  - Quizzes respondidos hoje
  - Resumos acessados
  - Performance média dos alunos
- Gráficos e estatísticas
- Alertas e notificações

### 3. **Gestão de Usuários**
- Listagem de todos os usuários (estudantes)
- Filtros por: turma, matéria, status, data de cadastro
- Visualização de perfil completo
- Edição de dados do usuário
- Ativação/desativação de contas
- Histórico de atividades
- Exportação de dados

### 4. **Gestão de Conteúdos**
- **Resumos:**
  - CRUD completo de resumos
  - Upload de imagens
  - Editor de texto rico
  - Categorização por matéria
  - Controle de status (ativo/inativo)
  - Preview do conteúdo
  - Estatísticas de acesso

- **Quizzes:**
  - CRUD completo de quizzes
  - Criação de perguntas com múltiplas alternativas
  - Categorização por matéria e dificuldade
  - Explicações para respostas
  - Estatísticas de acerto/erro
  - Banco de questões

### 5. **Relatórios e Analytics**
- **Relatórios de Performance:**
  - Performance por aluno
  - Performance por turma
  - Performance por matéria
  - Evolução temporal
  - Comparativos

- **Relatórios de Uso:**
  - Conteúdos mais acessados
  - Tempo médio de estudo
  - Frequência de uso
  - Engajamento por período

- **Relatórios de Conteúdo:**
  - Quizzes mais difíceis/fáceis
  - Resumos mais populares
  - Taxa de conclusão

### 6. **Gestão de Turmas e Matérias**
- CRUD de turmas
- Associação de alunos a turmas
- Gestão de matérias
- Configuração de professores por matéria
- Calendário acadêmico

### 7. **Sistema de Notificações**
- Envio de notificações push
- Notificações por turma/matéria
- Agendamento de notificações
- Templates de mensagens
- Histórico de envios

### 8. **Configurações do Sistema**
- Configurações gerais
- Personalização de interface
- Configurações de email
- Backup e restauração
- Logs do sistema

## Tecnologias Sugeridas

### Frontend (Backoffice)
- **React** ou **Next.js** (TypeScript)
- **Material-UI** ou **Ant Design** para componentes
- **React Query** ou **SWR** para gerenciamento de estado
- **React Hook Form** para formulários
- **Recharts** ou **Chart.js** para gráficos
- **React Router** para navegação

### Backend (APIs)
- **Node.js** + **Express** (TypeScript)
- **MongoDB** + **Mongoose**
- **JWT** para autenticação
- **Multer** para upload de arquivos
- **Nodemailer** para emails
- **Cron** para tarefas agendadas

### Infraestrutura
- **Docker** para containerização
- **Nginx** como proxy reverso
- **Redis** para cache
- **AWS S3** ou similar para armazenamento de arquivos

## Estrutura de Banco de Dados

### Tabelas Principais (MongoDB Collections)

1. **Users** (já existe)
   - Dados dos estudantes
   - Histórico de login
   - Status da conta

2. **Admins** (nova)
   - Administradores do sistema
   - Níveis de acesso
   - Permissões

3. **Teachers** (nova)
   - Professores
   - Matérias associadas
   - Turmas responsáveis

4. **Classes** (nova)
   - Turmas
   - Alunos associados
   - Professores responsáveis

5. **Subjects** (nova)
   - Matérias
   - Descrição
   - Status

6. **Summaries** (já existe)
   - Conteúdo dos resumos
   - Metadados
   - Estatísticas

7. **Quizzes** (já existe)
   - Perguntas e alternativas
   - Respostas corretas
   - Estatísticas

8. **Progress** (já existe)
   - Progresso dos alunos
   - Histórico de atividades

9. **Notifications** (nova)
   - Notificações enviadas
   - Templates
   - Agendamentos

10. **SystemLogs** (nova)
    - Logs de acesso
    - Logs de ações
    - Auditoria

## APIs Necessárias

### Autenticação
- `POST /api/admin/auth/login`
- `POST /api/admin/auth/logout`
- `GET /api/admin/auth/profile`
- `PUT /api/admin/auth/profile`

### Usuários
- `GET /api/admin/users` (com filtros)
- `GET /api/admin/users/:id`
- `PUT /api/admin/users/:id`
- `DELETE /api/admin/users/:id`
- `POST /api/admin/users/export`

### Conteúdos
- `GET /api/admin/summaries`
- `POST /api/admin/summaries`
- `PUT /api/admin/summaries/:id`
- `DELETE /api/admin/summaries/:id`
- `POST /api/admin/summaries/:id/upload`

- `GET /api/admin/quizzes`
- `POST /api/admin/quizzes`
- `PUT /api/admin/quizzes/:id`
- `DELETE /api/admin/quizzes/:id`

### Relatórios
- `GET /api/admin/reports/performance`
- `GET /api/admin/reports/usage`
- `GET /api/admin/reports/content`
- `POST /api/admin/reports/export`

### Configurações
- `GET /api/admin/settings`
- `PUT /api/admin/settings`
- `GET /api/admin/logs`

## Funcionalidades Específicas

### 1. **Editor de Conteúdo**
- Editor WYSIWYG para resumos
- Suporte a imagens, vídeos, links
- Preview em tempo real
- Versionamento de conteúdo

### 2. **Sistema de Upload**
- Upload de imagens para resumos
- Compressão automática
- Validação de tipos de arquivo
- CDN para distribuição

### 3. **Dashboard Interativo**
- Gráficos interativos
- Filtros dinâmicos
- Exportação de dados
- Atualização em tempo real

### 4. **Sistema de Backup**
- Backup automático do banco
- Backup de arquivos
- Restauração de dados
- Logs de backup

## Considerações de Segurança

- Autenticação JWT com refresh tokens
- Rate limiting
- Validação de entrada
- Sanitização de dados
- Logs de auditoria
- Criptografia de dados sensíveis
- HTTPS obrigatório

## Considerações de Performance

- Paginação em todas as listagens
- Cache Redis para dados frequentes
- Lazy loading de componentes
- Otimização de queries
- CDN para assets estáticos
- Compressão de respostas

## Cronograma Sugerido

### Fase 1 (2-3 semanas)
- Setup do projeto
- Sistema de autenticação
- Dashboard básico
- CRUD de usuários

### Fase 2 (2-3 semanas)
- Gestão de conteúdos
- Upload de arquivos
- Editor de texto rico

### Fase 3 (2-3 semanas)
- Relatórios e analytics
- Gráficos e visualizações
- Exportação de dados

### Fase 4 (1-2 semanas)
- Sistema de notificações
- Configurações avançadas
- Testes e refinamentos

## Perguntas para o ChatGPT

1. **Arquitetura:** Qual a melhor arquitetura para este backoffice considerando escalabilidade e manutenibilidade?

2. **Tecnologias:** Quais tecnologias você recomenda para o frontend e backend do backoffice?

3. **Banco de Dados:** Como estruturar as novas tabelas/collections para suportar todas as funcionalidades?

4. **APIs:** Quais endpoints específicos você sugere para cada funcionalidade?

5. **Segurança:** Quais medidas de segurança são essenciais para um sistema de backoffice educacional?

6. **Performance:** Como otimizar o sistema para lidar com muitos usuários e dados?

7. **UX/UI:** Quais padrões de interface você recomenda para um backoffice educacional?

8. **Deploy:** Qual a melhor estratégia de deploy e infraestrutura?

9. **Testes:** Como estruturar os testes (unitários, integração, e2e)?

10. **Documentação:** Que tipo de documentação é essencial para o projeto?

Por favor, forneça um escopo detalhado, estrutura de banco de dados, APIs necessárias e recomendações técnicas para implementar este backoffice/CRM completo. 