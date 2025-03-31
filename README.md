# Avalia + 🎓💡

**Avalia +** é uma aplicação web integrada para gerenciar de forma centralizada e automatizada os processos de pré-conselhos, conselhos de classe e feedbacks educacionais. O sistema oferece rastreabilidade, segurança e eficiência ao fluxo de dados, atendendo diferentes perfis de usuários, permitindo comunicação em tempo real e fornecendo dashboards para acompanhamento das etapas.

## Índice 📑

- [Objetivo](#objetivo) ![Objetivo Logo](https://img.icons8.com/ios/50/000000/goal.png)
- [Arquitetura](#arquitetura) ![Arquitetura Logo](https://img.icons8.com/ios/50/000000/architecture.png)
- [Tecnologias Utilizadas](#tecnologias-utilizadas) ![Tecnologia Logo](https://img.icons8.com/ios/50/000000/technology.png)
- [Instalação](#instalação) ![Instalação Logo](https://img.icons8.com/ios/50/000000/installing-updates.png)
- [Funcionalidades](#funcionalidades) ![Funcionalidades Logo](https://img.icons8.com/ios/50/000000/features.png)
- [Estrutura do Projeto](#estrutura-do-projeto) ![Estrutura Logo](https://img.icons8.com/ios/50/000000/folder-invoices.png)
- [Execução Local](#execução-local) ![Execução Logo](https://img.icons8.com/ios/50/000000/desktop-computer.png)
- [Licença](#licença) ![Licença Logo](https://img.icons8.com/ios/50/000000/license.png)

## Objetivo 🎯

O objetivo do **Avalia +** é centralizar os processos de feedbacks educacionais e conselhos de classe em uma única plataforma, permitindo que alunos, professores, representantes e a equipe pedagógica interajam de forma eficiente e transparente.

## Arquitetura 🏗️

A arquitetura do sistema é dividida em três camadas principais:

1. **Backend - Spring Boot**: Implementação da lógica de negócios, autenticação, autorização e persistência de dados.
2. **Frontend - React/Angular**: Interface do usuário, com comunicação em tempo real e gestão de estado.
3. **Banco de Dados - MySQL**: Armazenamento das entidades e dados do sistema.

## Tecnologias Utilizadas ⚙️

### Backend 💻
- **Spring Boot**: Framework para desenvolvimento de aplicativos Java.
- **Spring Security**: Para autenticação e autorização.
- **JWT**: Para tokens de autenticação.
- **Spring WebSocket**: Para comunicação em tempo real.
- **MySQL**: Banco de dados relacional para armazenamento de dados.
- **Postman**: Para testar as APIs e realizar chamadas HTTP.
- **IntelliJ IDEA**: IDE para desenvolvimento Java com suporte ao Spring Boot.

### Frontend 💻
- **React** ou **Angular**: Frameworks para construção da interface de usuário.
- **Tailwind CSS**: Framework de CSS para estilização responsiva.
- **WebSockets**: Para chat em tempo real.
- **VSCode**: IDE popular para desenvolvimento frontend com suporte a JavaScript, React e outras tecnologias.

### Ferramentas de Desenvolvimento 🔧
- **Maven**: Para gerenciamento de dependências no backend.
- **Docker**: Para containerização do sistema.
- **Swagger**: Para documentação da API.

## Instalação ⚙️

### Backend 🖥️

1. Clone o repositório.
2. Navegue até o diretório do backend.
3. Compile o projeto usando Maven.
4. Execute a aplicação.

### Frontend 💻

1. Navegue até o diretório do frontend.
2. Instale as dependências.
3. Execute o servidor de desenvolvimento.

## Funcionalidades 🚀

### Gestão de Usuários 🔑
- Cadastro, autenticação e autorização de diferentes perfis de usuários.
- Controle de acesso baseado em JWT e Spring Security.

### Gestão de Eventos de Conselho 📅
- Criação e acompanhamento de eventos de conselho, incluindo pré-conselhos e feedbacks finais.
- Dashboard para visualização do progresso dos eventos.

### Formulários de Feedback 📝
- Preenchimento de pré-conselhos e conselhos de classe.
- Feedback estruturado para avaliação de turmas e alunos.

### Chat Integrado 💬
- Comunicação em tempo real entre a equipe pedagógica, professores, alunos e representantes.
- Histórico de conversas armazenado no banco de dados.

### Notificações 🔔
- Notificações para alertar sobre pendências de formulários e mensagens no chat.

## Estrutura do Projeto 🗂️

### Backend 🖥️
- **Controller**: Responsável pelas requisições HTTP e validação inicial dos dados.
- **Service**: Lógica de negócios e orquestração das operações.
- **Repository**: Acesso e manipulação dos dados no banco.

### Frontend 💻
- **Componentes React**: Responsáveis pela interface do usuário, incluindo formulários, dashboard e chat.
- **State Management**: Gerenciamento de estado utilizando React Context ou Redux.
- **WebSocket**: Comunicação em tempo real para o chat.

## Execução Local 🔄

Para rodar o sistema localmente, siga os passos de instalação descritos anteriormente para o backend e frontend.

## Licença 📝

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.
