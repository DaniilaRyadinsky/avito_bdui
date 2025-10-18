import { useCallback, useMemo } from 'react'
import { Section } from './Section'
import type { SnackbarComponent } from '../../../entities/screenAddons/model/screenAddonsTypes';
import { TextInput } from '../../../shared/ui/TextInput/TextInput';
import { useBuilder } from '../../Builder/lib/builderContext';
import { NumberInput } from '../../../shared/ui/NumberInput/NumberInput';

const SnackbarGroup = () => {
    const { screen, updateScreen, selectedSnackBarId } = useBuilder();

    const patchSnackbar = useCallback(
        (patch: Partial<SnackbarComponent>) => {
            if (!screen || !selectedSnackBarId) return;
            updateScreen(prev => {
                const list = (prev.snackbars ?? []).map(s =>
                    s._id === selectedSnackBarId ? { ...s, ...patch } : s
                );
                return { ...prev, snackbars: list };
            });
        },
        [screen, selectedSnackBarId, updateScreen]
    );

    const snackbar: SnackbarComponent | null = useMemo(() => {
        if (!screen || !selectedSnackBarId) return null;
        return (screen.snackbars ?? []).find(s => s._id === selectedSnackBarId) ?? null;
    }, [screen, selectedSnackBarId]);

    return (
        <div className="panel-card">
            <div className="panel-card__header">Свойства</div>
            <div className="panel-card__content">
                <Section title="Свойства снекбара">
                    <TextInput
                        value={snackbar?.text}
                        placeholder="Текст"
                        onChange={(v) => patchSnackbar({ text: v })}
                    />
                    <TextInput
                        value={snackbar?.actionText ?? ""}
                        placeholder="Текст кнопки (опционально)"
                        onChange={(v) => patchSnackbar({ actionText: v || undefined })}
                    />
                    <NumberInput
                        value={snackbar?.duration ?? 3000}
                        placeholder="Длительность, мс"
                        onChange={(v) => {
                            const n = Number(v);
                            patchSnackbar({ duration: Number.isFinite(n) ? n : undefined });
                        }}
                    />
                </Section>
            </div>
        </div>
    )
}

export default SnackbarGroup