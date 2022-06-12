const CONSTANTS = {
    MODULE_NAME: "bossbar",
    FLAG_NAME: "data"
};

CONSTANTS.FLAGS = `flags.${CONSTANTS.MODULE_NAME}.${CONSTANTS.FLAG_NAME}`;

const base = CONSTANTS.MODULE_NAME + "."
const HOOKS = {
    CLOSE: base + "close",
    CLOSE_ALL: base + "closeAll",
    SHOW: base + "show",
}

export { CONSTANTS, HOOKS };