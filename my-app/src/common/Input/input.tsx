import './input.css';
import { makeClassName } from '../functions/utils/makeClassName';

interface InputProps {
    type?: 'text',
    placeholder?: string,
    style: 'default',
    value: string | undefined,
    size: 'default',
    onChange: (value: string) => void
}

export const Input = ({
    style = 'default',
    size = 'default',
    type = 'text',
    value,
    ...props 
}: InputProps) => {
    return (
        <input
          type={type}
          value={value}
          className={makeClassName('input', { size })}
          placeholder={props.placeholder}
          onChange={(event) => onchange}
        ></input>
    )
}