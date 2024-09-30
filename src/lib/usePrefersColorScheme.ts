import { useState, useEffect } from 'react';
import { ColorSchemeType } from '@/components/themes';

export function usePrefersColorScheme(defaultValue?: ColorSchemeType): ColorSchemeType {

    const [preferredColorScheme, setPreferredColorScheme] = useState<ColorSchemeType>(() => {
        if (typeof window === 'undefined') {
            return defaultValue ?? "light"
        }
        else {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"
        }
    });

    const onChange = (event: MediaQueryListEvent): void => {
        setPreferredColorScheme(event.matches ? 'dark' : 'light');
    }

    useEffect(() => {
        if (!window.matchMedia) {
            setPreferredColorScheme('light');
            return;
        }

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setPreferredColorScheme(mediaQuery.matches ? 'dark' : 'light');

        mediaQuery.addEventListener('change', onChange);

        return () => {
            mediaQuery.removeEventListener('change', onChange);
        };
    }, []);

    return preferredColorScheme;
}