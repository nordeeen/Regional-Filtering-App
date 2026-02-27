import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';
import { Select } from '../../components/selectedRegion';
import {
  Building01Icon,
  ResetPasswordIcon,
  Building02Icon,
  MapPinpoint02Icon,
  Globe02Icon,
  ArrowRight01Icon,
} from 'hugeicons-react';

import type { LoaderData } from '../../types';
import { RegionBlock } from '../../components/regionBlock';
import { Divider } from '../../components/divider';

export default function FilterPage() {
  const { provinces, regencies, districts } = useLoaderData() as LoaderData;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const provinceId = searchParams.get('province') ?? '';
  const regencyId = searchParams.get('regency') ?? '';
  const districtId = searchParams.get('district') ?? '';

  const selectedProvince = provinces.find((p) => String(p.id) === provinceId);
  const selectedRegency = regencies.find((r) => String(r.id) === regencyId);
  const selectedDistrict = districts.find((d) => String(d.id) === districtId);

  const filterRegency = provinceId
    ? regencies.filter((r) => r.province_id === Number(provinceId))
    : [];

  const filterDistricts = regencyId
    ? districts.filter((d) => d.regency_id === Number(regencyId))
    : [];

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    navigate(`?${next.toString()}`, { replace: true });
  }

  function handleProvince(val: string) {
    const next = new URLSearchParams();
    if (val) next.set('province', val);
    navigate(`?${next.toString()}`, { replace: true });
  }

  function handleRegency(val: string) {
    const next = new URLSearchParams(searchParams);
    next.delete('district');
    if (val) {
      next.set('regency', val);
    } else {
      next.delete('regency');
    }
    navigate(`?${next.toString()}`, { replace: true });
  }

  function handleDistrict(val: string) {
    setParam('district', val);
  }

  function handleReset() {
    navigate('?', { replace: true });
  }

  const breadcrumbDatas = [
    { label: 'Indonesia', key: null },
    selectedProvince ? { label: selectedProvince.name, key: 'province' } : null,
    selectedRegency ? { label: selectedRegency.name, key: 'regency' } : null,
    selectedDistrict ? { label: selectedDistrict.name, key: 'district' } : null,
  ].filter(Boolean) as { label: string; key: string | null }[];

  return (
    <main className="min-h-screen bg-slate-50 font-[system-ui]">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-130">
          <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-100 bg-white p-6 flex flex-col gap-6 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Globe02Icon className="w-4 h-4" />
              </div>
              <span className="font-semibold text-slate-800 text-sm">
                Frontend Assessment
              </span>
            </div>

            <div className="flex flex-col gap-5 flex-1">
              <p className="text-[10px] font-semibold tracking-[0.14em] text-slate-400 uppercase">
                Filter Wilayah
              </p>

              <Select
                name="province"
                label="Provinsi"
                icon={<Building02Icon className="w-4 h-4" />}
                value={provinceId}
                onChange={handleProvince}
                options={provinces}
                placeholder="Pilih Provinsi"
              />

              <Select
                name="regency"
                label="Kota/Kabupaten"
                icon={<Building01Icon className="w-4 h-4" />}
                value={regencyId}
                onChange={handleRegency}
                options={filterRegency}
                disabled={!provinceId}
                placeholder="Pilih Kota/Kabupaten"
              />

              <Select
                name="district"
                label="Kecamatan"
                icon={<MapPinpoint02Icon className="w-4 h-4" />}
                value={districtId}
                onChange={handleDistrict}
                options={filterDistricts}
                disabled={!regencyId}
                placeholder="Pilih Kecamatan"
              />
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="mt-auto flex items-center justify-center gap-2 w-full rounded-xl border-2 border-slate-200 
              py-2.5 text-xs font-semibold tracking-widest text-slate-500 uppercase hover:border-indigo-300
               hover:text-indigo-600 transition-all duration-200 cursor-pointer"
            >
              <ResetPasswordIcon className="w-4 h-4" />
              Reset
            </button>
          </aside>

          <div className="flex-1 flex flex-col">
            <div className="px-8 py-4 border-b border-slate-100">
              <nav className="breadcrumb flex items-center gap-1.5 text-xs text-slate-400 flex-wrap">
                {breadcrumbDatas.map((item, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    {i > 0 && (
                      <span className="text-slate-300">
                        <ArrowRight01Icon className="w-4 h-4" />
                      </span>
                    )}
                    <span
                      className={
                        i === breadcrumbDatas.length - 1
                          ? 'text-indigo-600 font-semibold'
                          : 'text-slate-400 hover:text-slate-600 cursor-pointer'
                      }
                    >
                      {item.label}
                    </span>
                  </span>
                ))}
              </nav>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center py-12 px-8 gap-0">
              {!selectedProvince ? (
                <div className="text-center">
                  <p className="text-slate-400 text-sm">
                    Pilih provinsi untuk memulai
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-0 w-full">
                  <RegionBlock
                    label="Provinsi"
                    name={selectedProvince.name}
                    size="xl"
                  />

                  {selectedRegency && (
                    <>
                      <Divider />
                      <RegionBlock
                        label="Kota / Kabupaten"
                        name={selectedRegency.name}
                        size="xl"
                      />
                    </>
                  )}

                  {selectedDistrict && (
                    <>
                      <Divider />
                      <RegionBlock
                        label="Kecamatan"
                        name={selectedDistrict.name}
                        size="lg"
                      />
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
