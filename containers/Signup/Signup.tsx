import { useState, FormEvent, ChangeEvent, FocusEvent } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { Box, Heading, VStack } from '@chakra-ui/react';

import { validateEmail } from '@/utils/validateEmail';
import { setCookie } from '@/utils/cookies';

import { USER_TOKEN_KEY } from '@/constants';

import { SIGNUP } from './graphql/signup';

import { Input } from '@/ui/Input';
import { Anchor } from '@/ui/Anchor';
import { Toast } from '@/ui/Toast';
import { Button } from '@/ui/Button';

const initialErrorsState = {
  email: '',
  password: '',
  message: '',
};

export function Signup() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(initialErrorsState);

  const [signupAction, { loading }] = useMutation(SIGNUP, {
    onCompleted(data) {
      const response = data?.signup;
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

  function validateForm() {
    const hasErrors = errors.email !== '' || errors.password !== '';

    return hasErrors || !validateEmail(email) || password.length <= 7;
  }

  function handleEmailValidation(value: string) {
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

  function handlePasswordValidation(value: string) {
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

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setErrors(initialErrorsState);

    const name = e.target.name;
    const value = e.target.value;

    if (name == 'email') setEmail(value);
    if (name == 'password') setPassword(value);
  }

  function handleInputFocus(e: FocusEvent<HTMLInputElement>) {
    const name = e.target.name;
    const value = e.target.value;

    if (name == 'email') handleEmailValidation(value);
    if (name == 'password') handlePasswordValidation(value);
  }

  function handleForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrors(initialErrorsState);

    signupAction({
      variables: {
        email,
        password,
      },
    });
  }

  const isFormValid = validateForm();

  return (
    <Box as="form" mx="auto" w="95%" onSubmit={handleForm}>
      {errors.message && <Toast title={errors.message} status="error" />}

      <Heading size="2xl" my="12" fontWeight="800" textAlign="center">
        Miconomy
      </Heading>

      <Heading size="lg" mb="6" textAlign="center">
        Registro
      </Heading>

      <VStack spacing="5">
        <Input
          type="email"
          name="email"
          label="Correo electrónico"
          value={email}
          onChange={handleInputChange}
          onBlur={handleInputFocus}
          error={errors.email}
          required
        />

        <Input
          type="password"
          name="password"
          label="Contraseña"
          value={password}
          onChange={handleInputChange}
          onBlur={handleInputFocus}
          error={errors.password}
          hasInputChange
          required
        />

        <Button
          type="submit"
          disabled={isFormValid}
          fullWidth
          size="lg"
          variant="solid"
          style="blue"
          loading={loading}
        >
          Registrarme
        </Button>
      </VStack>

      <Box mt="8" textAlign="center">
        <Anchor link="/login">¿Ya tienes cuenta?</Anchor>
      </Box>
    </Box>
  );
}
