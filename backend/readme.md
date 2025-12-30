Repositorio do desafio: https://github.com/linkiodental/order-management-challenge
# Order Management - Backend

Este projeto é um backend em **Node.js + TypeScript**, organizado em uma arquitetura limpa e modular, contendo controllers, services, repositories, errors, middlewares e validações.

---

## 📁 Estrutura do Projeto

```
src/
├── config/
│   ├── models/
│   ├── utils/
│   │   ├── enum/
│   │   ├── types/
│   │   ├── validations/
│   │   │   ├── messages.ts
│   │   │   └── utils.ts
│   └── database.ts
├── controllers/
├── errors/
├── middlewares/
├── repositories/
├── routes/
├── services/
└── test/
```

Cada camada tem uma responsabilidade específica:

* **controllers/** → recebem requisições e acionam serviços
* **services/** → contêm a lógica de negócio
* **repositories/** → fazem acesso ao banco de dados
* **errors/** → classes de erro customizadas
* **middlewares/** → validações entre request e controller
* **utils/validations/** → mensagens e utilidades globais de validação

---

## 🧩 Sistema de Mensagens de Erro

As mensagens globais ficam em:

```
src/config/utils/validations/messages.ts
```

### Exemplo do arquivo:

```ts
export const messages = {
  "auth.email_exists": "Este e-mail já está cadastrado.",
  "auth.invalid_credentials": "Credenciais inválidas.",
  "order.not_found": "Pedido não encontrado."
};
```

### Como importar:

```ts
import { messages } from "../config/utils/validations/messages";

if (exists) {
  throw new LoginError(messages["auth.email_exists"]);
}
```

---

## 🛠️ Como rodar o projeto

### Instalar dependências

```
npm install
```

### Rodar em modo desenvolvimento

```
npm run dev
```

### Compilar TypeScript

```
npm run build
```

### Rodar compilado

```
npm start
```

---

## 🧪 Testes

Os testes ficam em:

```
src/test/
```

Para rodar testes (se configurado):

```
npm test
```

---

## 🚀 Tecnologias Utilizadas

* Node.js
* TypeScript
* Express
* Mongoose / ORM equivalente
* Jest

