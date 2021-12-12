import { Button } from '../Button/Button';
import './Knob.css';

interface KnobProps {
    value: string,
    onClick: () => void
}

export const Knob = ({
    value,
    onClick
}: KnobProps) => {
    return (
        <div className="knob">
            <table className="table">
                <td className="roller-minus">
                    <Button
                        style={'default'}
                        onClick={console.log}
                    />
                </td>
                <td className="knob_value">
                    <p className="value">
                        {value}
                    </p>
                </td>
                <td className="roller-plus">
                    <Button
                        style={'default'}
                        onClick={console.log}
                    />
                </td>
            </table>
        </div>
    )
}