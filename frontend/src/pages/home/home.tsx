import "./home.css";

export default function Home() {
  return (
    <div className="home-container">
      <div className="tech-list">
        <h1>Order Management Challenge</h1>
        <p>Bem-vindo ao projeto desenvolvido para o Desafio Técnico Backend!</p>

        <h2>Tecnologias Utilizadas</h2>
        <ul>
          <li>Node.js</li>
          <li>Express</li>
          <li>TypeScript</li>
          <li>Mongoose</li>
          <li>JWT</li>
          <li>Zod</li>
          <li>Vitest (testes)</li>
        </ul>

        <h2>Objetivo</h2>
        <p>
          Este sistema foi criado para demonstrar conhecimentos em arquitetura limpa,
          regras de negócio, autenticação e fluxo de pedidos.
        </p>

        <h2>Funcionalidades</h2>
        <ul>
          <li>Registro e login com JWT</li>
          <li>Criação e listagem de pedidos com paginação</li>
          <li>Validações de negócio</li>
          <li>Transição obrigatória de estados: CREATED → ANALYSIS → COMPLETED</li>
          <li>Testes unitários com Vitest</li>
        </ul>
      </div>
    </div>
  );
}
