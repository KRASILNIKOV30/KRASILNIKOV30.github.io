import './Slide.css'

interface SlideViewProps {
    slideElements: Array<JSX.Element>,
    background: string
}

export const SlideView = ({
    slideElements,
    background,
}: SlideViewProps) => {
    return (
        <div 
            className="slide"
            style = {{"background": background}}
        >
            <ul>{slideElements}</ul>                
        </div>
    )
}