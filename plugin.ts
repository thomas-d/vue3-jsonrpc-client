import { inject } from "vue";
import {JsonRpcClient} from "./jsonrpc";

export type ClientOptions = [
    string,
    RequestCredentials?,
    object?,
    boolean?,
];

export function useRpcClient() {
    return inject("jsonRpcClient");
}

export default {
    install: function(app, options: ClientOptions) {
        const client = new JsonRpcClient(options[0], options[1], options[2], options[3]);
        app.provide("jsonRpcClient", client);
    }
}