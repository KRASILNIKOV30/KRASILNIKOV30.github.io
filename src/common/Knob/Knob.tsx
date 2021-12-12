import './Knob.css';

interface KnobProps {
    value: number,
    onClick: (value: number) => void
}

export const Knob = ({
    value,
    onClick
}: KnobProps) => {
    return (
        <table className="table">
            <tr className='table_string'>
                <td 
                    className='minus_value_container'
                    onClick={() => {
                        onClick(--value)
                    }}
                ></td>
                <td className='value_container'>{value}</td>
                <td 
                    className='plus_value_container'
                    onClick={() => {
                        onClick(++value)
                    }}
                ></td>
            </tr>
        </table>
    )
}