import { A } from "@solidjs/router";

import airplane from "~/assets/icons/attack.png";
import receive from "~/assets/icons/sail.png";
import mutiny_m from "~/assets/icons/icon.png";
import scan from "~/assets/icons/tele.png";
import settings from "~/assets/icons/blueprint.png";
import userClock from "~/assets/icons/logbook.png";
import audioFile from "~/assets/splash.mp3";


type ActiveTab =
    | "home"
    | "scan"
    | "send"
    | "receive"
    | "settings"
    | "activity"
    | "none";

    function playAudio() {
        const audio = new Audio(audioFile);
        audio.play();
    }

function NavBarItem(props: {
    href: string;
    icon: string;
    active: boolean;
    alt: string;
    text: string;
}) {
    return (
        <li>
            <A
                class="block rounded-lg p-1.5 no-underline text-center bg-black/10"
                href={props.href}
                onClick={playAudio}
                classList={{
                    "hover:bg-white/5 active:bg-black": !props.active,
                    "bg-grey": !props.active
                }}
            >
                <img src={props.icon} alt={props.alt} height={85} width={85} class="rounded-lg" style={{ opacity: "0px solid black" }}/>
                <span class={"text-#F61C5A text-lg center"} style={{ font: 'no-underline', display: 'block' }}>{props.text}</span>
            </A>
        </li>
    );
}

export function NavBar(props: { activeTab: ActiveTab }) {
    return (
        <nav class="fixed bottom-auto left-0 top-0 z-40 hidden h-full shadow-none safe-bottom md:block">
            <ul class="mt-4 flex flex-col justify-start gap-4 px-4">
                <NavBarItem
                    href="/"
                    icon={mutiny_m}
                    active={props.activeTab === "home"}
                    alt="home"
                    text="Port of Call"
                />
                <NavBarItem
                    href="/search"
                    icon={airplane}
                    active={props.activeTab === "send"}
                    alt="send"
                    text="Attack!"
                />
                <NavBarItem
                    href="/receive"
                    icon={receive}
                    active={props.activeTab === "receive"}
                    alt="receive"
                    text="Sail Ho!"
                />
                <NavBarItem
                    href="/activity"
                    icon={userClock}
                    active={props.activeTab === "activity"}
                    alt="activity"
                    text="Ship's Logs"
                />
                <NavBarItem
                    href="/scanner"
                    icon={scan}
                    active={false}
                    alt="scan"
                    text="Search"
                />
                <NavBarItem
                    href="/settings"
                    icon={settings}
                    active={props.activeTab === "settings"}
                    alt="settings"
                    text="Repair"
                />
            </ul>
        </nav>
    );
}
