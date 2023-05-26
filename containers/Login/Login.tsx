'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';

import { validateEmail } from '../../utils/validateEmail';
import { setCookie } from '../../utils/cookies';

import { USER_TOKEN_KEY } from '../../utils/constants';

import { LOGIN } from './graphql/login';

import { Input } from '../../ui/Input';
import { Anchor } from '../../ui/Anchor';
import { Alert } from '../../ui/Alert';
import { Button } from '../../ui/Button';

import { Heading, Title, Wrapper, AnchorWrapper } from './Login.styles';

export function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    message: '',
  });

  const [loginAction, { loading }] = useMutation(LOGIN, {
    onCompleted(data) {
      const response = data?.login;
      const { token } = response;

      const timeToExpire = 60 * 60 * 24 * 26; // 26 days

      setCookie(USER_TOKEN_KEY, token, timeToExpire);
      router.push('/');
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
    hasErrors || !validateEmail(email) || password.length <= 7;

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

  return (
    <Wrapper onSubmit={handleForm}>
      {errors.message && (
        <Alert
          message={errors.message}
          handleClose={handleCloseAlert}
          type="error"
        />
      )}

      <Title>Miconomy</Title>

      <Heading>Ingreso</Heading>
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
      <Button
        type="submit"
        disabled={isFormValid}
        fullWidth
        size="large"
        style="primary"
        loading={loading}
      >
        Ingresar
      </Button>
      <AnchorWrapper>
        <Anchor link="/signup" text="¿No tienes cuenta?" />
      </AnchorWrapper>
    </Wrapper>
  );
}
