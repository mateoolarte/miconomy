import { useState } from 'react';

import { validateEmail } from '../../utils/validateEmail';

import Input from '../ui/Input';
import Anchor from '../ui/Anchor';

import { Wrapper, Title } from './styled';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const hasErrors = errors.email !== '' || errors.password !== '';

  function handleEmailValidation(value) {
    if (!validateEmail(value)) {
      setErrors({
        ...errors,
        email: 'El correo electrónico ingresado no es correcto',
      });
    } else {
      setErrors({
        ...errors,
        email: '',
      });
    }
  }

  function handlePasswordValidation(value) {
    if (value.length <= 7) {
      setErrors({
        ...errors,
        password: 'La contraseña debe tener mínimo 8 caracteres',
      });
    } else {
      setErrors({
        ...errors,
        password: '',
      });
    }
  }

  function handleLogin(e) {
    e.preventDefault();

    console.log('Form');
  }

  return (
    <Wrapper
      onSubmit={handleLogin}
      className="flex flex-col mt-12 w-11/12 md:max-w-xl mx-auto"
    >
      <Title className="text-4xl mb-8 font-bold text-center">Ingresar</Title>
      <Input
        type="email"
        label="Correo electrónico"
        value={email}
        onChange={e => setEmail(e.target.value)}
        onBlur={e => handleEmailValidation(e.target.value)}
        className="w-full"
        errorMessage={errors.email}
        required
      />
      <Input
        type="password"
        label="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        onBlur={e => handlePasswordValidation(e.target.value)}
        className="w-full"
        errorMessage={errors.password}
        showPlainPassword
        required
      />
      <Anchor
        link="/recuperar-contrasena"
        text="¿Olvidaste tu contraseña?"
        className="self-start"
      />
      <button
        type="submit"
        className="w-auto self-center mb-4 bg-green-500 text-gray-50 py-2.5 px-8 rounded font-bold text-lg transition-colors hover:bg-green-600 hover:shadow disabled:opacity-50"
        disabled={hasErrors || !validateEmail(email) || password.length <= 7}
      >
        Ingresar
      </button>
      <Anchor
        link="/registro"
        text="¿No tienes cuenta?"
        className="self-center"
      />
    </Wrapper>
  );
}
