import pandas as pd

df = pd.read_csv('tracks.csv', parse_dates=['date'])
df2 = pd.read_csv('artists.csv')

#These vars are for separating the decades for topArtist vis
# num_artists = 12

# start_date_60s = '1960-01-01'
# end_date_60s = '1969-12-30'
# start_date_70s = '1970-01-01'
# end_date_70s = '1979-12-30'
# start_date_80s = '1980-01-01'
# end_date_80s = '1989-12-30'
# start_date_90s = '1990-01-01'
# end_date_90s = '1999-12-30'
# start_date_00s = '2000-01-01'
# end_date_00s = '2009-12-30'
# start_date_10s = '2010-01-01'
# end_date_10s = '2021-12-30'

sd1958 = '1958-08-04'
ed1958 = '1958-12-30'
sd1959 = '1959-01-01'
ed1959 = '1959-12-30'

sd1960 = '1960-01-01'
ed1960 = '1960-12-30'
sd1961 = '1961-01-01'
ed1961 = '1961-12-30'
sd1962 = '1962-01-01'
ed1962 = '1962-12-30'
sd1963 = '1963-01-01'
ed1963 = '1963-12-30'
sd1964 = '1964-01-01'
ed1964 = '1964-12-30'
sd1965 = '1965-01-01'
ed1965 = '1965-12-30'
sd1966 = '1966-01-01'
ed1966 = '1966-12-30'
sd1967 = '1967-01-01'
ed1967 = '1967-12-30'
sd1968 = '1968-01-01'
ed1968 = '1968-12-30'
sd1969 = '1969-01-01'
ed1969 = '1969-12-30'

sd1970 = '1970-01-01'
ed1970 = '1970-12-30'
sd1971 = '1971-01-01'
ed1971 = '1971-12-30'
sd1972 = '1972-01-01'
ed1972 = '1972-12-30'
sd1973 = '1973-01-01'
ed1973 = '1973-12-30'
sd1974 = '1974-01-01'
ed1974 = '1974-12-30'
sd1975 = '1975-01-01'
ed1975 = '1975-12-30'
sd1976 = '1976-01-01'
ed1976 = '1976-12-30'
sd1977 = '1977-01-01'
ed1977 = '1977-12-30'
sd1978 = '1978-01-01'
ed1978 = '1978-12-30'
sd1979 = '1979-01-01'
ed1979 = '1979-12-30'

sd1980 = '1980-01-01'
ed1980 = '1980-12-30'
sd1981 = '1981-01-01'
ed1981 = '1981-12-30'
sd1982 = '1982-01-01'
ed1982 = '1982-12-30'
sd1983 = '1983-01-01'
ed1983 = '1983-12-30'
sd1984 = '1984-01-01'
ed1984 = '1984-12-30'
sd1985 = '1985-01-01'
ed1985 = '1985-12-30'
sd1986 = '1986-01-01'
ed1986 = '1986-12-30'
sd1987 = '1987-01-01'
ed1987 = '1987-12-30'
sd1988 = '1988-01-01'
ed1988 = '1988-12-30'
sd1989 = '1989-01-01'
ed1989 = '1989-12-30'

sd1990 = '1990-01-01'
ed1990 = '1990-12-30'
sd1991 = '1991-01-01'
ed1991 = '1991-12-30'
sd1992 = '1992-01-01'
ed1992 = '1992-12-30'
sd1993 = '1993-01-01'
ed1993 = '1993-12-30'
sd1994 = '1994-01-01'
ed1994 = '1994-12-30'
sd1995 = '1995-01-01'
ed1995 = '1995-12-30'
sd1996 = '1996-01-01'
ed1996 = '1996-12-30'
sd1997 = '1997-01-01'
ed1997 = '1997-12-30'
sd1998 = '1998-01-01'
ed1998 = '1998-12-30'
sd1999 = '1999-01-01'
ed1999 = '1999-12-30'

