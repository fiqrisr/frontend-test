import { BASE_API_URL } from "@/configs";
import { httpInstance } from "@/http";
import { DataProvider, CrudFilters, CrudOperators } from "@refinedev/core";
import qs from "query-string";

const mapOperator = (operator: CrudOperators): string => {
  switch (operator) {
    case "ne":
    case "gte":
    case "lte":
      return `_${operator}`;
    case "contains":
      return "_like";
    case "eq":
    default:
      return "";
  }
};

const generateFilter = (filters?: CrudFilters) => {
  const queryFilters: { [key: string]: string } = {};

  if (filters) {
    filters.map((filter) => {
      if (filter.operator === "or" || filter.operator === "and") {
        throw new Error(
          `[@refinedev/simple-rest]: \`operator: ${filter.operator}\` is not supported. You can create custom data provider. https://refine.dev/docs/api-reference/core/providers/data-provider/#creating-a-data-provider`
        );
      }

      if ("field" in filter) {
        const { field, operator, value } = filter;

        if (field === "q") {
          queryFilters[field] = value;
          return;
        }

        const mappedOperator = mapOperator(operator);
        queryFilters[`${field}${mappedOperator}`] = value;
      }
    });
  }

  return queryFilters;
};

export const dataProvider = (): Omit<
  Required<DataProvider>,
  "custom" | "createMany" | "updateMany" | "deleteMany"
> => ({
  getList: async ({ resource, pagination, filters }) => {
    const { current = 1, pageSize = 10 } = pagination ?? {};

    const queryFilters = generateFilter(filters);

    const query = {
      limit: pageSize,
      offset: current,
    };

    const { data } = await httpInstance.get(
      `${resource}/find-all?${qs.stringify(query)}&${qs.stringify(
        queryFilters
      )}`
    );

    return {
      data: data?.data,
      total: data?.total_record,
    };
  },

  getMany: async ({ resource, ids }) => {
    const { data } = await httpInstance.get(
      `/${resource}?${qs.stringify({ id: ids })}`
    );

    return {
      data,
    };
  },

  create: async ({ resource, variables }) => {
    const url = `/${resource}`;

    const { data } = await httpInstance.post(url, variables);

    return {
      data,
    };
  },

  update: async ({ resource, id, variables }) => {
    const url = `/${resource}/${id}`;

    const { data } = await httpInstance.patch(url, variables);

    return {
      data,
    };
  },

  getOne: async ({ resource, id }) => {
    const url = `/${resource}/${id}`;

    const { data } = await httpInstance.get(url);

    return {
      data,
    };
  },

  deleteOne: async ({ resource, id, variables }) => {
    const url = `/${resource}/${id}`;

    const { data } = await httpInstance.delete(url, {
      data: variables,
    });

    return {
      data,
    };
  },

  getApiUrl: () => {
    return BASE_API_URL!;
  },
});
