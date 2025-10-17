document.addEventListener('DOMContentLoaded', () => {
    const updateTime = () => {
        const timeElement = document.querySelector('[data-testid="test-user-time"]');
        if (timeElement) {
            const currentTimeMs = Date.now();
            
            timeElement.textContent = currentTimeMs;
        }
    };

    updateTime();
    setInterval(updateTime, 100); 
});