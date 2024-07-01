## Teste FrontEnd 2024 - Microfrontends com Ruby BFF

Este projeto implementa um sistema de microfrontends com um BFF em Ruby para gerenciar vídeos do YouTube, seguindo as especificações do desafio.

### Estrutura do Projeto

```
icasei-teste-front-end-2024/

```

### Descrição dos Componentes

- **bff:** Backend em Ruby responsável por interagir com a API do YouTube e fornecer dados para os microfrontends.
  - Utiliza a gem `httparty` para fazer requisições à API do YouTube.
  - Possui um controlador `VideosController` que gerencia as rotas para buscar e listar vídeos.
  - Utiliza um modelo `Video` para representar os dados dos vídeos.
- **mf_drawer:** Microfrontend responsável pela navegação entre as seções de Vídeos e Favoritos.
  - Utiliza HTML, CSS e JavaScript para renderizar a barra de navegação.
  - Faz requisições para o BFF para obter os dados dos vídeos favoritos.
- **mf_videos:** Microfrontend responsável pela busca e listagem de vídeos.
  - Utiliza HTML, CSS e JavaScript para renderizar a página de busca e a lista de vídeos.
  - Faz requisições para o BFF para buscar vídeos na API do YouTube.
  - Permite ao usuário marcar vídeos como favoritos.

### Instalação e Execução

1. **Clonar o Repositório:**

   ```bash
   git clone https://github.com/VitorSiqueirr/icasei-teste-front-end-2024
   ```

2. **Configurar a API Key do YouTube:**

3. **Instalar Dependências:**

   ```bash
   cd bff && bundle install
   cd mf_drawer && npm install
   cd mf_videos && npm install
   ```

4. **Iniciar o Docker:**

   ```bash
   docker-compose up -d
   ```

5. **Acessar a Aplicação:**
   - Abra o navegador e acesse ``.

### Instruções para Testes

- Os testes unitários são escritos com `RSpec` para o BFF e `Jest` para os microfrontends.
- Para executar os testes, utilize os comandos:
  - **BFF:** `cd bff && bundle exec rspec`
  - **mf_drawer:** `cd mf_drawer && npm test`
  - **mf_videos:** `cd mf_videos && npm test`

### Documentação

- A documentação detalhada da implementação está disponível no README.md de cada componente.

### Observações

- Este código é apenas um exemplo e pode ser adaptado e aprimorado para atender às suas necessidades específicas.
- A estrutura do projeto é modular, permitindo que novas funcionalidades sejam facilmente adicionadas.
- A aplicação é responsiva e funciona em diferentes tamanhos de tela.
- O código é tipado, seguindo as melhores práticas de desenvolvimento.
- A aplicação utiliza o Docker para facilitar a configuração e o gerenciamento dos componentes.

### Conclusão

Este projeto demonstra um exemplo prático de desenvolvimento de microfrontends com um BFF em Ruby, utilizando as melhores práticas de desenvolvimento e as ferramentas mais populares. A aplicação é modular, responsiva e possui testes unitários, garantindo a qualidade do código e a facilidade de manutenção.

**Envie o link para o repositório para frontend@icasei.com.br com o título "Teste FrontEnd 2024".**
