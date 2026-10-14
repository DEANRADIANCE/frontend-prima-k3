import type {
  DataProvider,
  CrudFilter,
  CrudSort,
  GetListParams,
  GetOneParams,
  CreateParams,
  UpdateParams,
  DeleteOneParams,
  GetManyParams,
  DeleteManyParams,
  BaseRecord,
  GetListResponse,
  GetOneResponse,
  GetManyResponse,
  CreateResponse,
  UpdateResponse,
  DeleteOneResponse,
  DeleteManyResponse,
} from "@refinedev/core";
import {
  initialPasien,
  initialRiwayatMedis,
  initialSuratSakit,
  initialPemeriksaanK3,
  mockObat,
  mockAlatMedis,
  mockNakes,
  mockPerizinan,
  mockArtikel,
  mockFlyer,
  mockRuangan,
} from "./mock-data";

const STORAGE_PREFIX = "primak3_data_";

const getStore = <T>(resource: string, defaultData: T[]): T[] => {
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + resource);
    if (!item) {
      localStorage.setItem(STORAGE_PREFIX + resource, JSON.stringify(defaultData));
      return defaultData;
    }
    return JSON.parse(item);
  } catch {
    return defaultData;
  }
};

const setStore = <T>(resource: string, data: T[]): void => {
  try {
    localStorage.setItem(STORAGE_PREFIX + resource, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to persist data for " + resource, e);
  }
};

const getInitialForResource = (resource: string): any[] => {
  switch (resource) {
    case "pasien":
      return initialPasien;
    case "riwayat_medis":
      return initialRiwayatMedis;
    case "surat_sakit":
      return initialSuratSakit;
    case "pemeriksaan_k3":
      return initialPemeriksaanK3;
    case "obat":
      return mockObat;
    case "alat_medis":
      return mockAlatMedis;
    case "nakes":
      return mockNakes;
    case "perizinan":
      return mockPerizinan;
    case "artikel":
      return mockArtikel;
    case "flyer":
      return mockFlyer;
    case "ruangan":
      return mockRuangan;
    default:
      return [];
  }
};

const filterItem = (item: any, filters?: CrudFilter[]): boolean => {
  if (!filters || filters.length === 0) return true;

  return filters.every((filter) => {
    if ("field" in filter) {
      const val = item[filter.field];
      const filterVal = filter.value;
      if (filterVal === undefined || filterVal === null || filterVal === "") {
        return true;
      }

      switch (filter.operator) {
        case "eq":
          return String(val).toLowerCase() === String(filterVal).toLowerCase();
        case "ne":
          return String(val).toLowerCase() !== String(filterVal).toLowerCase();
        case "contains":
          return String(val).toLowerCase().includes(String(filterVal).toLowerCase());
        case "in":
          return Array.isArray(filterVal) && filterVal.includes(val);
        default:
          return String(val).toLowerCase().includes(String(filterVal).toLowerCase());
      }
    }
    return true;
  });
};

const sortItems = (items: any[], sorters?: CrudSort[]): any[] => {
  if (!sorters || sorters.length === 0) return items;

  return [...items].sort((a, b) => {
    for (const sorter of sorters) {
      const aVal = a[sorter.field];
      const bVal = b[sorter.field];
      if (aVal === bVal) continue;
      if (aVal > bVal) return sorter.order === "asc" ? 1 : -1;
      if (aVal < bVal) return sorter.order === "asc" ? -1 : 1;
    }
    return 0;
  });
};

export const dataProvider: DataProvider = {
  getList: async <TData extends BaseRecord = BaseRecord>({
    resource,
    pagination,
    filters,
    sorters,
  }: GetListParams): Promise<GetListResponse<TData>> => {
    let items = getStore(resource, getInitialForResource(resource));

    if (filters) {
      items = items.filter((item) => filterItem(item, filters));
    }

    if (sorters) {
      items = sortItems(items, sorters);
    }

    const total = items.length;
    const current = pagination?.currentPage ?? 1;
    const pageSize = pagination?.pageSize ?? 10;
    const start = (current - 1) * pageSize;
    const end = start + pageSize;
    const pagedItems = pagination?.mode === "off" ? items : items.slice(start, end);

    return {
      data: pagedItems as unknown as TData[],
      total,
    };
  },

  getOne: async <TData extends BaseRecord = BaseRecord>({
    resource,
    id,
  }: GetOneParams): Promise<GetOneResponse<TData>> => {
    const items = getStore(resource, getInitialForResource(resource));
    const found = items.find((item) => String(item.id) === String(id));
    if (!found) {
      throw new Error(`Record with id ${id} not found in ${resource}`);
    }
    return {
      data: found as unknown as TData,
    };
  },

  getMany: async <TData extends BaseRecord = BaseRecord>({
    resource,
    ids,
  }: GetManyParams): Promise<GetManyResponse<TData>> => {
    const items = getStore(resource, getInitialForResource(resource));
    const data = items.filter((item) => ids.map(String).includes(String(item.id)));
    return {
      data: data as unknown as TData[],
    };
  },

  create: async <TData extends BaseRecord = BaseRecord, TVariables = {}>({
    resource,
    variables,
  }: CreateParams<TVariables>): Promise<CreateResponse<TData>> => {
    const items = getStore(resource, getInitialForResource(resource));
    const maxId = items.reduce((max, item) => (typeof item.id === "number" && item.id > max ? item.id : max), 0);
    const newItem = {
      ...(variables as any),
      id: (variables as any)?.id || maxId + 1,
    };
    const updated = [newItem, ...items];
    setStore(resource, updated);
    return {
      data: newItem as unknown as TData,
    };
  },

  update: async <TData extends BaseRecord = BaseRecord, TVariables = {}>({
    resource,
    id,
    variables,
  }: UpdateParams<TVariables>): Promise<UpdateResponse<TData>> => {
    const items = getStore(resource, getInitialForResource(resource));
    const index = items.findIndex((item) => String(item.id) === String(id));
    if (index === -1) {
      throw new Error(`Record with id ${id} not found in ${resource}`);
    }
    const updatedItem = {
      ...items[index],
      ...(variables as any),
      id: items[index].id,
    };
    items[index] = updatedItem;
    setStore(resource, items);
    return {
      data: updatedItem as unknown as TData,
    };
  },

  deleteOne: async <TData extends BaseRecord = BaseRecord, TVariables = {}>({
    resource,
    id,
  }: DeleteOneParams<TVariables>): Promise<DeleteOneResponse<TData>> => {
    const items = getStore(resource, getInitialForResource(resource));
    const target = items.find((item) => String(item.id) === String(id));
    const filtered = items.filter((item) => String(item.id) !== String(id));
    setStore(resource, filtered);
    return {
      data: target as unknown as TData,
    };
  },

  deleteMany: async <TData extends BaseRecord = BaseRecord, TVariables = {}>({
    resource,
    ids,
  }: DeleteManyParams<TVariables>): Promise<DeleteManyResponse<TData>> => {
    const items = getStore(resource, getInitialForResource(resource));
    const strIds = ids.map(String);
    const filtered = items.filter((item) => !strIds.includes(String(item.id)));
    setStore(resource, filtered);
    return {
      data: [] as unknown as TData[],
    };
  },

  getApiUrl: () => "local://primak3",
};
