import { useState, ReactElement } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import { validateEmail } from '../../utils/validateEmail';
import { setCookie } from '../../utils/cookies';

import { USER_TOKEN_KEY } from '../../utils/constants';

import { SIGNUP } from './graphql/signup';

import { Input } from '../../ui/Input';
import { Anchor } from '../../ui/Anchor';
import { Alert } from '../../ui/Alert';
import { Button } from '../../ui/Button';

export function Signup(): ReactElement {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    message: '',
  });

  const [signupAction, { loading }] = useMutation(SIGNUP, {
    onCompleted(data) {
      const response = data?.signup;
      const { token } = response;

      const timeToExpire = 60 * 60 * 24 * 26; // 26 days

      setCookie(USER_TOKEN_KEY, token, timeToExpire);
      router.push({
        pathname: '/',
        query: {
          message: 'Te registraste correctamente',
        },
      });
    },
    onError(error) {
      const { message } = error;

      setErrors({
        ...errors,
        message,
      });
    },
  });

  const hasErrors = errors.email !== '' || errors.password !== '';
  const isFormValid =
    hasErrors || !validateEmail(email) || password.length <= 7 || loading;

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
    <form onSubmit={handleForm}>
      {errors.message && (
        <Alert message={errors.message} handleClose={handleCloseAlert} />
      )}

      <h1>Registro</h1>
      <Input
        type="email"
        label="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={(e) => handleEmailValidation(e.target.value)}
        errorMessage={errors.email}
        required
      />
      <Input
        type="password"
        label="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={(e) => handlePasswordValidation(e.target.value)}
        errorMessage={errors.password}
        showPlainPassword
        required
      />
      <Button type="submit" disabled={isFormValid}>
        Registrarme
      </Button>
      <Anchor link="/login" text="¿Ya tienes cuenta?" />
    </form>
  );
}
