import './input.css';
import { makeClassName } from '../functions/utils/makeClassName';

interface InputProps {
    placeholder?: string,
    value: string | undefined,
    focused: boolean,
    onChange: (value: string) => void
}

export const Input = ({
    value,
    focused,
    ...props 
}: InputProps) => {
    return (
        <input
          value={value}
          className = {makeClassName('input', {
            'focused': focused
        })}
          placeholder={props.placeholder}
          onChange={(event) => onchange}
        ></input>
    )
}