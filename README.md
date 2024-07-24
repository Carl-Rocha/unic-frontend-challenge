# Desafio Técnico Frontend - UNIC

## Descrição do Projeto

Este projeto é uma aplicação web desenvolvida em React, com o objetivo de atender aos requisitos especificados no desafio técnico da UNIC. A aplicação possui uma interface protegida por login e senha, com dois tipos de perfis de usuário (ADMIN e USER). Além disso, permite a gestão (CRUD) de usuários e visualização de perfil.

## Tecnologias Utilizadas

### Frontend

- **React**: Biblioteca principal para a construção da interface.
- **React Router DOM**: Para gerenciamento de rotas na aplicação.
- **Material UI**: Biblioteca de componentes de interface.
- **Axios**: Para fazer requisições HTTP.
- **Jest e Testing Library**: Para testes automatizados.

### Backend

- **Express**: Framework para construção da API.
- **Bcrypt**: Para hashing de senhas.
- **Jsonwebtoken**: Para gerenciamento de tokens JWT.

## Funcionalidades

1. **Autenticação**: A aplicação está protegida por login e senha.
2. **Perfis de Usuário**:
   - **ADMIN**: Pode realizar o CRUD de usuários e visualizar todos os usuários.
   - **USER**: Pode visualizar os usuários do sistema.
3. **Gestão de Usuários**: Interface para realizar operações de cadastro, leitura, atualização e exclusão (CRUD) de usuários.
4. **Meu Perfil**: Interface para visualização e atualização de senha do usuário logado.
5. **Pesquisa de Usuários**: Interface para pesquisa de usuários cadastrados.

## Requisitos Não Funcionais

- O frontend é desenvolvido em React.
- Criação de testes automatizados.
- Instruções claras de como logar na aplicação.
- Hospedagem do projeto na Vercel.

## Como Executar o Projeto

### Pré-requisitos

- **Node.js** (versão 18.x)
- **npm** ou **yarn**

### Instalação

1. Clone o repositório:

   ```sh
   git clone https://github.com/seu-usuario/unic-frontend-challenge.git
   cd unic-frontend-challenge
   ```

2. Instale as dependências do frontend:

   ```sh
   npm install
   ```

3. Instale as dependências do backend:
   ```sh
   cd backend
   npm install
   cd ..
   ```

### Executando a Aplicação

1. Inicie o backend:

   ```sh
   cd backend
   npm start
   cd ..
   ```

2. Inicie o frontend:
   ```sh
   npm start
   ```

### Executando Testes

Para rodar os testes automatizados, utilize o comando:

```sh
npm test
```

## Credenciais para Login

| -   | ID                     | Email            | Nome     | Senha | Role |
| --- | ---------------------- | ---------------- | -------- | ----- | ---- |
| 2   | gleidson@gmail.com     | Gleison Jesus    | password | user  |
| 3   | edu@gmail.com          | Eduardo Teixeira | password | user  |
| 4   | agathagrocha@gmail.com | Agatha Rocha     | admin    | admin |
| 5   | maria@gmail.com        | Maria Silva      | password | user  |
| 6   | joao@gmail.com         | João Souza       | password | user  |
| 7   | ana@gmail.com          | Ana Oliveira     | admin    | admin |
| 8   | carlos@gmail.com       | Carlos Lima      | password | user  |
| 9   | lucas@gmail.com        | Lucas Fernandes  | password | user  |
| 10  | juliana@gmail.com      | Juliana Costa    | admin    | admin |
| 11  | roberto@gmail.com      | Roberto Marques  | password | user  |

## Decisões de Projeto

- Escolhemos o **Material UI** pela facilidade de uso e pela vasta quantidade de componentes prontos que aceleram o desenvolvimento.
- **Jest** e **Testing Library** foram escolhidos para garantir a qualidade do código por meio de testes automatizados.

## Hospedagem

A aplicação está hospedada no Vercel e pode ser acessada [aqui](https://unic-frontend-challenge-1ugg.vercel.app).

## Considerações Finais

Agradeço pela oportunidade de participar deste desafio. Todas as decisões tomadas e observações relevantes foram documentadas neste README. Para qualquer dúvida ou sugestão, por favor, entre em contato.
