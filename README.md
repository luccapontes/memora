# 📚 Memora

O **Memora** é um aplicativo educacional focado em ajudar estudantes do ensino médio e cursinho a memorizarem os conteúdos aprendidos em sala de aula, com base na técnica de **revisão espaçada**. Professores cadastram conteúdos e quizzes através de um CRM, e os alunos recebem notificações personalizadas para revisar e testar seus conhecimentos.

---

## 🚀 Visão Geral

- Aplicativo mobile desenvolvido em **React Native + Expo**
- Backend em **Node.js + Express + MySQL**
- CRM web (em desenvolvimento) para professores e administradores
- Funcionalidades principais:
  - Cadastro e login de alunos com validação por turma
  - Visualização de resumos por matéria
  - Quizzes com correção automática
  - Notificações com base em revisão espaçada
  - Dashboard de progresso e desempenho do aluno
  - Área do perfil com dados pessoais, histórico de quizzes e conteúdos revisados

---

## ⚙️ Tecnologias Utilizadas

- **Mobile:** React Native, Expo, TypeScript  
- **Backend:** Node.js, Express, JWT, Sequelize  
- **Banco de Dados:** MySQL (via MAMP local)  
- **CRM (futuro):** React + TypeScript (com Material UI)  
- **Outros:** Docker (futuramente), GitHub, Cursor.dev

---

## 📈 Fases do Projeto

| Fase                        | Status        | Descrição                                                                 |
|----------------------------|---------------|--------------------------------------------------------------------------|
| 🎨 Design de Telas         | ✅ Finalizado | Telas prototipadas com Figma, com fluxo validado para alunos e professores |
| 📱 Aplicativo Mobile       | 🟡 Em andamento | Autenticação, listagem de resumos, quizzes e perfil em desenvolvimento  |
| 🔧 Backend RESTful         | 🟢 Em andamento | Estrutura de autenticação e rotas principais em desenvolvimento          |
| 🖥️ CRM (Web)               | 🔜 Em breve    | CRUD de resumos, quizzes, alunos, turmas e notificações                 |
| 📬 Sistema de Notificações | 🔜 Em breve    | Agendamento e envio de notificações baseado em gatilhos de revisão      |
| 📊 Dashboard de Progresso  | 🔜 Em breve    | Gráficos e relatórios de desempenho por matéria                         |
| ✅ Testes Finais & Ajustes | 🔜 Em breve    | Testes integrados, usabilidade e otimizações finais                     |

---

## 📅 Planejamento de Finalização (até 12/09/2025)

| Semana | Período               | Entregas Planejadas                                                                 |
|--------|------------------------|--------------------------------------------------------------------------------------|
| 01     | 02/set a 06/set        | Finalizar integração completa de quizzes e respostas no app + ajustes visuais       |
| 02     | 07/set a 10/set        | Implementar dashboard de progresso + testes finais mobile e backend                 |
| 03     | 11/set a 12/set        | Versão final: deploy local + gravação de apresentação + entrega para avaliação      |

---

## 🧪 Como Rodar Localmente

```bash
# Clonar o repositório
git clone https://github.com/luccapontes/memora

# Acessar o diretório
cd memora

# Instalar as dependências do app
cd app
npm install
npx expo start

# Para o backend (em outra aba)
cd backend
npm install
npm run dev
