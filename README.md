# Documentação da Aplicação Angular com GraphQL

## Sumário

- [Documentação da Aplicação Angular com GraphQL](#documentação-da-aplicação-angular-com-graphql)
  - [Sumário](#sumário)
  - [Visão Geral](#visão-geral)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Configuração do Ambiente](#configuração-do-ambiente)
  - [Estrutura do Projeto](#estrutura-do-projeto)
  - [Componentes](#componentes)
    - [UserListComponent](#userlistcomponent)
    - [UserFormComponent](#userformcomponent)
  - [Serviços](#serviços)
    - [UserService](#userservice)
  - [Rotas](#rotas)
  - [Testes](#testes)
    - [Exemplo de teste para o UserService](#exemplo-de-teste-para-o-userservice)
  - [Como Executar](#como-executar)
  - [Comandos Úteis](#comandos-úteis)

## Visão Geral

Esta aplicação é uma interface de usuário desenvolvida em Angular que se comunica com uma API GraphQL para gerenciar usuários. A aplicação permite criar, listar, atualizar e excluir usuários de forma intuitiva.

## Tecnologias Utilizadas

- **Angular**: Framework para desenvolvimento de aplicações web.
- **GraphQL**: Linguagem de consulta para APIs.
- **Apollo Client**: Biblioteca para gerenciar dados em aplicações GraphQL.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **RxJS**: Biblioteca para programação reativa com observables.

## Configuração do Ambiente

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/wandersonchaves/gen-frontend-crud
   cd gen-frontend-crud
   ```
2. **Instale as dependências**:
   ```bash
   pnpm install
   ```

## Estrutura do Projeto

```
/src
  /app
    /users
      user.service.ts        # Serviço para gerenciar usuários
      user-list.component.ts  # Componente para listar, atualizar e deletar usuários
      user-form.component.ts   # Componente para criar usuários
    app.component.ts          # Componente raiz
```

## Componentes

### UserListComponent

- **Responsabilidade**: Listar, atualizar e deletar todos os usuários.
- **Template**: Exibe uma lista de usuários e botoes para atualizar e deletar o criação.
- **Métodos**:
  - `loadUsers()`: Carrega os usuários usando a query GraphQL.
  - `updateUser()`: Chama a mutation GraphQL para atualizar um usuário.
  - `deleteUser()`: Chama a mutation GraphQL para deletar um usuário.



```typescript
@Component({
  // ...configurações
})
export class UserListComponent implements OnInit {
  // ...propriedades e métodos
}
```

### UserFormComponent

- **Responsabilidade**: Criar usuários.
- **Template**: Formulário que captura o nome e o email do usuário.
- **Métodos**:
  - `createUser()`: Chama a mutation GraphQL para criar um usuário.

```typescript
@Component({
  // ...configurações
})
export class UserFormComponent {
  // ...propriedades e métodos
}
```

## Serviços

### UserService

- **Responsabilidade**: Comunicar-se com a API GraphQL.
- **Métodos**:
  - `getUsers()`: Executa a query para obter todos os usuários.
  - `createUser()`: Executa a mutation para criar um usuário.
  - `updateUser()`: Executa a mutation para atualizar um usuário.
  - `deleteUser()`: Executa a mutation para deletar um usuário.

```typescript
@Injectable({
  providedIn: 'root',
})
export class UserService {
  // ...implementação
}
```

## Rotas

- **`/`**: Rota principal que exibe a lista de usuários (`UserListComponent`).
- **`/create-user`**: Rota que exibe o formulário para criar um novo usuário (`UserFormComponent`).

## Testes

- **Testando Componentes**: Os testes garantem que os componentes sejam criados e que suas funcionalidades sejam executadas corretamente.
- **Testando Serviços**: Os testes do `UserService` verificam se as chamadas à API estão funcionando como esperado.

### Exemplo de teste para o UserService

```typescript
describe('UserService', () => {
  // ...configuração de teste
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
```

## Como Executar

1. **Inicie o servidor de desenvolvimento**:
   ```bash
   pnpm start
   ```
2. **Acesse a aplicação**:
   Abra o navegador e vá para `http://localhost:4200`.

## Comandos Úteis

- **Servidor de Desenvolvimento**: Execute `ng serve` para iniciar o servidor e acesse a aplicação em `http://localhost:4200/`. A aplicação será recarregada automaticamente ao modificar arquivos de origem.
- **Execução de Testes Unitários**: Execute `ng test` para executar os testes unitários via [Karma](https://karma-runner.github.io).
