import {Apollo, gql} from 'apollo-angular'

import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apollo: Apollo) {}

  // Obter todos os usuários
  getUsers(): Observable<any> {
    return this.apollo.query({
      query: gql`
        query {
          users {
            id
            name
            email
          }
        }
      `,
    })
  }

  // Criar um novo usuário
  createUser(name: string, email: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          createUser(createUserInput: { name: "${name}", email: "${email}" }) {
            id
            name
            email
          }
        }
      `,
    })
  }

  // Atualizar um usuário existente
  updateUser(id: number, name?: string, email?: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          updateUser(updateUserInput: { id: ${id}, name: "${name}", email: "${email}" }) {
            id
            name
            email
          }
        }
      `,
    })
  }

  // Remover um usuário
  removeUser(id: number): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          removeUser(id: ${id})
        }
      `,
    })
  }
}
