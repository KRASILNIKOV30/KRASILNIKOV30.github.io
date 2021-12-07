import './input.css';

interface InputProps {
    placeholder?: string,
    value?: string,
    onKeyUp: (value: string) => void
}

export const Input = ({
    value,
    onKeyUp,
    placeholder
}: InputProps) => {
    return (
        <input
          type='text'
          value={value}
          className='input'
          placeholder={placeholder}
          onKeyUp={(event) => {
              if (event.key === 'Enter') {
                onKeyUp(event.currentTarget.value)
            }}}
        ></input>
    )
}