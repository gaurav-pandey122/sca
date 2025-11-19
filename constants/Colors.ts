/**
 * App Color Palette
 * Designed for a premium, vibrant look.
 */

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export const Colors = {
    light: {
        text: '#000',
        background: '#fff',
        tint: tintColorLight,
        tabIconDefault: '#ccc',
        tabIconSelected: tintColorLight,
        primary: '#59B6AF', // Indigo 600
        secondary: '#10B981', // Emerald 500
        accent: '#F59E0B', // Amber 500
        danger: '#EF4444', // Red 500
        surface: '#F3F4F6', // Gray 100
        card: '#FFFFFF',
        border: '#E5E7EB',
    },
    dark: {
        text: '#fff',
        background: '#111827', // Gray 900
        tint: tintColorDark,
        tabIconDefault: '#ccc',
        tabIconSelected: tintColorDark,
        primary: '#59B6AF', // Indigo 500
        secondary: '#34D399', // Emerald 400
        accent: '#FBBF24', // Amber 400
        danger: '#F87171', // Red 400
        surface: '#1F2937', // Gray 800
        card: '#1F2937',
        border: '#374151',
    },
};
