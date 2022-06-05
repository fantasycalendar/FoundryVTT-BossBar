import EndCap from "./EndCap.svelte";
import Text from "./Text.svelte";
import TilingBackground from "./TilingBackground.svelte";

export default {
    "end-cap": {
        component: EndCap,
        name: "End Cap",
        attributes: {
            src: String
        }
    },
    "text": {
        component: Text,
        name: "Text",
        attributes: {
            text: String,
            style: String
        }
    },
    "tiling-background": TilingBackground
}