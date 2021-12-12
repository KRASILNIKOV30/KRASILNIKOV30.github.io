import { makeClassName } from '../../core/functions/makeClassName';
import './input.css';

interface InputProps {
    style: 'small' | 'big',
    placeholder?: string,
    value?: string,
    onKeyUp: (value: string) => void
}

export const Input = ({
    style,
    value,
    onKeyUp,
    placeholder = ""
}: InputProps) => {
    return (
        <input
            autoFocus={style === 'big'}
            type='text'
            value={value}
            className={makeClassName('input', {
                'style': style
            })}
            placeholder={placeholder}
            onKeyUp={(event) => {
                if (event.key === 'Enter') {
                    onKeyUp(event.currentTarget.value)
                }}}
        ></input>
    )
}