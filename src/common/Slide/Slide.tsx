import './Slide.css'

interface SlideViewProps {
    slideElements: Array<JSX.Element>,
    background: string
}

export const SlideView = ({
    slideElements,
    background,
}: SlideViewProps) => {
    const stringStile: string = background[0] !== '#' ? '0 0/cover url(' + background + ')' : background;
    return (
        <div 
            className = "slide"
            style = {{"background": stringStile}}
        >
            <ul>{slideElements}</ul>                
        </div>
    )
}