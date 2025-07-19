# 🏆 Champions League API – Node.js + Express + TypeScript

> Projeto desenvolvido como parte do desafio da formação **Node.js Fundamentals** da [DIO](https://www.dio.me/).  
> Uma API simples para gerenciar **jogadores** e consultar **clubes** participantes, ilustrando organização em camadas (Controller → Service → Repository) e uso de modelos tipados.

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-black?style=for-the-badge&logo=express)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow?style=for-the-badge)
![License: ISC](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)

---

## ✨ Funcionalidades

| Recurso  | Método | Rota                 | Descrição                                      |
|----------|--------|----------------------|------------------------------------------------|
| Players  | GET    | `/api/players`       | Lista todos os jogadores (memória)             |
| Players  | GET    | `/api/players/:id`   | Busca um jogador por ID                        |
| Players  | POST   | `/api/players`       | Cadastra um novo jogador                       |
| Players  | DELETE | `/api/players/:id`   | Remove um jogador                              |
| Players  | PATCH  | `/api/players/:id`   | Atualiza estatísticas do jogador               |
| Clubs    | GET    | `/api/clubs`         | Lista clubes a partir de arquivo JSON          |

> **Observação:** Os jogadores são armazenados **em memória** (array). Ao reiniciar o servidor, os dados voltam ao estado inicial.



## 🗂️ Estrutura do Projeto

```

project-champions/
├── src/
│   ├── app.ts                  # Criação e configuração da aplicação Express
│   ├── server.ts               # Bootstrap / inicialização do servidor
│   ├── routes.ts               # Definição das rotas
│   ├── controllers/            # Camada de entrada (HTTP)
│   │   ├── players-controller.ts
│   │   └── clubs-controller.ts
│   ├── services/               # Regras de negócio
│   │   ├── players-service.ts
│   │   └── clubs-service.ts
│   ├── repositories/           # Acesso a dados / simulação de persistência
│   │   ├── players-repository.ts
│   │   └── clubs-repository.ts
│   ├── data/
│   │   └── clubs.json          # Fonte de dados de clubes
│   ├── models/                 # Tipagens (interfaces)
│   │   ├── player-model.ts
│   │   ├── club-model.ts
│   │   ├── statistics-model.ts
│   │   └── http-response-model.ts
│   └── utils/
│       └── http-helper.ts      # Funções helper de resposta
├── tsconfig.json
├── package.json
├── .env
└── .gitignore

````



## ⚙️ Tecnologias

- **Node.js 18+**
- **Express 5.x (beta / next)**
- **TypeScript (strict)**
- **CORS** (habilitado globalmente)
- **tsup / tsx** (build e execução)



## ✅ Pré-requisitos

| Ferramenta | Versão Recomendada |
|------------|--------------------|
| Node.js    | 18+                |
| npm        | 8+                 |



## 🚀 Instalação & Execução

```bash
# 1. Clonar o repositório
git clone https://github.com/JVRFurtado/Node-Desafio6.git
cd Node-Desafio6

# 2. Instalar dependências
npm install

# 3. Rodar em desenvolvimento
npm run start:dev   # execução direta (tsx)

# 4. Modo watch (reload automático)
npm run start:watch

# 5. Gerar build
npm run dist

# 6. Rodar build gerado
npm run start:dist
````

Serviço disponível (default):

```
http://localhost:3636
```



## 🌐 Endpoints (Detalhes)

### 1. Listar jogadores

```
GET /api/players
```

**Resposta (200):**

```json
[
  {
    "id": 1,
    "name": "Lionel Messi",
    "club": "Paris Saint-Germain",
    "nationality": "Argentina",
    "position": "Forward",
    "statistics": {
      "Overall": 93,
      "Pace": 85,
      "Shooting": 94,
      "Passing": 91,
      "Dribbling": 95,
      "Defending": 38,
      "Physical": 65
    }
  }
]
```

**Resposta (204):** corpo vazio.



### 2. Buscar jogador por ID

