# 📚 Avalia+ - Backend

## 🚀 Tecnologias utilizadas:

- 💻 **IntelliJ IDEA**
- ☕ **Java** (versão 21)
- 🔧 **Spring Boot** (versão 3.3.10)
- 🛠️ **Maven**
- 🗃️ **MySQL**
- 📬 **Postman**

---

## 🧩 Versões:

- **Java**: versão 21
- **Spring Boot**: versão 3.3.10
- **Maven**: última versão
- **MySQL**: última versão
- **Postman**: última versão

---

## 🛠️ Requisitos de ambiente:

Para rodar o projeto **backend** localmente, você precisará ter instalado:

- ☕ **Java** (versão 21)
- 🔧 **Maven** (gerenciador de dependências)
- 🗃️ **MySQL** (banco de dados)
- 📬 **Postman** (para testes de API)
- 🧑‍💻 **IntelliJ IDEA** (ou outro IDE Java)

---

## 📦 Instruções para instalação/uso:

1. Clone o repositório: `https://github.com/SaymonTheDev7/avaliaMais`
2. Acesse o diretório do projeto: `cd avaliaMais/backend`
3. Instale as dependências com Maven: `mvn install`
4. Rode o projeto: `mvn spring-boot:run`
5. Acesse a API na URL: `http://localhost:9090`

---

## 🗂️ Componentes e onde ficam localizados:

### Estrutura do **backend**:

- **backend**  
  - **.idea**: Contém a configuração do projeto no IntelliJ  
  - **.mvn**: Contém a configuração do Maven  
  - **logs**: Contém os arquivos de log gerados pela aplicação  
  - **src**: Contém o código fonte do aplicativo  
    - **main**: Contém o código principal da aplicação  
      - **java**: Contém o código Java da aplicação  
        - **net**: Contém as configurações gerais e principais pacotes do sistema  
        - **weg**: Contém os pacotes relacionados ao sistema da Weg  
        - **avaliama**: Contém os pacotes do projeto Avalia+  
          - **chat**: Contém as lógicas e classes relacionadas ao chat  
          - **controller**: Contém os controladores REST que gerenciam as rotas e lógicas do servidor  
          - **infra**: Contém as implementações de infraestrutura, como configurações de banco de dados  
          - **logs**: Contém os pacotes relacionados ao gerenciamento de logs  
          - **model**: Contém as entidades de modelo do banco de dados  
          - **repository**: Contém os repositórios para interagir com o banco de dados  
          - **service**: Contém os serviços de negócios e regras de manipulação dos dados  
          - **websocket**: Contém a lógica para WebSockets, caso exista comunicação em tempo real  
      - **resources**: Contém arquivos de configuração, como o `application.properties`  
    - **test**: Contém os testes da aplicação  
      - **java**: Contém os testes unitários e de integração da aplicação  
  - **target**: Contém os arquivos gerados durante o build do projeto, como os artefatos `.jar` ou `.war`
