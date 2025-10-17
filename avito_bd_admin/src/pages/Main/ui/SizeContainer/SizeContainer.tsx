import styles from '../../Main.module.css'
import { NumberInput } from '../../../../shared/ui/NumberInput/NumberInput'
import { useBuilder } from '../../../../features/Builder/lib/builderContext';

const SizeContainer = () => {
    const { screen, updateScreen } = useBuilder();

    console.log(screen)
    return (
        <div className={styles.input_container}>
            <NumberInput
                value={screen?.width}
                min={0}
                max={2000}
                onChange={(e) =>
                    updateScreen(prev => (prev ? { ...prev, width: Number(e) } : prev))
                }
            />
            <NumberInput
                value={screen?.height}
                min={0}
                max={2000}
                onChange={(e) =>
                    updateScreen(prev => (prev ? { ...prev, height: Number(e) } : prev))
                }
            />
        </div>
    )
}

export default SizeContainer