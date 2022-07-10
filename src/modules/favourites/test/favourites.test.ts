import { beforeAll, describe, expect, it } from "vitest";
import { gql } from "apollo-server-express";
import { sendTestRequest } from "../../../common/test-utils/send-test-request.js";
import {
  cachedJwt,
  loginTestUser,
  registerTestUser,
} from "../../users/test/create-test-user";
import { createTestGenre } from "../../genres/test/create-test-genre.js";
import { testBand } from "../../bands/test/create-test-band.js";

describe.todo("Favourites module", () => {});
