import { ForwardedRef, useState, forwardRef } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input as InputUI,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";

import EyeOpen from "../icons/EyeOpen";
import EyeClose from "../icons/EyeClose";
interface InputProps {
  type: string;
  name?: string;
  label?: string;
  value: string | number;
  onChange: any;
  onBlur?: any;
  error?: string;
  hasInputChange?: boolean;
  required?: boolean;
}

export function InputComponent(
  props: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const {
    type,
    name,
    label,
    value,
    onChange,
    onBlur,
    error,
    hasInputChange,
    required,
  } = props;
  const [show, setShow] = useState(false);
  const toggleInputType = hasInputChange && show ? "text" : type;
  const ariaLabelPasswordIcon = `${show ? "Ocultar" : "Mostrar"} contraseña`;

  const handleClick = () => setShow(!show);

  return (
    <FormControl isInvalid={Boolean(error)}>
      {label && <FormLabel>{label}</FormLabel>}

      <InputGroup>
        <InputUI
          type={toggleInputType}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          ref={ref}
        />

        {hasInputChange && (
          <InputRightElement>
            <IconButton
              onClick={handleClick}
              icon={show ? <EyeOpen /> : <EyeClose />}
              aria-label={ariaLabelPasswordIcon}
              p="3"
            />
          </InputRightElement>
        )}
      </InputGroup>

      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
}

export const Input = forwardRef(InputComponent);
