export class JsonRpcClient {
    endpoint: string;
    headers = {
        Accept: "application/json,text/plain,*/*",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
    };
    lastId = 1;
    credentials: RequestCredentials = "omit";
    debug = false;

    constructor(endpoint: string, credentials?: RequestCredentials, headers?: object, debug?: boolean) {
        this.endpoint = endpoint;
        this.updateHeaders(this.headers);
        if (headers) {
            this.updateHeaders(headers);
        }
        if (credentials) {
            this.credentials = credentials;
        }
        if (debug) {
            this.debug = debug;
        }
    };

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
    };

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
    };
}
