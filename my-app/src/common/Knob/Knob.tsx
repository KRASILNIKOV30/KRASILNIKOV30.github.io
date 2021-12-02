import './Knob.css';
import '../Button/Button.tsx';
import '../Button/Button.css';
import { makeClassName } from '../functions/utils/makeClassName';
import { Button } from '../Button/Button';

interface KnobProps {
    text?: string,
    value?: number,
    onClick: () => void
}

export const Knob = ({
    text = '',
    onClick
}: KnobProps) => {
    return (
        <div className="Knob">
            <table className="Table">
                <td className="Roller">
                    <Button
                        style='sign'
                        text='-'
                        onClick={console.log}
                    />
                </td>
                <td className="Knob_value">
                    0
                </td>
                <td className="Roller">
                    <Button
                        style='sign'
                        text='+'
                        onClick={console.log}
                    />
                </td>
            </table>
        </div>
    )
}