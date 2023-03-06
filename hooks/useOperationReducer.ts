import { useReducer } from "react";

interface IOperationState {
    result: string,
    hold: string
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

type OPAction = { type: OP, value?: string };

const reducer = ({ result, hold }: IOperationState, action: OPAction): IOperationState => {
    switch (action.type) {
        case OP.NUM:
            if (result == "0") {
                return { result: action.value ?? "0", hold };
            }
            else if (result == "-0") {
                return { result: "-" + action.value ?? "0", hold };
            }
            else {
                return { result: result + action.value, hold };
            }
        case OP.NEG:
            return { result: result.startsWith("-") ? result.slice(1) : "-" + result, hold };
        case OP.DEL:
            return { result: result.slice(0, -1), hold };
        case OP.C:
            return { hold: "", result: "0" };
        default:
            return { hold: hold, result: result };
    }
}

export function useOperationReducer(initResult: string, initHold: string) {
    const [state, dispatch] = useReducer(reducer, { result: initResult, hold: initHold });
    return { state, dispatch };
}