sd2000 = '2000-01-01'
ed2000 = '2000-12-30'
sd2001 = '2001-01-01'
ed2001 = '2001-12-30'
sd2002 = '2002-01-01'
ed2002 = '2002-12-30'
sd2003 = '2003-01-01'
ed2003 = '2003-12-30'
sd2004 = '2004-01-01'
ed2004 = '2004-12-30'
sd2005 = '2005-01-01'
ed2005 = '2005-12-30'
sd2006 = '2006-01-01'
ed2006 = '2006-12-30'
sd2007 = '2007-01-01'
ed2007 = '2007-12-30'
sd2008 = '2008-01-01'
ed2008 = '2008-12-30'
sd2009 = '2009-01-01'
ed2009 = '2009-12-30'

sd2010 = '2010-01-01'
ed2010 = '2010-12-30'
sd2011 = '2011-01-01'
ed2011 = '2011-12-30'
sd2012 = '2012-01-01'
ed2012 = '2012-12-30'
sd2013 = '2013-01-01'
ed2013 = '2013-12-30'
sd2014 = '2014-01-01'
ed2014 = '2014-12-30'
sd2015 = '2015-01-01'
ed2015 = '2015-12-30'
sd2016 = '2016-01-01'
ed2016 = '2016-12-30'
sd2017 = '2017-01-01'
ed2017 = '2017-12-30'
sd2018 = '2018-01-01'
ed2018 = '2018-12-30'
sd2019 = '2019-01-01'
ed2019 = '2019-12-30'

sd2020 = '2020-01-01'
ed2020 = '2020-12-30'
sd2021 = '2021-01-01'
ed2021 = '2021-11-06'



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
# new.to_csv('rawData.csv', index=False)

#This function filters out all the data needed for topArtist vis and separates by decade
# def filter(start_date, end_date, num_artists, df, new_col_val):

#     dfNew = df.loc[(df['date'] >= start_date) & (df['date'] <= end_date)]

#     group = dfNew.groupby('artist_id')['pop_score'].sum().reset_index()
#     group.rename(columns={'pop_score' : 'total_artist_pop'}, inplace=True)
#     dfNew = pd.merge(dfNew, group, on='artist_id', how='left')

#     group = group.sort_values(by='total_artist_pop', ascending=False)
#     top_artists = group['artist_id'].head(num_artists)

#     dfNew = dfNew[dfNew['artist_id'].isin(top_artists)]

#     group2 = dfNew.groupby('track_id')['pop_score'].sum().reset_index()
#     group2.rename(columns={'pop_score' : 'total_track_pop'}, inplace=True)
#     dfNew_cols = ['track_id', 'title', 'artist', 'total_artist_pop']
#     dfNew = pd.merge(dfNew[dfNew_cols], group2, on='track_id', how='left')

#     dfNew = dfNew.loc[dfNew['total_track_pop'] > 1]

#     dfNew['era'] = new_col_val

#     dfNew = dfNew.drop_duplicates()

#     return dfNew

# df60 = filter(start_date_60s, end_date_60s, num_artists, new, '60')
# df70 = filter(start_date_70s, end_date_70s, num_artists, new, '70')
# df80 = filter(start_date_80s, end_date_80s, num_artists, new, '80')
# df90 = filter(start_date_90s, end_date_90s, num_artists, new, '90')
# df00 = filter(start_date_00s, end_date_00s, num_artists, new, '00')
# df10 = filter(start_date_10s, end_date_10s, num_artists, new, '10')

# result = pd.concat([df60, df70, df80, df90, df00, df10])
# result.to_csv("topArtists.csv", index=False)
def filter(start_date, end_date, df, new_col_val):

    dfNew = df.loc[(df['date'] >= start_date) & (df['date'] <= end_date)]

    group = dfNew.groupby('artist_id')['pop_score'].sum().reset_index()
    group.rename(columns={'pop_score_y' : 'total_artist_pop'}, inplace=True)
    dfNew_cols = ['artist_id', 'title', 'artist', 'pop_score']
    dfNew = pd.merge(dfNew[dfNew_cols], group, on='artist_id', how='left')

    dfNew = dfNew.loc[dfNew['pop_score_x'] > 1]

    dfNew['year'] = new_col_val

    dfNew = dfNew.drop_duplicates()

    return dfNew

df58 = filter(sd1958, ed1958, new, '1958')
df59 = filter(sd1959, ed1959, new, '1959')

