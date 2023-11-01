import pandas as pd

df = pd.read_csv('tracks.csv', parse_dates=['date'])
df2 = pd.read_csv('artists.csv')

#These vars are for separating the decades for topArtist vis
num_artists = 12

start_date_60s = '1960-01-01'
end_date_60s = '1969-12-30'
start_date_70s = '1970-01-01'
end_date_70s = '1979-12-30'
start_date_80s = '1980-01-01'
end_date_80s = '1989-12-30'
start_date_90s = '1990-01-01'
end_date_90s = '1999-12-30'
start_date_00s = '2000-01-01'
end_date_00s = '2009-12-30'
start_date_10s = '2010-01-01'
end_date_10s = '2021-12-30'

#derive popularity column
df['pop_score'] = pow(101-df['rank'], 5) / 1000000000
df.loc[df['rank'] == 1, 'is_top_rank'] = 1
df.loc[df['rank'] != 1, 'is_top_rank'] = 0

#derive topRank column
df['is_top_rank'] = df['is_top_rank'].astype(int)

#rename artist column
df.rename(columns={'artist': 'all_artists'}, inplace=True)

#join
new = pd.merge(df, df2, left_on='id', right_on='song_id', how='left')
new = new.drop_duplicates()

#drop unnecessary cols
new.drop(columns='song_id', inplace=True)

#rename id and create new unique identifier
new.rename(columns={'id':'track_id'}, inplace=True)
new['ID'] = range(1, len(new) + 1)

new.rename(columns={'song': 'title'}, inplace=True)

#Uncomment this line to generate the raw data CSV with all avaiable info
#new.to_csv('rawData.csv', index=False)

#This function filters out all the data needed for topArtist vis and separates by decade
def filter(start_date, end_date, num_artists, df, new_col_val):

    dfNew = df.loc[(df['date'] >= start_date) & (df['date'] <= end_date)]

    group = dfNew.groupby('artist_id')['pop_score'].sum().reset_index()
    group.rename(columns={'pop_score' : 'total_artist_pop'}, inplace=True)
    dfNew = pd.merge(dfNew, group, on='artist_id', how='left')

    group = group.sort_values(by='total_artist_pop', ascending=False)
    top_artists = group['artist_id'].head(num_artists)

    dfNew = dfNew[dfNew['artist_id'].isin(top_artists)]

    group2 = dfNew.groupby('track_id')['pop_score'].sum().reset_index()
    group2.rename(columns={'pop_score' : 'total_track_pop'}, inplace=True)
    dfNew_cols = ['track_id', 'title', 'artist', 'total_artist_pop']
    dfNew = pd.merge(dfNew[dfNew_cols], group2, on='track_id', how='left')

    dfNew = dfNew.loc[dfNew['total_track_pop'] > 1]

    dfNew['era'] = new_col_val

    dfNew = dfNew.drop_duplicates()

    return dfNew

df60 = filter(start_date_60s, end_date_60s, num_artists, new, '60')



df70 = filter(start_date_70s, end_date_70s, num_artists, new, '70')



df80 = filter(start_date_80s, end_date_80s, num_artists, new, '80')



df90 = filter(start_date_90s, end_date_90s, num_artists, new, '90')



df00 = filter(start_date_00s, end_date_00s, num_artists, new, '00')



df10 = filter(start_date_10s, end_date_10s, num_artists, new, '10')


result = pd.concat([df60, df70, df80, df90, df00, df10])
result.to_csv("topArtists.csv", index=False)
