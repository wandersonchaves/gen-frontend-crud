import {Apollo, gql} from 'apollo-angular'
import {Observable, of} from 'rxjs'
import {catchError, map} from 'rxjs/operators'

import {Injectable} from '@angular/core'
import type {User} from '@/types'

const GET_USERS = gql`
  query {
    users {
      id
      name
      email
    }
  }
`

const CREATE_USER = gql`
  mutation createUser($name: String!, $email: String!) {
    createUser(createUserInput: {name: $name, email: $email}) {
      id
      name
      email
    }
  }
`

const UPDATE_USER = gql`
  mutation updateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
      name
      email
    }
  }
`

const REMOVE_USER = gql`
  mutation removeUser($id: Int!) {
    removeUser(id: $id)
  }
`

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apollo: Apollo) {}

  // Método para obter todos os usuários
  getUsers(): Observable<User[]> {
    return this.apollo
      .watchQuery<{users: User[]}>({
        query: GET_USERS,
      })
      .valueChanges.pipe(
        map((result) => result.data?.users ?? []),
        catchError((error) => {
          console.error('Error fetching users:', error)
          return of([])
        }),
      )
  }

  // Método para criar um novo usuário
  createUser(name: string, email: string): Observable<User | null> {
    return this.apollo
      .mutate<{createUser: User}>({
        mutation: CREATE_USER,
        variables: {name, email},
        refetchQueries: [{query: GET_USERS}], // Refetch após criação
      })
      .pipe(
        map((result) => result.data?.createUser ?? null),
        catchError((error) => {
          console.error('Error creating user:', error)
          return of(null)
        }),
      )
  }

  // Método para atualizar um usuário existente
  updateUser(id: number, name: string, email: string): Observable<User | null> {
    const updateUserInput = {id: Number(id), name, email}

    return this.apollo
      .mutate<{updateUser: User | null}>({
        mutation: UPDATE_USER,
        variables: {updateUserInput},
        refetchQueries: [{query: GET_USERS}],
      })
      .pipe(
        map((result) => result.data?.updateUser ?? null),
        catchError((error) => {
          console.error('Error updating user:', error)
          return of(null)
        }),
      )
  }

  // Método para remover um usuário
  removeUser(id: number): Observable<boolean> {
    return this.apollo
      .mutate<{removeUser: boolean}>({
        mutation: REMOVE_USER,
        variables: {id},
        refetchQueries: [{query: GET_USERS}], // Refetch após exclusão
      })
      .pipe(
        map((result) => result.data?.removeUser ?? false),
        catchError((error) => {
          console.error('Error removing user:', error)
          return of(false)
        }),
      )
  }
}
