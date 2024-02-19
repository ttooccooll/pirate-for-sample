import { A } from "@solidjs/router";
import { JSX, ParentComponent, Show, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

import { LoadingSpinner } from "~/components";

// Help from https://github.com/arpadgabor/credee/blob/main/packages/www/src/components/ui/button.tsx

type CommonButtonStyleProps = {
    intent?: "active" | "inactive" | "grey" | "red" | "darkgrey" | "text";
    layout?: "flex" | "pad" | "small" | "xs" | "full";
};

interface ButtonProps
    extends JSX.ButtonHTMLAttributes<HTMLButtonElement>,
        CommonButtonStyleProps {
    loading?: boolean;
    disabled?: boolean;
}

interface ButtonLinkProps
    extends JSX.ButtonHTMLAttributes<HTMLAnchorElement>,
        CommonButtonStyleProps {
    href: string;
    target?: string;
    rel?: string;
}

export const Button: ParentComponent<ButtonProps> = (props) => {
    const [local, attrs] = splitProps(props, ["children", "intent", "layout"]);
    return (
        <button
            {...attrs}
            disabled={props.disabled || props.loading}
            class="rounded-xl p-3 font-light text-3xl transition bg-black bg-opacity-50 text-white/75 shadow-inner-button-disabled no-underline"
            classList={{
                "bg-white text-black": local.intent === "active",
                "bg-black-900 text-black":
                    !local.intent || local.intent === "inactive",
                "border border-white hover:text-[#3B6CCC]":
                    !local.intent || !!local.intent.match(/(active|inactive)/),
                "bg-m-grey hover:bg-m-grey-dark": local.intent === "grey",
                "bg-m-red hover:bg-m-red-dark": local.intent === "red",
                "bg-m-darkgrey hover:bg-m-darkgrey-dark": local.intent === "darkgrey",
                "text-black shadow-inner-button text-shadow-button":
                    local.intent && !!local.intent.match(/(grey|red|darkgrey)/),
                    "flex items-center": local.intent !== "text" && local.layout !== "full",
                "flex-1 text-3xl": !local.layout || local.layout === "flex",
                "px-2 text-xl": local.layout === "pad",
                "px-2 py-2 w-auto text-lg text": local.layout === "small",
                "px-2 py-2 w-auto rounded-lg text-base": local.layout === "xs",
                "w-full text-3xl": local.layout === "full"
            }}
        >
            <Show when={props.loading} fallback={local.children}>
                <div class="flex justify-center">
                    {/* TODO: constrain this to the exact height of the button */}
                    <LoadingSpinner wide />
                </div>
            </Show>
        </button>
    );
};

export const ButtonLink: ParentComponent<ButtonLinkProps> = (props) => {
    const [local, attrs] = splitProps(props, [
        "children",
        "intent",
        "layout",
        "href",
        "target",
        "rel"
    ]);
    return (
        <Dynamic
            {...attrs}
            component={local.href?.includes("://") ? "a" : A}
            href={local.href}
            target={local.target}
            rel={local.rel}
            class="rounded-xl p-3 font-light text-3xl transition bg-black bg-opacity-50 text-white/75 shadow-inner-button-disabled no-underline"
            classList={{
                "bg-white text-black": local.intent === "active",
                "bg-transparent text-black":
                    !local.intent || local.intent === "inactive",
                "border border-white hover:text-[#3B6CCC]":
                    !local.intent || !!local.intent.match(/(active|inactive)/),
                "bg-m-grey hover:bg-m-grey-dark": local.intent === "grey",
                "bg-m-red hover:bg-m-red-dark": local.intent === "red",
                "bg-m-darkgrey hover:bg-m-darkgrey-dark": local.intent === "darkgrey",
                "text-white shadow-inner-button text-shadow-button":
                    local.intent && !!local.intent.match(/(grey|red|darkgrey)/),
                    "flex items-center": local.intent !== "text" && local.layout !== "full",
                "flex-1 text-3xl": !local.layout || local.layout === "flex",
                "px-2 text-3xl": local.layout === "pad",
                "px-2 py-2 w-auto text-lg": local.layout === "small",
                "px-2 py-2 w-auto rounded-lg text-base": local.layout === "xs",
                "w-full text-3xl": local.layout === "full"
            }}
        >
            {local.children}
        </Dynamic>
    );
};
