import { makeClassName } from '../../functions/utils/makeClassName'
import type { FigureType, Size } from '../../functions/model/types'

interface FigureProps {
    figure: FigureType,
    size: Size
}

const Figure = ({
    figure,
    size
}: FigureProps) => {
return (
    <div
        className = {figure.form}
        style = {{
            'background': figure.fillColor, 
            'border': figure.strokeWidth + ' solid ' + figure.strokeColor,
            'width': size.width,
            'height': size.height
        }}
    >

    </div>
)}
export {Figure}