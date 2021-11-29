import './SlideEditor.css';

type SlideBarProps = {
    background: string;
}

function SlideEditor({ background }: SlideBarProps) {
    return (
        <div className="slide-container">
            <div 
                className="slide"
                style = {{"background": background}}
            >
            </div>
        </div>
    )
}

export { SlideEditor }