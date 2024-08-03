export interface Data {
  place_id: string;
  licence: string;
  osm_type: string;
  osm_id: string;
  lat: string;
  lon: string;
  display_name: string;
  address: Address;
  boundingbox: string[];
}

export interface Address {
  hotel: string;
  house_number: string;
  road: string;
  neighbourhood: string;
  suburb: string;
  town: string;
  city: string;
  state_district: string;
  state: string;
  postcode: string;
  country: string;
  country_code: string;
}

export const getAddress = async (lat: number, lon: number): Promise<Data> => {
  const response = await fetch(
    `https://us1.locationiq.com/v1/reverse?key=pk.185e69bbc5f4bc1a1621472a99c4f879&lat=${lat}&lon=${lon}&format=json&accept-language=en-US`,
  );
  const data = (await response.json()) as Promise<Data>;
  return data;
};
