import { LocationType } from './location';

export class WeatherForeCast {
    consolidated_weather: Array<WeatherDetail>;
    title: string;
    location_type: string;
    woeid: number;
    latt_long: string;
    timezone: string;
    time?: string;
    parent?: LocationType;
}

export class WeatherDetail {
    id: number;
    weather_state_name: string;
    weather_state_abbr: string;
    applicable_date: string;
    min_temp: number;
    max_temp: number;
    the_temp: number;
    isMaxTemp?: boolean;
    visibility?: number;
}
