# Neosrate

Front-end da plataforma social Neosrate. SPA em React + Vite consumindo a API REST (Spring Boot). Usuários criam comunidades, publicam posts com mídia, comentam e curtem.

## Stack

- React 18 + Vite 4 + TypeScript
- Redux Toolkit (estado global, auth)
- React Router DOM 6
- Axios
- jwt-decode
- Tailwind CSS 3
- phosphor-react (ícones)

## Estrutura

```
src/
├── page/         Páginas roteadas (uma por rota)
├── component/    Navbar, Footer, Post, CommunityCard, modais, etc.
├── lib/          Configuração do axios
├── assets/
├── App.tsx       Rotas
└── main.tsx      Bootstrap
```

## Setup

Requer Docker e Docker Compose. A API Neosrate precisa estar acessível (default `http://localhost:8080/api`).

```bash
docker compose up --build
```

Build multi-stage (node → nginx) com fallback SPA. Disponível em `http://localhost:3000`.

## Páginas

| Rota | Descrição |
|---|---|
| `HomePage` | Feed de posts recentes |
| `SignInPage` / `SignUpPage` | Autenticação |
| `DashboardPage` | Visão do usuário |
| `CommunityListPage` | Lista de comunidades |
| `CommunityPage` / `CommunityDashboardPage` | Comunidade e gestão |
| `JoinedPage` | Comunidades em que o usuário entrou |
| `ProfilePage` | Perfil do usuário |
| `SearchPage` | Busca de posts |
| `NotFound` | 404 |

Auth: token JWT decodificado com `jwt-decode`, guardado no store Redux; header `Authorization: Bearer` anexado nas requisições.

## Decisões técnicas

Contexto e trade-offs das principais escolhas (auth com Redux, decode do JWT, upload em duas etapas): **[devdiegofernandes.com/projects/neosrate](https://devdiegofernandes.com/projects/neosrate)**

## Licença

MIT
