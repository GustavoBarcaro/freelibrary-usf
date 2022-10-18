import { FormControl, FormLabel, Input, InputProps } from "@chakra-ui/react";
import React from "react";

interface TextInputProps extends InputProps {
  label: string;
}

const TextInput = React.forwardRef(
  (
    props: TextInputProps,
    ref: React.LegacyRef<HTMLInputElement> | undefined
  ) => {
    return (
      <FormControl>
        <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
        <Input ref={ref} id={props.id} {...props} />
      </FormControl>
    );
  }
);

export default TextInput;
