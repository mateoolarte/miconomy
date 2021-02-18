import { useState, ReactElement } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import { validateEmail } from '../../utils/validateEmail';
import { setCookie } from '../../utils/cookies';

import { USER_TOKEN_KEY } from '../../utils/constants';

import { SIGNUP } from './graphql/signup';

import Input from '../ui/Input';
import Anchor from '../ui/Anchor';
import Alert from '../ui/Alert';
import Button from '../ui/Button';

export default function Signup(): ReactElement {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    message: '',
  });
  const [signupAction] = useMutation(SIGNUP, {
    onCompleted(data) {
      const response = data?.signup;
      const { message, status, token } = response;

      if (status === 202) {
        const timeToExpire = 60 * 60 * 24 * 26;

        setCookie(USER_TOKEN_KEY, token, timeToExpire);
        router.push({
          pathname: '/',
          query: {
            message,
          },
        });
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

    signupAction({
      variables: {
        email,
        password,
      },
    });
  }

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

      <h1 className="text-4xl mb-8 font-bold text-center">Crea tu cuenta</h1>
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
      <Button
        type="submit"
        className="self-center mb-4"
        color="green"
        size="medium"
        disabled={hasErrors || !validateEmail(email) || password.length <= 7}
      >
        Crear cuenta
      </Button>
      <Anchor
        link="/ingresar"
        text="¿Ya tienes cuenta?"
        className="self-center"
      />
    </form>
  );
}
