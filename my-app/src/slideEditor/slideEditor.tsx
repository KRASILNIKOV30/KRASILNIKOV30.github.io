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
                <svg
                   width = '100'
                   height = '100' 
                >
                    <ellipse
                        rx = '50'
                        ry = '50'
                        fill = 'gold'
                        stroke = 'orange'
                        stroke-width = '5'
                        cx = '50'
                        cy = '50'
                    >
                    </ellipse>
                </svg>
                <svg
                    
                >
                <ellipse
                    rx = '100'
                    ry = '25'
                    fill = 'green'
                    stroke = '#0000FF'
                    stroke-width = '5'
                    cx = '200'
                    cy = '200'
                >
                </ellipse>
            </svg>
            </div>
        </div>
    )
}

export { SlideEditor }