import { useState, ReactElement } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import { validateEmail } from '../../utils/validateEmail';
import { setCookie } from '../../utils/cookies';

import { checkAuth } from '../../utils/checkAuth';
import { USER_TOKEN_KEY } from '../../utils/constants';

import { LOGIN } from './graphql/login';

import Input from '../ui/Input';
import Anchor from '../ui/Anchor';
import Alert from '../ui/Alert';

export default function Login(): ReactElement {
  const router = useRouter();
  const isAuth = checkAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    message: '',
  });
  const [loginAction] = useMutation(LOGIN, {
    onCompleted(data) {
      const loginResponse = data?.login;
      const { message, status, token } = loginResponse;

      if (status === 202) {
        const timeToExpire = 120;

        setCookie(USER_TOKEN_KEY, token, timeToExpire);
        router.push('/');
      }

      if (status === 404) {
        setErrors({
          ...errors,
          message,
        });
      }
    },
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

  function handleCloseAlert() {
    setErrors({
      ...errors,
      message: '',
    });
  }

  function handleForm(e) {
    e.preventDefault();

    loginAction({
      variables: {
        email,
        password,
      },
    });
  }

  if (isAuth) router.push('/');

  return (
    <form
      onSubmit={handleForm}
      className="flex flex-col mt-12 w-11/12 md:max-w-xl mx-auto"
    >
      {errors.message && (
        <Alert
          color="red"
          message={errors.message}
          handleClose={handleCloseAlert}
        />
      )}

      <h1 className="text-4xl mb-8 font-bold text-center">Ingresar</h1>
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
    </form>
  );
}
