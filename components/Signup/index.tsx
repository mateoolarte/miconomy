import { useState, ReactElement } from 'react';

import { validateEmail } from '../../utils/validateEmail';

import Input from '../ui/Input';
import Anchor from '../ui/Anchor';
import Alert from '../ui/Alert';

export default function Signup(): ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    message: '',
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

  function handleForm(e) {
    e.preventDefault();

    console.log('Form');
  }

  return (
    <form
      onSubmit={handleForm}
      className="flex flex-col mt-12 w-11/12 md:max-w-xl mx-auto"
    >
      {errors.message && <Alert color="red" message={errors.message} />}

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
      <button
        type="submit"
        className="w-auto self-center mb-4 bg-green-500 text-gray-50 py-2.5 px-8 rounded font-bold text-lg transition-colors hover:bg-green-600 hover:shadow disabled:opacity-50"
        disabled={hasErrors || !validateEmail(email) || password.length <= 7}
      >
        Crear cuenta
      </button>
      <Anchor
        link="/ingresar"
        text="¿Ya tienes cuenta?"
        className="self-center"
      />
    </form>
  );
}
