import './input.css';
import { makeClassName } from '../functions/utils/makeClassName';

interface InputProps {
    placeholder?: string,
    value: string | undefined,
    onChange: (value: string) => void
}

export const Input = ({
    value,
    ...props 
}: InputProps) => {
    return (
        <input
          value={value}
          className = {makeClassName('input', {
        })}
          placeholder={props.placeholder}
          onChange={(event) => onchange}
        ></input>
    )
}