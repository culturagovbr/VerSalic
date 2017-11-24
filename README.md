# Projeto VERSALIC - Uma nova forma de consulta e navegação ao SALIC

Este projeto demonstra o uso da [API SALIC](http://hmg.api.salic.cultura.gov.br/doc/#) para consultas aos dados do Sistema de Apoio às Leis de Incentivo à Cultura ([SALIC](http://novosalic.cultura.gov.br/cidadao/consultar)).

## Configuração do ambiente
##### É preciso ter _node_, _npm_, _typescript_ e _angular cli_ instalados para a execução do projeto.
#
A última versão do **Node** pode ser encontrada [aqui](https://nodejs.org/en/). A versão usada para o desenvolvimento é a **7.4.0**. 
Usuários _Ubuntu/Debian_ podem instalar via apt:

```
$ sudo apt-get update
$ sudo apt-get install nodejs
```
Geralmente o pacote Node já traz o **npm** junto, mas caso precise instalar, a versão usada para desenvolvimento é a **4.0.5**
Usuários Ubuntu/Debian podem instalar via apt:

```
$ sudo apt-get install npm
```

O **TypeScript** pode ser instalado via npm:

```
$ npm install -g typescript
```

Dependendo das configurações npm do seu sistema (em geral Mac e Linux) será necessário o '_sudo_' para o npm ter as permissões de instalação.

Por fim, a instalação do **Angular CLI** também é feita via npm:

```
$ npm install -g @angular/cli
```

Mais informações sobre a instalação do ambiente Angular podem ser obtidas na [página da CLI](https://github.com/angular/angular-cli). A versão utilizada neste projeto é a **1.0.0-beta.31**. Para verificar a versão atual, basta rodar:

```
$ ng --version
```

## Instalação
Para que o npm possa baixar os módulos extras necessários para o projeto, navegue para a pasta do projeto e execute a instalação:
```
$ git clone https://github.com/mateuswetah/Projeto-Salic.git
$ cd Projeto-Salic/
$ ng install
```
Os módulos necessários são informados no `package.json`. Possíveis erros na instalação costumam acontecer por incompatilidades nas versões dos módulos. Caso isso ocorra, verifique no console qual a versão do módulo necessária e instale via `npm install`.

## Executando em local server
Para obter um server de desenvolvimeto, execute:
```
$ ng serve
``` 
Navegue para `http://localhost:4200/`. O App vai automaticamente se atualizar após qualquer mudança feita nos arquivos fonte.

## Link para a última versão hospedada
Em homologação!!! [Acesse aqui](http://hmg.app.api.salic.cultura.gov.br/). 
