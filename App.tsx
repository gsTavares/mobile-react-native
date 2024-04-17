import { useState } from 'react';
import Login from './components/Login';
import Menu from './components/MenuTabs';

export default function App() {

  const [user, setUser] = useState(null);

  if (!user) {
    return <Login changeStatus={(user: any) => setUser(user)} />
  } else {
    return <Menu />
  }

}