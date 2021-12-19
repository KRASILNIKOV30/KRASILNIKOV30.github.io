import type { FigureType } from '../../../model/types'
import type { Size } from '../../../core/types/types'

interface FigureProps {
    figure: FigureType,
    size: Size
}

const Circle = ({
    figure,
    size
}: FigureProps) => {
    const width: number = size.width
    const height: number = size.height
    return (
        <div>
            <svg
                width = {width}
                height = {height}
            >
                <ellipse
                    rx = {size.width/2}
                    ry = {size.height/2}
                    cx = {width/2}
                    cy = {height/2}
                    fill = {figure.fillColor}
                    stroke = {figure.strokeColor}
                    strokeWidth = {figure.strokeWidth}
                >
                </ellipse>
            </svg>
        </div>
    )
}

const Rectangle = ({
    figure,
    size
}: FigureProps) => {
    const width: number = size.width
    const height: number = size.height
    return (
        <div>
            <svg
                width = {width}
                height = {height}
            >
                <rect
                    x = {figure.strokeWidth}
                    y = {figure.strokeWidth}
                    width = {size.width}
                    height = {size.height}
                    fill = {figure.fillColor}
                    stroke = {figure.strokeColor}
                    strokeWidth = {figure.strokeWidth}
                >
                </rect>
            </svg>
        </div>
    )
}

const Triangle = ({
    figure,
    size
}: FigureProps) => {
    const width: number = size.width
    const height: number = size.height 
    const points: string = String(figure.strokeWidth) + ', ' + String(height-figure.strokeWidth) + ' ' + String(width/2) + ',' + String(figure.strokeWidth) + ' ' + String(width-figure.strokeWidth) + ',' + String(height-figure.strokeWidth)
    return (
        <div>
            <svg
                width = {width}
                height = {height}
            >
                <polygon
                    points = {points}
                    fill = {figure.fillColor}
                    stroke = {figure.strokeColor}
                    strokeWidth = {figure.strokeWidth}
                >
                </polygon>
            </svg>
        </div>
    )
}

const Figure = ({
    figure,
    size
}: FigureProps) => {
    switch (figure.form) {
        case "rectangle":
            return (
                <div>
                    <Rectangle
                        figure = {figure}
                        size = {size}
                    />
                </div>
            )

        case "circle":
            return (
                <div>
                    <Circle
                        figure = {figure}
                        size = {size}
                    />    
                </div>
                
            )
            
        case "triangle":
            return (
                <div>
                    <Triangle
                        figure = {figure}
                        size = {size}
                    />            
                </div>
            )    
    }
}
export {Figure}