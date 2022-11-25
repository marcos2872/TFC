# Projeto TFC

#Esse projeto foi desenvolvido na Trybe.

<details>
O TFC é um site informativo sobre partidas e classificações de futebol! 

Foi desenvolvido uma API (utilizando o método TDD) e também integrar - através do docker-compose - as aplicações para que elas funcionem consumindo um banco de dados.

Nesse projeto, foi construido um back-end dockerizado utilizando modelagem de dados através do Sequelize.Para adicionar uma partida é necessário ter um token, portanto a pessoa deverá estar logada para fazer as alterações. Teremos um relacionamento entre as tabelas teams e matches para fazer as atualizações das partidas.
O back-end implementa regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema.
</details>
<details>
<summary><strong> Estrutura do projeto</strong></summary><br />

O projeto é composto de 4 entidades importantes para sua estrutura:

1️⃣ **Banco de dados:**
  - Será um container docker MySQL já configurado no docker-compose através de um serviço definido como `db`.
  - Tem o papel de fornecer dados para o serviço de _backend_.
  - Durante a execução dos testes sempre vai ser acessado pelo `sequelize` e via porta `3002` do `localhost`;
  - Você também pode conectar a um Cliente MySQL (Workbench, Beekeeper, DBeaver e etc), colocando as credenciais configuradas no docker-compose no serviço `db`.

2️⃣ **Back-end:**
 - Será o ambiente que você realizará a maior parte das implementações exigidas.
 - Deve rodar na porta `3001`, pois o front-end faz requisições para ele nessa porta por padrão;
 - Sua aplicação deve ser inicializada a partir do arquivo `app/backend/src/server.ts`;
 - Garanta que o `express` é executado e a aplicação ouve a porta que vem das variáveis de ambiente;
 - Todas as dependências extras (tal como `joi`, `boom`, `express-async-errors`...) devem ser listadas em `app/backend/packages.npm`.

3️⃣ **Front-end:**
  - O front já está concluído, não é necessário realizar modificações no mesmo. A única exceção será seu Dockerfile que precisará ser configurado.
  - Todos os testes a partir do requisito de login usam o `puppeteer` para simular uma pessoa acessando o site `http://localhost:3000/`;
  - O front se comunica com serviço de back-end pela url `http://localhost:3001` através dos endpoints que você deve construir nos requisitos.
  - Recomendamos que sempre que implementar um requisito no back-end acesse a página no front-end que consome a implementação para validar se está funcionando como esperado.

4️⃣ **Docker:**
  - O `docker-compose` tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db) e subir o projeto completo com o comando `npm run compose:up` ou `npm run compose:up:dev`;
  - Você **deve** configurar as `Dockerfiles` corretamente nas raízes do `front-end` e `back-end`, para conseguir inicializar a aplicação;

</details>

<details>
<summary><strong> ⚠️ Configurações mínimas para execução do projeto</strong></summary><br />

Na sua máquina você deve ter:

 - Sistema Operacional Distribuição Unix
 - Node versão 16
 - Docker
 - Docker-compose versão >=1.29.2

➡️ O `node` deve ter versão igual ou superior à `16.14.0 LTS`:
  - Para instalar o nvm, [acesse esse link](https://github.com/nvm-sh/nvm#installing-and-updating);
  - Rode os comandos abaixo para instalar a versão correta de `node` e usá-la:
    - `nvm install 16.14 --lts`
    - `nvm use 16.14`
    - `nvm alias default 16.14`

</details>

<details>
<summary><strong>🐳 Configuração Docker</strong></summary><br />

  ### Docker e Docker-compose

  ⚠ O seu docker-compose precisa estar na versão 1.29 ou superior.  ⚠
[Veja aqui a documentação para atualizar o docker-compose.](https://docs.docker.com/compose/install/)

⚠️ **Atenção:**

- Recomendamos que, enquanto desenvolve o projeto, prefira o usar o comando `npm run compose:up:dev` pois, diferente do comando anterior, este está configurado para compartilhar volumes com o _docker_ e também utiliza o _script_ que realiza o _live-reload_ ao modificar o código do _back-end_. Somente quando instalar uma nova dependência ou alterar algum arquivo na raiz do backend, você deverá parar o docker-compose com o comando `npm run compose:down:dev` e executar novamente `npm run compose:up:dev`, pois o volume está mapeando somente alterações dentro da pasta `src`. Você pode verificar essas configurações explorando o arquivo `docker-compose.dev.yml` e comparar com `docker-compose.yml`

</details>

<details>
<summary><strong>Executando o Projeto</strong></summary><br />

- a aplicação usa as portas 3000 para front-end, 3001 para back-end e 3002 para o DB, certifique que essas portas não estão em uso antes de executar o projeto

- para executar a aplicação na sua máquina local, para isso é necessário executar o comando `npm run compose:up` na raiz do projeto.

- Após terminar de executar o contêineres acesse a url http://localhost:3000, para acessar o front-end

-O back-end estará disponível na url http://localhost:3001
</details>
