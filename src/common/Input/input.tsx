import { connect } from 'react-redux';
import styles from './input.module.css';

interface InputProps {
    style: 'small' | 'big',
    placeholder?: string,
    value?: string,
    onKeyUp: (value: string) => void
}

const Input = ({
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
            className={`${styles.input} ${style === 'big' ? styles.big: styles.small}`}
            placeholder={placeholder}
            onKeyUp={(e) => {
                if (e.key === 'Enter') {
                    onKeyUp(e.currentTarget.value)
                }
            }}
        ></input>
    )
}

export default connect()(Input)