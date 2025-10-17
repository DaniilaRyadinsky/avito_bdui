import styles from '../../Main.module.css'
import { NumberInput } from '../../../../shared/ui/NumberInput/NumberInput'
import { useBuilder } from '../../../../features/Builder/lib/builderContext';

const SizeContainer = () => {
      const { screen, updateScreen  } = useBuilder();

      console.log("width", screen?.width, "height", screen?.height)
    return (
        <div className={styles.input_container}>
            <NumberInput
                value={screen?.width}
                min={0}
                max={2000}
                onChange={(e) => updateScreen(prev => ({...prev, width: e}))}
            />
            <NumberInput
                value={screen?.height}
                min={0}
                max={2000}
                onChange={(e) => updateScreen(prev => ({...prev, height: e}))}
            />
        </div>
    )
}

export default SizeContainer