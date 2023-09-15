# Guia de Instalação e Uso do JSON Server

Neste guia, você aprenderá como instalar e utilizar o JSON Server, uma ferramenta que permite criar rapidamente uma API REST fake usando um arquivo JSON como fonte de dados. Isso é útil para testar e prototipar aplicações que dependem de uma API antes que a API real esteja pronta.

## Passo 1: Instalação do Node.js

Antes de começar, você precisará do Node.js instalado em seu sistema. Se você ainda não tiver, faça o download e instale a versão adequada para o seu sistema a partir do [site oficial do Node.js](https://nodejs.org/).

## Passo 2: Instalação do JSON Server

Abra o terminal e execute o seguinte comando para instalar globalmente o JSON Server via npm (Node Package Manager):

```bash
npm install -g json-server
```

Isso permitirá que você utilize o JSON Server de qualquer diretório no seu sistema.

## Passo 3: Crie um arquivo JSON

Crie um arquivo chamado `db.json` com os dados que você deseja simular como resposta da API. Aqui está um exemplo simples:

```json
{
  "posts": [
    { "id": 1, "title": "Postagem 1" },
    { "id": 2, "title": "Postagem 2" },
    { "id": 3, "title": "Postagem 3" }
  ]
}
```

## Passo 4: Inicie o JSON Server

No terminal :computer:, navegue até o diretório onde o arquivo `db.json` está localizado e execute o seguinte comando:

```bash
json-server --watch db.json
```

O JSON Server iniciará uma API REST fake que estará disponível em `http://localhost:3000`.

## Passo 5: Acessando a API

Agora que o servidor está em execução, você pode fazer solicitações para a API REST fake. Aqui estão alguns exemplos:

- :computer: Recuperar todas as postagens:
  ```
  GET http://localhost:3000/posts
  ```

- :computer: Recuperar uma postagem específica:
  ```
  GET http://localhost:3000/posts/1
  ```

- :computer: Adicionar uma nova postagem:
  ```
  POST http://localhost:3000/posts
  Body: { "title": "Nova Postagem" }
  ```



Agora você tem um servidor JSON em execução que pode ser usado para testar suas aplicações antes de integrá-las a uma API real.