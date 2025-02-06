const originalError = console.error;
beforeAll(() => {
    console.warn = (...args) => {
        if (
            args[0]?.includes('act()') ||
            args[0]?.includes('React Router')
        ) {
            return; // Suppress only specific warnings
        }
        originalError(...args);
    };
});
