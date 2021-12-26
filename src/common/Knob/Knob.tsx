import { connect } from 'react-redux';
import styles from './Knob.module.css';

interface KnobProps {
    value: number,
    onClick: (value: number) => void
}

const Knob = ({
    value,
    onClick
}: KnobProps) => {
    return (
        <table className={styles.table}>
            <tr className={styles.row}>
                <td 
                    className={styles.minus}
                    onClick={() => {
                        onClick(--value)
                    }}
                ></td>
                <td className={styles.value}>{value}</td>
                <td 
                    className={styles.plus}
                    onClick={() => {
                        onClick(++value)
                    }}
                ></td>
            </tr>
        </table>
    )
}

export default connect()(Knob)