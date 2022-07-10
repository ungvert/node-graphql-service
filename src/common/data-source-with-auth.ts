import {
  Request,
  RequestOptions,
  Response,
  RESTDataSource,
} from "apollo-datasource-rest";

export class RESTDataSourceWithAuth extends RESTDataSource {
  constructor() {
    super();
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set("Authorization", `Bearer ${this.context.token}`);
  }

  async didReceiveResponse(req: Response, res: Request) {
    return super.didReceiveResponse(req, res);
  }
}
