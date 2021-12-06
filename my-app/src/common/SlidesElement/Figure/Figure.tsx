import { makeClassName } from '../../functions/utils/makeClassName'
import type { FigureType, Size } from '../../functions/model/types'
import { forEachTrailingCommentRange } from 'typescript'

interface FigureProps {
    figure: FigureType,
    size: Size
}

const Circle = ({
    figure,
    size
}: FigureProps) => {
    const width: number = size.width + (2*figure.strokeWidth)
    const height: number = size.height + (2*figure.strokeWidth) 
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
                    stroke-width = {figure.strokeWidth}
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
    const width: number = size.width + (2*figure.strokeWidth)
    const height: number = size.height + (2*figure.strokeWidth)
    console.log(String(figure.strokeWidth) + ', ' + String(height-figure.strokeWidth) + ' ' + String(width/2) + ',' + String(figure.strokeWidth) + ' ' + String(width-figure.strokeWidth) + ',' + String(height-figure.strokeWidth))  
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
                    stroke-width = {figure.strokeWidth}
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
    const width: number = size.width + (2*figure.strokeWidth)
    const height: number = size.height + (2*figure.strokeWidth)
    const points: string = String(figure.strokeWidth) + ', ' + String(height-figure.strokeWidth) + ' ' + String(width/2) + ',' + String(figure.strokeWidth) + ' ' + String(width-figure.strokeWidth) + ',' + String(height-figure.strokeWidth)
    console.log(String(figure.strokeWidth)) 
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
                    stroke-width = {figure.strokeWidth}
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