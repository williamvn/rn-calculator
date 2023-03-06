import { useReducer } from "react";

interface IOperationState {
    result: string,
    hold: string,
    activeOp?: OP
}

export enum OP {
    PLUS,
    SUB,
    DIV,
    MULT,
    EQ,
    DEL,
    C,
    NEG,
    DOT,
    NUM
}
type OPPayload = { value?: string, prevOP?: OP };
export type OPAction = { type: OP, payload?: OPPayload };

const reducer = (state: IOperationState, action: OPAction): IOperationState => {
    const { result, hold, activeOp } = state;
    if (result == "N/A") {
        return { result: "0", hold: "" }
    }
    switch (action.type) {
        case OP.NUM:
            return { ...state, ...buildNumber(result, hold, action.payload ?? {}) };
        case OP.PLUS:
            return apply(result, hold, activeOp, OP.PLUS);
        case OP.SUB:
            return apply(result, hold, activeOp, OP.SUB);
        case OP.MULT:
            return apply(result, hold, activeOp, OP.MULT);
        case OP.DIV:
            return apply(result, hold, activeOp, OP.DIV);
        case OP.EQ:
            if (activeOp != undefined) {
                return { result: getOpFunc(activeOp).apply(hold, result), hold: "" }
            }
            return state;
        case OP.DOT:
            return { ...state, result: result.includes(",") ? result : result + "," };
        case OP.NEG:
            return { ...state, result: result.startsWith("-") ? result.slice(1) : "-" + result };
        case OP.DEL:
            if (result.length == 2 && result.startsWith("-")) {
                return { ...state, result: "0" };
            }
            return { ...state, result: result.slice(0, -1) };
        case OP.C:
            return { hold: "", result: "0" };
        default:
            return state;
    }
}

function getOpFunc(op: OP): { apply: ((a: string, b: string) => string) } {
    const funcs: { [key in OP]?: (a: string, b: string) => string } = {
        [OP.PLUS]: (a: string, b: string) => (parseFloat(a.replace(",", ".")) + parseFloat(b.replace(",", "."))).toString(),
        [OP.SUB]: (a: string, b: string) => (parseFloat(a.replace(",", ".")) - parseFloat(b.replace(",", "."))).toString(),
        [OP.MULT]: (a: string, b: string) => (parseFloat(a.replace(",", ".")) * parseFloat(b.replace(",", "."))).toString(),
        [OP.DIV]: (a: string, b: string) => parseFloat(b.replace(",", ".")) != 0 ? (parseFloat(a.replace(",", ".")) / parseFloat(b.replace(",", "."))).toString() : "N/A",
    }
    return { apply: funcs[op] ?? ((a: string, b: string) => "") }
}

function apply(result: string, hold: string, activeOp: OP = OP.PLUS, newOP: OP) {

    if (!hold) {
        return { result: "0", hold: result, activeOp: newOP };
    }
    else {
        return { result: "0", hold: getOpFunc(activeOp).apply(hold, result), activeOp: newOP };
    }
}

function buildNumber(result: string, hold: string, payload: OPPayload) {
    if (result == "0") {
        return { result: payload.value ?? "0", hold };
    }
    else if (result == "-0") {
        return { result: "-" + payload.value ?? "0", hold };
    }
    else {
        return { result: result + payload.value, hold };
    }
}

export function useOperationReducer(initResult: string, initHold: string) {
    const [state, dispatch] = useReducer(reducer, { result: initResult, hold: initHold });
    return { state, dispatch };
}






