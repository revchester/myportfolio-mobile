/*	CASE
NHTSA adalah salah satu departemen pemerintah di Amerika Serikat yang fokus
terhadap mengurangi angka kecelakaan lalu lintas di jalan raya. Saat ini
NHTSA sedang menggodok regulasi baru yang akan diterapkan tahun depan.
Saat ini perusahaan diminta untuk menganalisa data yang dikumpulkan
selama tahun 2021. Data ini adalah data lengkap tentang kecelakaan yang
terjadi selama tahun 2021.

Tujuan Analisa Data:
Tujuan utama adalah untuk memberikan sejumlah rekomendasi tentang cara
mengurangi angka kecelakaan di jalan raya. Untuk melakukan ini,
pertama-tama Anda perlu mengidentifikasi data berikut:
1.	Kondisi yang meningkatkan risiko kecelakaan
2.	10 teratas negara bagian di mana kecelakaan paling banyak terjadi
3.	Jumlah rerata kecelakaan yang terjadi setiap jam
4.	Persentase kecelakaan yang disebabkan oleh pengemudi yang mabuk
5.	Persentasi kecelakaan di daerah pedesaan dan perkotaan
6.	Jumlah kecelakaan berdasarkan hari
7.	Tentukan parameter lain 
*/

-- load tabel crash
SELECT * FROM crash;

-- load timezone America
SELECT * FROM pg_timezone_names()
WHERE name LIKE 'America/%';

-- synchronize timezone with creating new table
DROP TABLE IF EXISTS crash_2021;	-- menghapus table jika sudah ada
CREATE TABLE crash_2021 AS 			-- membuat table baru
WITH data_validation AS (			-- membuat validasi data
	SELECT * , timestamp_of_crash AT TIME ZONE		-- mengubah waktu berdasarkan zona
	CASE
	WHEN state_name IN (
		'Alabama', 'Arkansas', 'Illionis', 'Iowa', 'Kansas', 'Louisiana', 'Minnesota', 'Mississipi', 'Missouri', 'Nebraska', 'North Dakota', 'Oklahoma', 'South Dakota', 'Tennesse', 'Texas', 'Wisconsin'
	) THEN 'America/Chicago'
	WHEN state_name IN (
		'Colorado', 'Montana', 'New Mexico', 'Utah', 'Wyoming'
	) THEN 'America/Denver'
	WHEN state_name IN (
		'Connecticut', 'Delaware', 'District', 'Florida', 'Georgia', 'Indiana', 'Kentucky', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'New Hampshire', 'New Jersey', 'New York', 'North Carolina', 'Ohio', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'Vermont', 'Virginia', 'West Virginia'
	) THEN 'America/New_York'
	WHEN state_name IN (
		'California', 'Nevada', 'Oregon', 'Washington'
	) THEN 'America/Los_Angeles'
	WHEN state_name IN ('Idaho') THEN 'America/Boise'
	WHEN state_name IN ('Alaska') THEN 'America/Anchorage'
	WHEN state_name IN ('Hawaii') THEN 'Pacific/Honolulu'
	ELSE 'UTC'
	END AS real_timezone
	FROM crash
) SELECT		-- memilih kolom yang akan di tampilkan
consecutive_number,
state_name,
city_name,
land_use_name,
CONCAT (
	type_of_intersection_name, ' - ', light_condition_name, ' - ', atmospheric_conditions_1_name
) AS factor_condition,
number_of_fatalities,
number_of_drunk_drivers,
real_timezone,
EXTRACT (YEAR FROM real_timezone) AS crash_year,
TO_CHAR (real_timezone, 'Month') AS crash_month,
CASE
WHEN EXTRACT (DOW FROM real_timezone) = 0 THEN 'Minggu'
WHEN EXTRACT (DOW FROM real_timezone) = 1 THEN 'Senin'
WHEN EXTRACT (DOW FROM real_timezone) = 2 THEN 'Selasa'
WHEN EXTRACT (DOW FROM real_timezone) = 3 THEN 'Rabu'
WHEN EXTRACT (DOW FROM real_timezone) = 4 THEN 'Kamis'
WHEN EXTRACT (DOW FROM real_timezone) = 5 THEN 'Jumat'
WHEN EXTRACT (DOW FROM real_timezone) = 6 THEN 'Sabtu'
END AS crash_day,
EXTRACT (HOUR FROM real_timezone) AS crash_hour_time
FROM data_validation
WHERE EXTRACT (YEAR FROM real_timezone) = '2021'
ORDER BY consecutive_number
;

