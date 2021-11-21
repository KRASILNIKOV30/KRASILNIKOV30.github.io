import { uuid } from 'uuidv4';
import { makeClassName } from '../functions/utils/makeClassName';
import './Palette.css';
import type { PaletteType } from './PaletteTypes'



interface PaletteProps {
    selectedPaletteElementId: string;
}   

 export const Palette = ({
    selectedPaletteElementId = '',
}: PaletteProps) => {
    const paletteElements = [];
    for (let i = 1; i <= 80; i++) {
        const paletteElementId = uuid();
        const isSelected = selectedPaletteElementId == paletteElementId;
        paletteElements.push({
            paletteElementId: paletteElementId,
            isSelected: isSelected,
            className: makeClassName('paletteElement', {
                'color': i.toString(),
                selected: isSelected
            }),
            onClick: () => {
                return(paletteElementId)
            }
        });
    }
    const listElements = paletteElements.map((paletteElement) => 
        <li key={paletteElement.paletteElementId}>
            {paletteElement}
        </li>
    )
    return (
        <ul>{listElements}</ul>
    )
}