df60 = filter(sd1960, ed1960, new, '1960')
df61 = filter(sd1961, ed1961, new, '1961')
df62 = filter(sd1962, ed1962, new, '1962')
df63 = filter(sd1963, ed1963, new, '1963')
df64 = filter(sd1964, ed1964, new, '1964')
df65 = filter(sd1965, ed1965, new, '1965')
df66 = filter(sd1966, ed1966, new, '1966')
df67 = filter(sd1967, ed1967, new, '1967')
df68 = filter(sd1968, ed1968, new, '1968')
df69 = filter(sd1969, ed1969, new, '1969')

df70 = filter(sd1970, ed1970, new, '1970')
df71 = filter(sd1971, ed1971, new, '1971')
df72 = filter(sd1972, ed1972, new, '1972')
df73 = filter(sd1973, ed1973, new, '1973')
df74 = filter(sd1974, ed1974, new, '1974')
df75 = filter(sd1975, ed1975, new, '1975')
df76 = filter(sd1976, ed1976, new, '1976')
df77 = filter(sd1977, ed1977, new, '1977')
df78 = filter(sd1978, ed1978, new, '1978')
df79 = filter(sd1979, ed1979, new, '1979')

df80 = filter(sd1980, ed1980, new, '1980')
df81 = filter(sd1981, ed1981, new, '1981')
df82 = filter(sd1982, ed1982, new, '1982')
df83 = filter(sd1983, ed1983, new, '1983')
df84 = filter(sd1984, ed1984, new, '1984')
df85 = filter(sd1985, ed1985, new, '1985')
df86 = filter(sd1986, ed1986, new, '1986')
df87 = filter(sd1987, ed1987, new, '1987')
df88 = filter(sd1988, ed1988, new, '1988')
df89 = filter(sd1989, ed1989, new, '1989')

df90 = filter(sd1990, ed1990, new, '1990')
df91 = filter(sd1991, ed1991, new, '1991')
df92 = filter(sd1992, ed1992, new, '1992')
df93 = filter(sd1993, ed1993, new, '1993')
df94 = filter(sd1994, ed1994, new, '1994')
df95 = filter(sd1995, ed1995, new, '1995')
df96 = filter(sd1996, ed1996, new, '1996')
df97 = filter(sd1997, ed1997, new, '1997')
df98 = filter(sd1998, ed1998, new, '1998')
df99 = filter(sd1999, ed1999, new, '1999')

df00 = filter(sd2000, ed2000, new, '2000')
df01 = filter(sd2001, ed2001, new, '2001')
df02 = filter(sd2002, ed2002, new, '2002')
df03 = filter(sd2003, ed2003, new, '2003')
df04 = filter(sd2004, ed2004, new, '2004')
df05 = filter(sd2005, ed2005, new, '2005')
df06 = filter(sd2006, ed2006, new, '2006')
df07 = filter(sd2007, ed2007, new, '2007')
df08 = filter(sd2008, ed2008, new, '2008')
df09 = filter(sd2009, ed2009, new, '2009')

df10 = filter(sd2010, ed2010, new, '2010')
df11 = filter(sd2011, ed2011, new, '2011')
df12 = filter(sd2012, ed2012, new, '2012')
df13 = filter(sd2013, ed2013, new, '2013')
df14 = filter(sd2014, ed2014, new, '2014')
df15 = filter(sd2015, ed2015, new, '2015')
df16 = filter(sd2016, ed2016, new, '2016')
df17 = filter(sd2017, ed2017, new, '2017')
df18 = filter(sd2018, ed2018, new, '2018')
df19 = filter(sd2019, ed2019, new, '2019')

df20 = filter(sd2020, ed2020, new, '2020')
df21 = filter(sd2021, ed2021, new, '2021')


result = pd.concat([df58, df59, 
                    df60, df61, df62, df63, df64, df65, df66, df67, df68, df69,
                    df70, df71, df72, df73, df74, df75, df76, df77, df78, df79,
                    df80, df81, df82, df83, df84, df85, df86, df87, df88, df89,
                    df90, df91, df92, df93, df94, df95, df96, df97, df98, df99,
                    df00, df01, df02, df03, df04, df05, df06, df07, df08, df09,
                    df10, df11, df12, df13, df14, df15, df16, df17, df18, df19,
                    df20, df21])
result.to_csv("artistPop.csv", index=False)
