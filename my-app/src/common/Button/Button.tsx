import './Button.css';
import { makeClassName } from '../functions/utils/makeClassName';

interface ButtonProps {
    style: 'default' | 'outline' | 'delete' | 'redo' | 'undo',
    text: string,
    onClick: () => void
}

export const Button = ({
    style,
    text,
    onClick
}: ButtonProps) => {
    return (
        <button
            type = "button"
            className = {makeClassName('button', {
                'style': style
            })}
            onClick={onClick}
        >
            {style === 'default' || style === 'outline' ? text : ' '}
        </button>
    )
}