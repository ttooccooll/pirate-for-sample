import { Capacitor } from "@capacitor/core";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Title } from "@solidjs/meta";
import { ErrorBoundary, Suspense, onCleanup } from "solid-js";

import { ErrorDisplay, I18nProvider } from "~/components";
import { Router } from "~/router";
import { Provider as MegaStoreProvider } from "~/state/megaStore";

import audioFile from "~/assets/piratemusic.mp3";

let audioInstance: HTMLAudioElement | null = null;

function playAudio() {
    if (!audioInstance || audioInstance.paused) {
        if (!audioInstance) {
            audioInstance = new Audio(audioFile);
            audioInstance.onended = () => {
                audioInstance = null; // Reset audio instance when playback ends
            };
        }
        audioInstance.play();
    }
}

const setStatusBarStyleDark = async () => {
    await StatusBar.setStyle({ style: Style.Dark });
};

if (Capacitor.isNativePlatform()) {
    await setStatusBarStyleDark();
}

    const handleClick = () => playAudio();
    const handleKeyPress = () => playAudio();

    document.addEventListener("click", handleClick);
    document.addEventListener("keypress", handleKeyPress);

    onCleanup(() => {
        document.removeEventListener("click", handleClick);
        document.removeEventListener("keypress", handleKeyPress);
    });

export default function App() {
    playAudio();
    return (
        <Suspense>
            <Title>Mutiny Wallet - Pirate Edition!</Title>
            <ErrorBoundary fallback={(e) => <ErrorDisplay error={e} />}>
                <MegaStoreProvider>
                    <I18nProvider>
                        <ErrorBoundary
                            fallback={(e) => <ErrorDisplay error={e} />}
                        >
                            <Router />
                        </ErrorBoundary>
                    </I18nProvider>
                </MegaStoreProvider>
            </ErrorBoundary>
        </Suspense>
    );
}