```
GET /api/players/1
```

**Resposta (200):** (objeto jogador)
**Resposta (204):** vazio se não encontrado.



### 3. Criar jogador

```
POST /api/players
Content-Type: application/json
```

**Body Exemplo:**

```json
{
  "id": 2,
  "name": "Kylian Mbappé",
  "club": "Paris Saint-Germain",
  "nationality": "France",
  "position": "Forward",
  "statistics": {
    "Overall": 92,
    "Pace": 97,
    "Shooting": 90,
    "Passing": 80,
    "Dribbling": 92,
    "Defending": 36,
    "Physical": 77
  }
}
```

**Resposta (201):**

```json
{ "message": "sucesseful" }
```

**Resposta (400):** corpo inválido / vazio.



### 4. Remover jogador

```
DELETE /api/players/2
```

**Resposta (200):**

```json
{ "message": "deleted" }
```

**Resposta (400):** ID inexistente.



### 5. Atualizar estatísticas (PATCH)

```
PATCH /api/players/1
Content-Type: application/json
```

**Body (apenas statistics)**:

```json
{
  "Overall": 94,
  "Pace": 86,
  "Shooting": 95,
  "Passing": 92,
  "Dribbling": 96,
  "Defending": 39,
  "Physical": 66
}
```

**Resposta (200):** jogador atualizado
**Resposta (400):** ID inexistente



### 6. Listar clubes

```
GET /api/clubs
```

**Resposta (200):**

```json
[
  { "id": 1, "name": "Real Madrid" },
  { "id": 2, "name": "Barcelona" },
  { "id": 3, "name": "Manchester City" }
]
```



## 🧱 Modelos (Schemas)

### PlayerModel

```ts
interface PlayerModel {
  id: number;
  name: string;
  club: string;
  nationality: string;
  position: string;
  statistics: StatisticsModel;
}
```

### StatisticsModel

```ts
interface StatisticsModel {
  Overall: number;
  Pace: number;
  Shooting: number;
  Passing: number;
  Dribbling: number;
  Defending: number;
  Physical: number;
}
```

### ClubModel

```ts
interface ClubModel {
  id: number;
  name: string;
}
```



## 🧠 Decisões de Arquitetura

| Camada     | Responsabilidade                         |
| ---------- | ---------------------------------------- |
| Controller | Lidar com `req/res` e delegar ao service |
| Service    | Regras de negócio / validações simples   |
| Repository | Acesso a dados (memória ou arquivo JSON) |
| Utils      | Helpers de resposta HTTP                 |
| Models     | Tipagens para consistência e manutenção  |


<!----
## ⚠️ Limitações Atuais

* Dados de **players** apenas em memória (sem persistência real).
* **Sem validação** profunda dos campos (ex: ranges das estatísticas).
* **Sem logs estruturados** / monitoramento.
* **Sem testes** automatizados.



## 🛣️ Possíveis Melhorias

* [ ] Persistir dados em banco (MongoDB / PostgreSQL).
* [ ] Adicionar validação com `zod` ou `class-validator`.
* [ ] Implementar autenticação JWT para rotas mutáveis.
* [ ] Adicionar paginação em `/players`.
* [ ] Filtragem por `club`, `nationality`, `position`.
* [ ] Documentação via **Swagger/OpenAPI**.
* [ ] Testes (unit + integration) com **Jest** / **Vitest**.
* [ ] Dockerfile + docker-compose.
* [ ] Camada de DTOs para entrada/saída.

--->

## 🔐 Variáveis de Ambiente

Arquivo `.env`:

```env
PORT=3636
```

> Ajuste a porta conforme necessidade.



## 📜 Licença

Licenciado sob **ISC** – sinta-se livre para usar, estudar e modificar.



## 👤 Autor

Feito com ⚽ + 💻 por mim.

[GitHub](https://github.com/JVRFurtado) • [LinkedIn](https://www.linkedin.com/in/joao-vitor-r)


> “Código simples hoje facilita evolução amanhã.”
