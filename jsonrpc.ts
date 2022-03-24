export type JsonRpcClientOptions = {
    endpoint: string,
    credentials?: RequestCredentials,
    headers?: object,
    debug?: boolean,
}

export class JsonRpcClient {
    endpoint: string;
    headers = {
        Accept: "application/json,text/plain,*/*",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
    };
    lastId = 1;
    credentials: RequestCredentials = "omit";
    private debug = false;

    constructor(options: JsonRpcClientOptions) {
        this.endpoint = options.endpoint;
        this.updateHeaders(this.headers);
        if (options.headers) {
            this.updateHeaders(options.headers);
        }
        if (options.credentials) {
            this.credentials = options.credentials;
        }
        if (options.debug) {
            this.debug = options.debug;
        }
    }

    updateEndpoint(endpoint: string) {
        this.endpoint = endpoint;
    }

    updateCredentials(credentials: RequestCredentials) {
        this.credentials = credentials;
    }

    updateHeaders(headers: object) {
        for (const [name, value] of Object.entries(headers)) {
            this.headers[name] = value;
        }
    }

    enableDebug() {
        this.debug = true;
    }

    request(method: string, payload: object) {
        const id = this.lastId++;
        const request = {
            method: "POST",
            credentials: this.credentials,
            headers: this.headers,
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: id,
                method: method,
                params: payload,
            })
        };
        return fetch(this.endpoint, request).then((response: Response) => {
            return response.json();
        }).catch((error) => {
            // todo: should we throw the error every time or only if debug is true?
            if (this.debug) {
                console.error(error);
            }
        });
    }
}
