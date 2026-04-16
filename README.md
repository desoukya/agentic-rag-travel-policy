# Agentic Engineering Practice

Yarn workspace with three apps:

- `ingestion-consumer`: API that accepts datasets, chunks them, and writes vectors to Pinecone.
- `langchain-rag`: single-pass RAG app with evaluator.
- `langgraph-rag`: adaptive RAG app that can call a live weather tool.

Shared code lives in `packages/shared`.

## Startup

Use the pinned Node version first:

```bash
nvm use
```

Install dependencies:

```bash
yarn install
```

Environment files:

```bash
.env.openai
.env.ollama
.env
```

`EMBEDDING_PROVIDER` is the only switch you need for embeddings. The config resolves:

- OpenAI env uses `EMBEDDING_MODEL=text-embedding-3-small`
- Ollama env uses `EMBEDDING_MODEL=nomic-embed-text`
- `LLM_BASE_URL` is the local model endpoint when using Ollama

Start with the OpenAI env file:

```bash
yarn dev:ingestion:openai
yarn dev:langchain:openai
yarn dev:langgraph:openai
```

Start with the Ollama env file:

```bash
yarn dev:ingestion:ollama
yarn dev:langchain:ollama
yarn dev:langgraph:ollama
```

If you use the plain scripts, they load `.env`.

Start each app from the repo root:

```bash
yarn dev:ingestion
yarn dev:langchain
yarn dev:langgraph
```

Default ports:

- `ingestion-consumer`: `4001`
- `langchain-rag`: `4002`
- `langgraph-rag`: `4003`

Health endpoints:

- `http://localhost:4001/health`
- `http://localhost:4002/health`
- `http://localhost:4003/health`

## Ingest Sample Dataset

Start the ingestion service:

```bash
yarn dev:ingestion:ollama
```

Post the travel policy dataset:

```bash
curl -X POST http://localhost:4001/ingest \
  -H "Content-Type: application/json" \
  --data @datasets/travel-policy.dataset.json
```
