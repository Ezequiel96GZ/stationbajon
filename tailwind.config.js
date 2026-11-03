// Debe cargarse DESPUÉS del script de Tailwind CDN
tailwind.config = {
    theme: {
        extend: {
            colors: {
                brand: {
                    yellow: '#FACC15',
                    darkYellow: '#EAB308',
                    black: '#000000',
                    darkCard: '#121212',
                    darkInput: '#1E1E1E'
                }
            },
            fontFamily: {
                oswald: ['Oswald', 'sans-serif'],
                roboto: ['Roboto', 'sans-serif']
            }
        }
    }
};
