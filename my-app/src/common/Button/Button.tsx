import './Button.css';
import { makeClassName } from '../functions/utils/makeClassName';

interface ButtonProps {
    style: 'default' | 'outline' | 'delete' | 'redo' | 'undo' | 'drop_down',
    text?: string,
    active?: boolean,
    onClick: () => void
}

export const Button = ({
    style,
    text = '',
    active = false,
    onClick
}: ButtonProps) => {
    return (
        <button
            type = "button"
            className = {makeClassName('button', {
                'style': style,
                'active': active
            })}
            onClick={onClick}
        >
            <div className = {makeClassName('text_container', {
                'style': style,
                'active': active
            })}>
                {text}
            </div>
        </button>
    )
}