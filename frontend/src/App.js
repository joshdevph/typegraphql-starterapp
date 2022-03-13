
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import GetAllFranchiser from './Components/GetAllFranchiser';
const errorLink = onError(({graphqlErrors, networkError}) => {
  if(graphqlErrors){
    graphqlErrors.map(({message})=>{
      alert(`GraphQL error ${message}`)
      return message
    })
  }
})
const link = from([
  errorLink,
  new HttpLink({uri: '/graphql'})
])
const ApolloHost =  new ApolloClient({
  cache: new InMemoryCache(),
  link:  link,
  
})
function App() {
  return (
    <ApolloProvider client={ApolloHost}>
        <GetAllFranchiser/>
    </ApolloProvider>
  )
}

export default App;
