import { DISTRICTS, PROVINCES, REGENCIES } from '../datas';
import type { LoaderData } from '../types';

export async function loaderDatas(): Promise<LoaderData> {
  return {
    provinces: PROVINCES,
    regencies: REGENCIES,
    districts: DISTRICTS,
  };
}
