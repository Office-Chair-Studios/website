
/* =========================================
   PROJECT WINDOW / 3D SCROLL PERSPECTIVE
   ========================================= */

(() => {
    const panel = document.querySelector(".game-feature");

    if (!panel) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    let scheduled = false;

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function update() {
        scheduled = false;

        if (reducedMotion.matches) {
            panel.style.setProperty("--tilt-x", "0deg");
            panel.style.setProperty("--cast-x", "0px");
            panel.style.setProperty("--cast-y", "12px");
            panel.style.setProperty("--cast-scale", "1");
            return;
        }

        const rect = panel.getBoundingClientRect();

        const panelCenter = rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;

        const position = clamp(
            (panelCenter - viewportCenter) /
            (window.innerHeight * 0.65),
            -1,
            1
        );

        // Slight 3D tilt.
        // Top becomes visually wider when viewed from above.
        // Bottom becomes visually wider when viewed from below.

        const tilt = position * -1.5;

        // Shadow changes sides and expands horizontally.

        const shadowY = -position * 65;
        const shadowX = 0;
        const shadowScale = 1.06 + Math.abs(position) * 0.04;

        panel.style.setProperty(
            "--tilt-x",
            `${tilt.toFixed(2)}deg`
        );

        panel.style.setProperty(
            "--cast-x",
            `${shadowX}px`
        );

        panel.style.setProperty(
            "--cast-y",
            `${shadowY.toFixed(1)}px`
        );

        panel.style.setProperty(
            "--cast-scale",
            shadowScale.toFixed(3)
        );

        panel.style.setProperty("--cast-skew", "0deg");
        panel.style.setProperty("--cast-blur", "20px");
        panel.style.setProperty("--cast-opacity", "0.72");
    }

    function requestUpdate() {
        if (scheduled) return;

        scheduled = true;
        requestAnimationFrame(update);
    }

    window.addEventListener(
        "scroll",
        requestUpdate,
        { passive: true }
    );

    window.addEventListener("resize", requestUpdate);

    reducedMotion.addEventListener(
        "change",
        requestUpdate
    );

    requestUpdate();
})();

/* END PROJECT WINDOW / 3D SCROLL PERSPECTIVE */
