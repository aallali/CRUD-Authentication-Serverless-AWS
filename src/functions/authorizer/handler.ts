import { validateJWT } from "@libs/tokens";
import { APIGatewayTokenAuthorizerEvent } from "aws-lambda";
import { JwtPayload } from "jsonwebtoken";
import AuthPolicy from "./src/AuthPolicy";

const getToken = (params) => {
  if (!params.type || params.type !== "TOKEN") {
    throw new Error('Expected "event.type" parameter to have value "TOKEN"');
  }

  const tokenString = params.authorizationToken;
  if (!tokenString) {
    throw new Error('Expected "event.authorizationToken" parameter to be set');
  }

  const match = tokenString.match(/^Bearer (.*)$/);
  if (!match || match.length < 2) {
    throw new Error(
      `Invalid Authorization token - ${tokenString} does not match "Bearer .*"`
    );
  }
  return match[1];
};

/*
 * Copyright 2015-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

export const authorizerHandler = function (
  event: APIGatewayTokenAuthorizerEvent,
  context,
  callback
) {
  // Do not print the auth token unless absolutely necessary
  // console.log("Client token: " + event.authorizationToken);
  // console.log("Method ARN: " + event.methodArn);

  // validate the incoming token
  // and produce the principal user identifier associated with the token

  // this could be accomplished in a number of ways:
  // 1. Call out to OAuth provider
  // 2. Decode a JWT token inline
  // 3. Lookup in a self-managed DB
  try {
    const authToken = getToken(event);

    const pyld = validateJWT(authToken) as JwtPayload;
    console.log("------->", pyld.user);
    const principalId = pyld.user;

    // you can send a 401 Unauthorized response to the client by failing like so:
    // callback("Unauthorized", null);

    // if the token is valid, a policy must be generated which will allow or deny access to the client

    // if access is denied, the client will receive a 403 Access Denied response
    // if access is allowed, API Gateway will proceed with the backend integration configured on the method that was called

    // build apiOptions for the AuthPolicy
    const apiOptions = {} as any;
    const tmp = event.methodArn.split(":");
    const apiGatewayArnTmp = tmp[5].split("/");
    const awsAccountId = tmp[4];

    apiOptions.region = tmp[3];
    apiOptions.restApiId = apiGatewayArnTmp[0];
    apiOptions.stage = apiGatewayArnTmp[1];

    const method = apiGatewayArnTmp[2];
    let resource = "/"; // root resource
    if (apiGatewayArnTmp[3]) {
      resource += apiGatewayArnTmp.slice(3, apiGatewayArnTmp.length).join("/");
    }

    // this function must generate a policy that is associated with the recognized principal user identifier.
    // depending on your use case, you might store policies in a DB, or generate them on the fly

    // keep in mind, the policy is cached for 5 minutes by default (TTL is configurable in the authorizer)
    // and will apply to subsequent calls to any method/resource in the RestApi
    // made with the same token

    // the example policy below denies access to all resources in the RestApi

    const policy = new AuthPolicy(principalId, awsAccountId, apiOptions);
    policy.allowAllMethods();
    // policy.allowMethod(AuthPolicy.HttpVerb.GET, "/todo");
    // policy.denyMethod(AuthPolicy.HttpVerb.POST, "/pets");
    // policy.allowMethod(AuthPolicy.HttpVerb.GET, "/users/username");

    // finally, build the policy
    const authResponse = policy.build();
    // console.log(authResponse);
    // new! -- add additional key-value pairs
    // these are made available by APIGW like so: $context.authorizer.<key>
    // additional context is cached
    authResponse.context = {
      userId: pyld.user.split("|")[1],
      role: pyld.user.split("|")[0],
    };
    // authResponse.context.arr = ['foo']; <- this is invalid, APIGW will not accept it
    // authResponse.context.obj = {'foo':'bar'}; <- also invalid

    callback(null, authResponse);
  } catch (error) {
    callback("Unauthorized");
  }
};
