export interface game {
    id: number,
    date: string,
    home_team: team,
    home_team_score: number,
    period: number,
    postseason: boolean,
    season: number,
    status: string,
    time: string,
    visitor_team: team,
    visitor_team_score: number
}

export interface team {
    id: number,
    current_page: number,
    abbreviation: string,
    city: string,
    conference: string,
    division: string,
    full_name: string,
    name: string
}

export interface details {
    total_pages: number,
    current_page: number,
    next_page: number,
    per_page: number,
    total_count: number,
}

export interface gameData {
    data: game[],
    meta: {details}
}

export interface rawSportsData{
    sports_content: sports_content;
}

export interface sports_content{
    sports_meta : sports_meta;
}

export interface sports_meta{date_time:string, end_to_end_time_millis: string, consolidatedDomKey: string, season_meta:season_meta, next: {url:string}}

export interface season_meta{
    calendar_date: string,
    season_year: number
    stats_season_year: string,
    stats_season_id: string,
    stats_season_stage: string,
    roster_season_year: string,
    schedule_season_year: string,
    standings_season_year: string,
    season_id: string,
    display_year: string,
    display_season: string,
    season_stage: string,
    league_id: string
}