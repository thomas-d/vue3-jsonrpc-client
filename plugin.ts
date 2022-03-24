import { inject } from "vue";
import {JsonRpcClient, JsonRpcClientOptions} from "./jsonrpc";

export function useRpcClient() {
    return inject("jsonRpcClient");
}

export default {
    install: function(app, options: JsonRpcClientOptions) {
        app.provide("jsonRpcClient", new JsonRpcClient(options));
    }
}