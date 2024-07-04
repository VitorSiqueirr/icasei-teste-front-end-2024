## Teste FrontEnd 2024 - Microfrontends com Ruby BFF

Este projeto implementa um sistema de microfrontends com um BFF em Ruby para gerenciar vídeos do YouTube, seguindo as especificações do desafio.

### Descrição dos Componentes

- **bff:** Backend em Ruby responsável por interagir com a API do YouTube e fornecer dados para os microfrontends.
  - Utiliza a gem `httparty` para fazer requisições à API do YouTube.
  - Possui um controlador `VideosController` que gerencia as rotas para buscar e listar vídeos.
  - Utiliza um modelo `Video` para representar os dados dos vídeos.
- **mf_drawer:** Microfrontend responsável pela navegação entre as seções de Vídeos e Favoritos.
  - Utiliza HTML, CSS e JavaScript para renderizar a barra de navegação..
- **mf_videos:** Microfrontend responsável pela busca e listagem de vídeos.
  - Utiliza HTML, CSS e JavaScript para renderizar a página de busca e a lista de vídeos.
  - Faz requisições para o BFF para buscar vídeos na API do YouTube e verificar a lista de favoritos.
  - Permite ao usuário marcar vídeos como favoritos.

### Instalação e Execução

1. **Clonar o Repositório:**

   ```bash
   git clone https://github.com/VitorSiqueirr/icasei-teste-front-end-2024
   ```

2. **Instalar Dependências:**

   - Verificar o README.md de cada pasta app e bff para instalar as dependências.

3. **Iniciar o Docker:**

- Somente inicie este comando após realizar as configurações do bff

```bash
docker-compose up -d --build
```

5. **Acessar a Aplicação:**
   - Abra o navegador e acesse `localhost:8080`.

### Instruções para Testes

- As instruções para os testes estão disponíveis no README.md de cada parte do projeto

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
