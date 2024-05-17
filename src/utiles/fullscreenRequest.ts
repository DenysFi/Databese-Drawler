import { Toast } from "@douyinfe/semi-ui";

export function requestFullScreen() {
    const root = document.body;

    if (!document.fullscreenElement) {
        root.requestFullscreen().catch((err) => {
            Toast.error(
                `Error attempting to enable fullscreen mode.)`,
            );
        });
    } else {
        document.exitFullscreen();
    }
}