import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";

const client = new ApolloClient({
    uri: 'http://localhost:8080',
    cache: new InMemoryCache(),
});

export default client;