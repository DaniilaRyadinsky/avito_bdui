import type { ContentScale, ImageComponent } from "../../../shared/model/types";
import { SelectBox } from "../../../shared/ui/SelectBox/SelectBox";
import { TextInput } from "../../../shared/ui/TextInput/TextInput";
import { Section } from "./Section";

export const ImageStyleGroup: React.FC<{
    value?: ImageComponent; onChange: (next: Partial<ImageComponent>) => void;
}> = ({ value, onChange }) => {

    const setImg = (patch: Partial<ImageComponent>) => {
        console.log(patch)
        onChange({ ...value, ...patch });
    }


    return (<Section title="Свойства изображения" >
        <TextInput value={value?.url} placeholder="Ссылка на картинку" onChange={(v) => setImg({url: v})} />

        <SelectBox value={String(value?.contentScale ?? "None")} onChange={(v) => setImg({ contentScale: v as ContentScale })}
            options={["Fill", "FillHeight", "Crop", "FillWidth", "Inside", "None", "FillBounds"].map(x => ({ label: x, value: x }))}
        />
    </Section >)
}
    ;