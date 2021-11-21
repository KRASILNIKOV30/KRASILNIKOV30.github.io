type PaletteType = {
    paletteElements: Array<PaletteElement>;
    selectedPaletteElementId: string;
}

type PaletteElement = {
    paletteElementId: string;
    isSelected: boolean;
    className: string;
    onClick: () => void;
}

export type { PaletteType }