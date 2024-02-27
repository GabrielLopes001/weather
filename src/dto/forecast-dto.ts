export type Location = {
  name: string
  country: string
}

type Condition = {
  text: string
  icon: string
}

type Current = {
  temp_c: string
  wind_kph: string
  humidity: string
  condition: Condition
}

type DayData = {
  avgtemp_c: string
  condition: Condition
}

type Day = {
  date: string
  day: DayData
}

type ForecastDay = {
  forecastday: Day[]
}

export type ForecastDTO = {
  location: Location
  current: Current
  forecast: ForecastDay
}
