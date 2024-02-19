import { createMemo, createSignal, For, Match, Switch } from "solid-js";

import { useI18n } from "~/i18n/context";
import { useCopy } from "~/utils";
import audioFile from "~/assets/chest.mp3";

function playAudio() {
    const audio = new Audio(audioFile);
    audio.play();
}

export function SeedWords(props: {
    words: string;
    setHasSeen?: (hasSeen: boolean) => void;
}) {
    const i18n = useI18n();
    const [shouldShow, setShouldShow] = createSignal(false);
    const [copy, copied] = useCopy({ copiedTimeout: 1000 });

    function toggleShow() {
        playAudio();
        setShouldShow(!shouldShow());
        if (shouldShow()) {
            props.setHasSeen?.(true);
        }
    }

    const splitWords = createMemo(() => props.words.split(" "));

    function dangerouslyCopy() {
        copy(props.words);
    }

    return (
        <div class="flex flex-col gap-4 overflow-hidden rounded-xl bg-m-black/50 p-4 font-MyFont1">
            <Switch>
                <Match when={!shouldShow()}>
                    <div
                        class="flex w-full cursor-pointer justify-center font-MyFont"
                        onClick={toggleShow}
                    >
                        <code class="text-black font-MyFont">
                            {i18n.t("settings.backup.seed_words.reveal")}
                        </code>
                    </div>
                </Match>

                <Match when={shouldShow()}>
                    <>
                        <div
                            class="flex w-full cursor-pointer justify-center"
                            onClick={toggleShow}
                        >
                            <code class="text-black font-MyFont">
                                {i18n.t("settings.backup.seed_words.hide")}
                            </code>
                        </div>
                        <ol class="w-full list-inside list-decimal columns-2 overflow-hidden">
                            <For each={splitWords()}>
                                {(word) => (
                                    <li class="bg min-w-fit text-left font-mono">
                                        {word}
                                    </li>
                                )}
                            </For>
                        </ol>
                        <div class="flex w-full justify-center">
                            <button
                                onClick={dangerouslyCopy}
                                class="rounded-lg bg-grey/50 p-2 hover:bg-white/20"
                            >
                                <div class="flex items-center gap-2 rounded-lg">
                                    <span class="text-3xl pt-2">
                                        {copied()
                                            ? i18n.t(
                                                  "settings.backup.seed_words.copied"
                                              )
                                            : i18n.t(
                                                  "settings.backup.seed_words.copy"
                                              )}
                                    </span>
                                </div>
                            </button>
                        </div>
                    </>
                </Match>
            </Switch>
        </div>
    );
}
