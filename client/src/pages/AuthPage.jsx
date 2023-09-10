import { useContext } from 'react';
import { Context } from '../context/Context';

export default function AuthPage() {
  const { authValue } = useContext(Context);

  return (
    <div>
      <h2>{authValue}</h2>
    </div>
  );
}
