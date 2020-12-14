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