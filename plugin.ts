import { inject } from "vue";
import {JsonRpcClient, JsonRpcClientOptions} from "./jsonrpc";

export function useRpcClient() {
    return inject("jsonRpcClient");
}

export default {
    install: function(app, options: JsonRpcClientOptions) {
        const client = new JsonRpcClient(options);
        app.provide("jsonRpcClient", client);
    }
}