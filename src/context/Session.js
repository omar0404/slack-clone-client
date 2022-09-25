import { createContext, useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import jwtDecode from 'jwt-decode'


const SessionContext = createContext()
const USER_QUERY = gql`
query User($id: Int!) {
  getUser(id: $id) {
    id
    username
    email
  }
}
`;
const SessionProvider = ({ children }) => {
  const [session, setSession] = useState({})
  const { refetch: getUser } = useQuery(USER_QUERY, { skip: true })
  const _getUser = async userId => {
    let user;
    try {
      let res = await getUser({ id: userId })
      user = res?.data?.getUser
      console.log("_getUser", user)
    } catch (error) {
      console.log("_getUser-err", error)
    }
    setSession(user)
  }
  useEffect(() => {
    let user;
    try {
      user = jwtDecode(localStorage.getItem('token'))
      _getUser(user.userId)
      console.log('session', user)
    } catch (error) {
      console.log('error', error)
    }
  }, [])
  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  )

}
export { SessionProvider, SessionContext }