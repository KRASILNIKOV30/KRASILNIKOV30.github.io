import './Button.css';
import { makeClassName } from '../functions/utils/makeClassName';

interface ButtonProps {
    style: 'default' | 'outline',
    action?: boolean,
    active?: boolean,
    text: string,
    onClick: () => void
}

export const Button = ({
    style,
    active = false,
    action = false,
    text,
    onClick
}: ButtonProps) => {
    return (
        <button
            type="button"
            className = {makeClassName('button', {
                'active': active,
                'action': action,
                'style': style
            })}
            onClick={onClick}
        >
            {text}
        </button>
    )
}