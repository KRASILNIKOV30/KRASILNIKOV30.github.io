import './Button.css';
import { makeClassName } from '../../core/functions/makeClassName';

interface ButtonProps {
    style: 'default' | 'outline' | 'delete' | 'redo' | 'undo' | 'sign',
    text?: string,
    onClick: () => void
}

export const Button = ({
    style,
    text = '',
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
            <div className = {makeClassName('text_container', {
                'style': style
            })}>
                {text}
            </div>
        </button>
    )
}