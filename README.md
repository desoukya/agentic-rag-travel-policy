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
.env.ollama
```

The project now uses Ollama only.

- `CHAT_PROVIDER=ollama`
- `CHAT_MODEL=gemma3:1b`
- `EMBEDDING_PROVIDER=ollama`
- `EMBEDDING_MODEL=nomic-embed-text`
- `LLM_BASE_URL` is the local model endpoint when using Ollama

```bash
yarn dev:ingestion
yarn dev:langchain
yarn dev:langgraph
```

The plain scripts also load `.env.ollama`.

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
yarn dev:ingestion
```

Post the travel policy dataset:

```bash
curl -X POST http://localhost:4001/ingest \
  -H "Content-Type: application/json" \
  --data @datasets/travel-policy.dataset.json
```

## Query LangChain RAG

Start the LangChain app:

```bash
yarn dev:langchain
```

Ask a question against the `travel-policy` namespace:

```bash
curl -X POST http://localhost:4002/ask \
  -H "Content-Type: application/json" \
  -d '{
    "question": "Can I expense a taxi to the airport if severe weather creates a safety concern?",
    "namespace": "travel-policy"
  }'
```
