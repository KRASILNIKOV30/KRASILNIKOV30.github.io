import styles from './Slide.module.css'

interface SlideViewProps {
    slideElements: Array<JSX.Element>,
    background: string
}

export const SlideView = ({
    slideElements,
    background,
}: SlideViewProps) => {
    console.log('SlideView render')  
    const stringStile: string = background[0] !== '#' ? '0 0/cover url(' + background + ')' : background;
    return (
        <div 
            className = {styles.slide}
            style = {{"background": stringStile}}
        >
            <ul>{slideElements}</ul>                
        </div>
    )
}