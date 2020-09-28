export class Forecast {
    id: number;
    applicable_date: string;
    max_temp: number;
    min_temp: number;
    the_temp: number;
    weather_state_abbr: string;
    weather_state_name: string;
    isMaxTemp?: boolean;
}
