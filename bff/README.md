## Teste FrontEnd 2024 - BFF

### Execução

1. **Configurar a API Key do YouTube:\***

Configurar o arquivo .env como exemplificado pelo arquivo .env_exemple
Você pode conseguir pegar sua api do YouTube por este link: https://console.cloud.google.com/apis/library/youtube.googleapis.com?project=icasei-front-end-test-2024

3. **Instalar Dependências:**

   ```bash
   bundle install
   ```

### Instruções para Testes

- Os testes unitários são escritos com `RSpec`.
- Para executar os testes, utilize o comando:
  ```bash
   docker-compose exec bff rspec ./spec/videos_controller_spec.rb
  ```
