import styles from './Text.module.css';
import type { TextType } from '../../../model/types'
import { connect } from 'react-redux';

interface TextProps {
    text: TextType,
    placeholder?: string,
    onKeyUp: (value: string) => void
}

const Text = ({
    text,
    onKeyUp,
    placeholder
}: TextProps) => {
    if (!text.fontSize) {
        text.fontSize = 10;        
    }
    if (!text.textColor) {
        text.textColor = '#000000'
    }
    if (!text.fontWeight) {
        text.fontWeight = 'light'
    }
    if (!text.bgColor) {
        text.bgColor = '#FFFFFF'
    }
    return (
        <input
            autoFocus
            type = 'text'
            value = {text.textValue!}
            className = {styles.text}
            placeholder = {placeholder}
            onKeyUp = {(event) => {
                if (event.key === 'Enter') {
                    onKeyUp(event.currentTarget.value)
                }}}
            style = {{
                'fontFamily': text.font,
                'fontWeight': text.fontWeight,
                'fontSize': text.fontSize,
                'color': text.textColor,
                'background': text.bgColor
            }}    
        ></input>
    )
}

export default connect()(Text)