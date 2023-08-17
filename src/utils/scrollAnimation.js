export function scrollPageToTop() {
    var currentPosition = window.scrollY;

    var distance = currentPosition;
    var duration = 400;

    var startTime;

    function step(currentTime) {
        if (!startTime) {
            startTime = currentTime;
        }

        var elapsed = currentTime - startTime;
        var position = easeInOut(elapsed, currentPosition, -distance, duration);
        window.scrollTo(0, position);

        if (elapsed < duration) {
            window.requestAnimationFrame(step);
        }
    }

    function easeInOut(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    window.requestAnimationFrame(step);
}

export const scrollToSearch = (searchRef) => {
    if (searchRef.current) {
        searchRef.current.scrollIntoView({ behavior: 'smooth' });
    }
};

