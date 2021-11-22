import { uuid } from 'uuidv4';
import { makeClassName } from '../functions/utils/makeClassName';
import './Palette.css';

interface PaletteProps {
    selectedPaletteElementId: string;
}   

 export const Palette = ({
    selectedPaletteElementId = '',
}: PaletteProps) => {
    const paletteElements = [];
    const colors = ['#FFD966']
    for (let i = 1; i <= 80; i++) {
        const paletteElementId = uuid();
        const isSelected = selectedPaletteElementId === paletteElementId;
        paletteElements.push({
            paletteElementId: paletteElementId,
            isSelected: isSelected,
            className: makeClassName('paletteElement', {
                'color': i.toString(),
                'selected': isSelected
            }),
            onClick: () => console.log(paletteElementId)
        });
    }
    const listElements = paletteElements.map((paletteElement) => 
        <li 
            key = {paletteElement.paletteElementId}
            className = {paletteElement.className}
            style = {{"background": colors[0]}}
            onClick = {paletteElement.onClick} 
        >
        </li>
    )
    return (
        <ul className = 'palette'>{listElements}</ul>
    )
}