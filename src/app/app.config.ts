import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core'
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http'
import {provideRouter} from '@angular/router'
import {Apollo, APOLLO_OPTIONS} from 'apollo-angular'
import {HttpLink} from 'apollo-angular/http'
import {
  ApolloLink,
  InMemoryCache,
  type ApolloClientOptions,
} from '@apollo/client/core'
import {routes} from './app.routes'

const GRAPHQL_URL = 'http://localhost:3000/graphql'

function createApollo(httpLink: HttpLink): ApolloClientOptions<unknown> {
  return {
    link: ApolloLink.from([httpLink.create({uri: GRAPHQL_URL})]),
    cache: new InMemoryCache(),
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
    Apollo,
  ],
}