-- menampilkan tabel crash_2021
SELECT * FROM crash_2021;

--	1.	tingkat kecelakaan berdasarkan faktor kondisi
SELECT factor_condition,
COUNT (*) AS jumlah_kecelakaan
FROM crash_2021
GROUP BY factor_condition
ORDER BY jumlah_kecelakaan DESC
LIMIT 10
;

--	2.	10 negara bagian dengan tingkat kecelakaan tertinggi
SELECT state_name,
COUNT (*) AS jumlah_kecelakaan
FROM crash_2021
GROUP BY state_name
ORDER BY jumlah_kecelakaan DESC
LIMIT 10
;

--	3.	rata-rata kecelakaan per jam
SELECT crash_hour_time,
COUNT (*) AS jumlah_kecelakaan,
ROUND (
	COUNT (*) / 365.0
) AS average_per_hour
FROM crash_2021
GROUP BY crash_hour_time
ORDER BY crash_hour_time
;

--	4.	drunk driver percentage of accident
SELECT number_of_drunk_drivers,
COUNT (*) AS total_drunk_driver,
CASE
WHEN number_of_drunk_drivers = 0 THEN 'Not Drunk'
WHEN number_of_drunk_drivers = 1 THEN 'Slightly Drunk'
WHEN number_of_drunk_drivers = 2 THEN 'Moderate Drunk'
WHEN number_of_drunk_drivers = 3 THEN 'Heavy Drunk'
WHEN number_of_drunk_drivers = 4 THEN 'Very Heavy Drunk'
ELSE 'Unknown'
END AS drunk_status,
ROUND (
	(
		COUNT (*) * 100.0 / (
			SUM (COUNT (*)) OVER ()
		)
	), 3
) AS crash_percent_drunk
FROM crash_2021
GROUP BY number_of_drunk_drivers
ORDER BY number_of_drunk_drivers ASC
;

--	5.	jumlah kecelakaan di desa dan kota
SELECT land_use_name,
COUNT (*) AS jumlah_kecelakaan,
ROUND (
	(
		COUNT (*) * 100.0 / (
			SUM (COUNT (*)) OVER ()
		)
	), 3
) AS percentage
FROM crash_2021
GROUP BY land_use_name
ORDER BY jumlah_kecelakaan DESC
;

--	6.	jumlah kecelakaan setiap hari
SELECT crash_day,
COUNT (*) AS jumlah_kecelakaan
FROM crash_2021
GROUP BY crash_day
ORDER BY 
CASE 
WHEN crash_day = 'Senin' THEN 0
WHEN crash_day = 'Selasa' THEN 1
WHEN crash_day = 'Rabu' THEN 2
WHEN crash_day = 'Kamis' THEN 3
WHEN crash_day = 'Jumat' THEN 4
WHEN crash_day = 'Sabtu' THEN 5
WHEN crash_day = 'Minggu' THEN 6
END
;

--	7.	jumlah kecelakaan berdasarkan faktor eksternal
SELECT state_name,
land_use_name,
factor_condition,
crash_day,
crash_hour_time,
COUNT (*) jumlah_kecelakaan
FROM crash_2021
GROUP BY state_name,
land_use_name,
factor_condition,
crash_day,
crash_hour_time
ORDER BY jumlah_kecelakaan DESC
LIMIT 10
;
