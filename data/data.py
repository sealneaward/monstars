import pandas as pd
import requests


def get_hustle_stats():
    # dowload defensive hustle stats from: stats.nba.com
    # there are different stats for defense for different ranges of shots and
    # locations

    # overall
    url = 'http://stats.nba.com/stats/leaguedashptstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=' \
          '&DraftPick=&DraftYear=&GameScope=&Height=&LastNGames=0&LeagueID=00&Location=&Month=0&OpponentTeamID=0' \
          '&Outcome=&PORound=0&PerMode=Totals&PlayerExperience=&PlayerOrTeam=Player&PlayerPosition=' \
          '&PtMeasureType=Defense&Season=2015-16&SeasonSegment=&SeasonType=Playoffs&StarterBench=&TeamID=0' \
          '&VsConference=&VsDivision=&Weight='

    hustle_defense_overall = get_dataframe_from_response(url=url)
    hustle_defense_overall['Hustle Type'] = 'Overall'

    # 3 Pointers
    url = 'http://stats.nba.com/stats/leaguedashptdefend?College=&Conference=&Country=&DateFrom=&DateTo=' \
          '&DefenseCategory=3+Pointers&Division=&DraftPick=&DraftYear=&GameSegment=&Height=&LastNGames=0&LeagueID=00' \
          '&Location=&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PerMode=PerGame&Period=0&PlayerExperience=' \
          '&PlayerPosition=&Season=2015-16&SeasonSegment=&SeasonType=Playoffs&StarterBench=&TeamID=0&VsConference=' \
          '&VsDivision=&Weight='

    hustle_defense_three = get_dataframe_from_response(url=url)
    hustle_defense_three['Hustle Type'] = '3 Pointers'

    # 2 Pointers
    url = 'http://stats.nba.com/stats/leaguedashptdefend?College=&Conference=&Country=&DateFrom=&DateTo=' \
          '&DefenseCategory=2+Pointers&Division=&DraftPick=&DraftYear=&GameSegment=&Height=&LastNGames=0&LeagueID=00' \
          '&Location=&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PerMode=PerGame&Period=0&PlayerExperience=' \
          '&PlayerPosition=&Season=2015-16&SeasonSegment=&SeasonType=Playoffs&StarterBench=&TeamID=0&VsConference=' \
          '&VsDivision=&Weight='

    hustle_defense_two = get_dataframe_from_response(url=url)
    hustle_defense_two['Hustle Type'] = '2 Pointers'

    # 6 Feet
    url = 'http://stats.nba.com/stats/leaguedashptdefend?College=&Conference=&Country=&DateFrom=&DateTo=' \
           '&DefenseCategory=Less+Than+6Ft&Division=&DraftPick=&DraftYear=&GameSegment=&Height=&LastNGames=0' \
           '&LeagueID=00&Location=&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PerMode=PerGame&Period=0' \
           '&PlayerExperience=&PlayerPosition=&Season=2015-16&SeasonSegment=&SeasonType=Playoffs&StarterBench=' \
           '&TeamID=0&VsConference=&VsDivision=&Weight='

    hustle_defense_six = get_dataframe_from_response(url=url)
    hustle_defense_six['Hustle Type'] = 'Less Than 6 Feet'

    # 10 Feet
    url = 'http://stats.nba.com/stats/leaguedashptdefend?College=&Conference=&Country=&DateFrom=&DateTo=' \
          '&DefenseCategory=Less+Than+10Ft&Division=&DraftPick=&DraftYear=&GameSegment=&Height=&LastNGames=0' \
          '&LeagueID=00&Location=&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PerMode=PerGame&Period=0' \
          '&PlayerExperience=&PlayerPosition=&Season=2015-16&SeasonSegment=&SeasonType=Playoffs&StarterBench=' \
          '&TeamID=0&VsConference=&VsDivision=&Weight='

    hustle_defense_ten = get_dataframe_from_response(url=url)
    hustle_defense_ten['Hustle Type'] = 'Less Than 10 Feet'

    # 15 Feet
    url = 'http://stats.nba.com/stats/leaguedashptdefend?College=&Conference=&Country=&DateFrom=&DateTo=&' \
          'DefenseCategory=Greater+Than+15Ft&Division=&DraftPick=&DraftYear=&GameSegment=&Height=&LastNGames=0' \
          '&LeagueID=00&Location=&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PerMode=PerGame&Period=0&' \
          'PlayerExperience=&PlayerPosition=&Season=2015-16&SeasonSegment=&SeasonType=Playoffs&StarterBench=' \
          '&TeamID=0&VsConference=&VsDivision=&Weight='

    hustle_defense_fifteen = get_dataframe_from_response(url=url)
    hustle_defense_fifteen['Hustle Type'] = 'Greater Than 15 Feet'

    # Rim Protection

    url = 'http://stats.nba.com/stats/leaguedashptstats?College=&Conference=&Country=&DateFrom=&DateTo=&' \
          'Division=&DraftPick=&DraftYear=&GameScope=&Height=&LastNGames=0&LeagueID=00&Location=&Month=0&' \
          'OpponentTeamID=0&Outcome=&PORound=0&PerMode=PerGame&PlayerExperience=&PlayerOrTeam=Player&PlayerPosition=&' \
          'PtMeasureType=Defense&Season=2015-16&SeasonSegment=&SeasonType=Playoffs&StarterBench=&TeamID=0&' \
          'VsConference=&VsDivision=&Weight='

    hustle_defense_rim = get_dataframe_from_response(url=url)
    hustle_defense_rim['Hustle Type'] = 'Rim Protection'


    # write to file
    hustle_defense_overall.to_csv('stats/hustle_defense_overall.csv',index=False)
    hustle_defense_fifteen.to_csv('stats/hustle_defense_fifteen.csv', index=False)
    hustle_defense_two.to_csv('stats/hustle_defense_two.csv', index=False)
    hustle_defense_three.to_csv('stats/hustle_defense_three.csv', index=False)
    hustle_defense_six.to_csv('stats/hustle_defense_six.csv', index=False)
    hustle_defense_rim.to_csv('stats/hustle_defense_rim.csv', index=False)
    hustle_defense_ten.to_csv('stats/hustle_defense_ten.csv', index=False)


def get_dataframe_from_response(url):
    response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
    while response.status_code != 200:
        response = requests.get(url)
    defensive_headers = response.json()['resultSets'][0]['headers']
    defensive_data = response.json()['resultSets'][0]['rowSet']
    hustle_defense = pd.DataFrame(defensive_data, columns=defensive_headers)

    return hustle_defense

