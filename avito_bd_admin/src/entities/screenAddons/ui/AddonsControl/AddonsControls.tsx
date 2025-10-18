import styles from './AddonsControls.module.css'
import { useBuilder } from '../../../../features/Builder/lib/builderContext'
import type { UIScreen } from '../../../screen/model/screenTypes';
import type { BottomSheetComponent, SnackbarComponent } from '../../model/screenAddonsTypes';
import { createBottomSheet, createSnackbar } from '../../lib/templates';

const AddonsControls = () => {
  const { screen, updateScreen } = useBuilder()

  const snackbars = screen?.snackbars ?? [];
  const bottomSheets = (screen as UIScreen)?.bottomSheets ?? [];


  const handleAddBottomSheet = () => {
    if (!screen) return;
    const newBottomSheet: BottomSheetComponent = createBottomSheet();

    updateScreen((currentScreen) => ({
      ...currentScreen,
      bottomSheets: [...currentScreen.bottomSheets, newBottomSheet],
    }));
  }

  const handleAddSnackbar = () => {
    if (!screen) return;
    const newSnackbar: SnackbarComponent = createSnackbar();

    updateScreen((currentScreen) => ({
      ...currentScreen,
      snackbars: [...currentScreen.snackbars, newSnackbar],
    }));
  }



  return (
    <div className={styles.componentsList}>
      <div className={styles.libraryItem} onClick={handleAddBottomSheet}>Новый bottomSheet</div>
      <div className={styles.libraryItem} onClick={handleAddSnackbar}>Новый snackbar</div>
    </div>
  )
}

export default AddonsControls

