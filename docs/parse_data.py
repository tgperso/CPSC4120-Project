import pandas as pd

# Read the CSV file into a Pandas DataFrame
df = pd.read_csv("tracks.csv")

# Convert 'rank' column to integer
df['rank'] = df['rank'].astype(int)

# Filter for rows where the rank is #1
df_filtered = df[df['rank'] == 1]

# Convert 'date' column to datetime to extract the year
df_filtered['date'] = pd.to_datetime(df_filtered['date'], format='%m/%d/%Y')
df_filtered['year'] = df_filtered['date'].dt.year

# Group the data by 'year' and 'artist' and count the number of appearances for each artist within each year
artist_appearances_by_year = df_filtered.groupby(['year', 'artist']).size().reset_index(name='count')

# Calculate the total number of appearances for each year
total_appearances_by_year = artist_appearances_by_year.groupby('year')['count'].transform('sum')

# Calculate the percentage of appearances for each artist by year and round it to two decimal places
artist_appearances_by_year['percentage_of_year'] = (
    (artist_appearances_by_year['count'] / total_appearances_by_year) * 100
).round(2)  # Rounded to two decimal places

# Convert 'date' to a string to avoid sorting issues
df_filtered['date'] = df_filtered['date'].dt.strftime('%m/%d/%Y')

# Create a new DataFrame with explicit data type conversions
result_df = pd.DataFrame({
    'year': artist_appearances_by_year['year'],
    'artist': artist_appearances_by_year['artist'],
    'percentage_of_year': artist_appearances_by_year['percentage_of_year']
})

# Export the result DataFrame to a new CSV file
result_df.to_csv("num1Artists.csv", index=False)
