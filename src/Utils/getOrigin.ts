export const getAPIOrigin = (): string => {
    switch (process.env.NODE_ENV) {
        case 'production':
            return 'https://backend.hackarena.pl';
        case 'test':
            return 'https://backend.hackarena.pl';
        default:
            return 'http://localhost:8080';
    }
}