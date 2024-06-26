const gql = String.raw;

/**
 * ## Cubejs Related Service
 */
export class EcosyncCubeClient {
  #graphQlUrl: string;
  #getToken: () => Promise<string>;

  constructor({
    graphQlUrl,
    tokenGetter,
  }: {
    graphQlUrl: string;
    tokenGetter: () => Promise<string>;
  }) {
    this.#graphQlUrl = graphQlUrl;
    this.#getToken = tokenGetter;
  }

  async #query(
    query: string,
    variables?: object,
    option?: {
      raw: boolean;
    }
  ) {
    const url = this.#graphQlUrl;

    const body = JSON.stringify({
      query,
      variables,
    });

    console.log({ t: await this.#getToken() });

    // @ts-ignore
    const response = await fetch(url, {
      body,
      cache: "no-store",
      headers: {
        authorization: await this.#getToken(),
        "content-type": "application/json",
      },
      method: "POST",
    });

    const result = (await response.json()) as { data: unknown };

    if (option?.raw) return result;

    const flattened = this.#flattenCubeResponse(result);

    return flattened;
  }

  /**
   * Get All LandfillDumpings
   */
  async getResourceCount() {
    const query = gql`
      query GetResrouceCount {
        v: cube {
          vehicle {
            count
          }
        }
        lf: cube {
          transportation {
            count
          }
        }
        sts: cube {
          sts {
            count
          }
        }
        user: cube {
          user {
            count
          }
        }
        role: cube {
          role_permission {
            count
          }
        }
        perm: cube {
          permission {
            count
          }
        }
      }
    `;

    const result = await this.#query(query);

    return result;
  }

  async getTotalWaste(variables?: object) {
    const query = gql`
      query GetTotalWaste($where: RootWhereInput = {}) {
        transportation: cube(where: $where) {
          transportation {
            total_volume
            total_distance_meters
          }
        }
      }
    `;

    const result = (await this.#query(query, variables)) as {
      transportation: {
        total_volume: number | null;
        total_distance_meters: number | null;
      };
    };

    return result;
  }

  async getLandfillStats(variables?: object) {
    const query = gql`
      query GetLandfillStats($where: RootWhereInput = {}) {
        landfill: cube(where: $where) {
          landfill {
            total_capacity_tonnes
          }
        }
        tp: cube(where: { transportation: { landfill_id: { set: true } } }) {
          transportation {
            total_volume
            count
          }
        }
      }
    `;

    const result = (await this.#query(query, variables)) as {
      transportation: { total_volume: number | null; count: number | null };
      landfill: { total_capacity_tonnes: number | null; count: number | null };
    };

    return result;
  }

  async getTransportationStats(variables?: object) {
    const query = gql`
      query GetLandfillStats {
        dumped: cube(
          where: { transportation: { landfill_id: { set: true } } }
        ) {
          transportation {
            total_volume
            total_distance_meters
            count
          }
        }

        way: cube(where: { transportation: { landfill_id: { set: false } } }) {
          transportation {
            total_volume
            count
          }
        }
      }
    `;

    const result = (await this.#query(query, variables, { raw: true })) as {
      data: {
        dumped: {
          transportation: {
            total_volume: number;
            count: number;
          };
        }[];
        way: {
          transportation: {
            total_volume: null;
            count: number;
          };
        }[];
      };
    };

    return result;
  }

  async getIssueStats() {
    const query = gql`
      query GetIssueStats {
        today: cube(
          where: { issue: { created_at: { inDateRange: "today" } } }
        ) {
          today: issue {
            count
          }
        }
        total: cube {
          total: issue {
            count
          }
        }
        reviewed: cube(where: { issue: { status: { equals: "reviewed" } } }) {
          reviewed: issue {
            count
          }
        }

        flagged: cube(where: { issue: { status: { equals: "flagged" } } }) {
          flagged: issue {
            count
          }
        }

        resolved: cube(where: { issue: { status: { equals: "resolved" } } }) {
          resolved: issue {
            count
          }
        }
      }
    `;

    const result = await this.#query(query);

    return result as {
      today: { count: number };
      total: { count: number };
      reviewed: { count: number };
      flagged: { count: number };
      resolved: { count: number };
    };
  }

  async getTransportationTableStats(variables?: {
    transportationIds: string[];
  }) {
    const query = gql`
      query GetTransportationTableStats($transportationIds: [String]) {
        cube(where: { transportation: { id: { in: $transportationIds } } }) {
          transportation {
            id
            total_distance_meters
          }
        }
      }
    `;

    const result = (await this.#query(query, variables, { raw: true })) as {
      data: {
        cube: {
          transportation: {
            id: string;
            total_distance_meters: number | null;
            count: number | null;
          };
        }[];
      };
    };

    return result;
  }

  async getStsStats(variables?: object) {
    const query = gql`
      query GetStsStats($where: RootWhereInput = {}) {
        sts: cube(where: $where) {
          sts {
            total_capacity_tonnes
          }
        }
        tp: cube {
          transportation {
            total_volume
            count
          }
        }
      }
    `;

    const result = (await this.#query(query, variables)) as {
      transportation: { total_volume: number | null; count: number | null };
      sts: { total_capacity_tonnes: number | null; count: number | null };
    };

    return result;
  }

  #flattenCubeResponse(result: { data: unknown }) {
    return Object.values(result.data || ({} as object))
      .flat()
      .flatMap((v) => Object.entries(v).map(([k, v]) => ({ [k]: v })))
      .reduce((prev, curr) => ({ ...curr, ...prev }), {});
  }
}
