Q. Find the difference between the total number of CITY entries in the table and the number of distinct CITY entries in the table.
A.

```sql
SELECT COUNT(CITY) - COUNT(DISTINCT CITY) FROM STATION;
```

Q. Query the two cities in STATION with the shortest and longest CITY names, as well as their respective lengths (i.e.: number of characters in the name). If there is more than one smallest or largest city, choose the one that comes first when ordered alphabetically.
A.

```sql
(
    SELECT CITY, LENGTH(CITY) AS city_length
    FROM STATION
    ORDER BY LENGTH(CITY) ASC, CITY ASC
    LIMIT 1
)
UNION
(
    SELECT CITY, LENGTH(CITY) AS city_length
    FROM STATION
    ORDER BY LENGTH(CITY) DESC, CITY ASC
    LIMIT 1
);

```

Q. Query the list of CITY names starting with vowels (i.e., a, e, i, o, or u) from STATION. Your result cannot contain duplicates.
A.

```sql
SELECT DISTINCT CITY FROM STATION WHERE CITY REGEXP "^[AEIOUaeiou]";
```

Q. Query the list of CITY names ending with vowels (a, e, i, o, u) from STATION. Your result cannot contain duplicates.
A.

```sql
SELECT DISTINCT CITY FROM STATION WHERE CITY REGEXP "[AEIOUaeiou]$";
```

Q. Query the list of CITY names from STATION which have vowels (i.e., a, e, i, o, and u) as both their first and last characters. Your result cannot contain duplicates.
A.

```sql
SELECT CITY FROM STATION WHERE CITY REGEXP "^[AEIOUaeiou]" AND CITY REGEXP "[AEIOUaeiou]$";
```

Q. Query the list of CITY names from STATION that do not start with vowels. Your result cannot contain duplicates.
A.

```sql
SELECT DISTINCT CITY FROM STATION WHERE CITY REGEXP "^[^AEIOUaeiou]";
```

Q. Query the list of CITY names from STATION that do not end with vowels. Your result cannot contain duplicates.
A.

```sql
SELECT DISTINCT CITY FROM STATION WHERE CITY REGEXP "[^AEIOUaeiou]$";
```

Q. Query the list of CITY names from STATION that either do not start with vowels or do not end with vowels. Your result cannot contain duplicates.
A.

```sql
SELECT DISTINCT CITY FROM STATION WHERE CITY REGEXP "^[^AEIOUaeiou]" OR CITY REGEXP "[^AEIOUaeiou]$";
```

Q. Query the list of CITY names from STATION that do not start with vowels and do not end with vowels. Your result cannot contain duplicates.
A.

```sql
SELECT DISTINCT CITY FROM STATION WHERE CITY REGEXP "^[^AEIOUaeiou]" AND CITY REGEXP "[^AEIOUaeiou]$";
```

Q. Query the Name of any student in STUDENTS who scored higher than `75` Marks. Order your output by the last three characters of each name. If two or more students both have names ending in the same last three characters (i.e.: Bobby, Robby, etc.), secondary sort them by ascending ID.
A.

```sql
SELECT Name FROM STUDENTS WHERE Marks > 75 ORDER BY RIGHT(Name, 3), ID ASC;
```

Q. Write a query that prints a list of employee names (i.e.: the name attribute) from the Employee table in alphabetical order.
A.

```sql
select name from Employee order by name;
```

Q. Write a query that prints a list of employee names (i.e.: the name attribute) for employees in Employee having a salary greater than `2000` per month who have been employees for less than `10` months. Sort your result by ascending employee_id.
A.

```sql
select name from Employee where salary > 2000 and months < 10;
```

Q. Write a query identifying the type of each record in the TRIANGLES table using its three side lengths. Output one of the following statements for each record in the table:

Equilateral: It's a triangle with sides 3 of equal length.
Isosceles: It's a triangle with sides 2 of equal length.
Scalene: It's a triangle with sides 3 of differing lengths.
Not A Triangle: The given values of A, B, and C don't form a triangle.
A.

```sql
SELECT
    CASE
        WHEN A + B <= C OR A + C <= B OR B + C <= A THEN 'Not A Triangle'
        WHEN A = B AND B = C THEN 'Equilateral'
        WHEN A = B OR A = C OR B = C THEN 'Isosceles'
        ELSE 'Scalene'
    END AS Triangle_Type
FROM TRIANGLES;
```

Q. Generate the following two result sets:

Query an alphabetically ordered list of all names in OCCUPATIONS, immediately followed by the first letter of each profession as a parenthetical (i.e.: enclosed in parentheses). For example: AnActorName(A), ADoctorName(D), AProfessorName(P), and ASingerName(S).
Query the number of ocurrences of each occupation in OCCUPATIONS. Sort the occurrences in ascending order, and output them in the following format:

There are a total of [occupation_count] [occupation]s.
where [occupation_count] is the number of occurrences of an occupation in OCCUPATIONS and [occupation] is the lowercase occupation name. If more than one Occupation has the same [occupation_count], they should be ordered alphabetically.

Note: There will be at least two entries in the table for each type of occupation.
A.

```sql
SELECT CONCAT(Name, '(', LEFT(Occupation, 1), ')') AS NameWithInitial
FROM OCCUPATIONS
ORDER BY Name;

SELECT CONCAT('There are a total of ', COUNT(*) , ' ', LOWER(Occupation), 's.') AS OccupationCount
FROM OCCUPATIONS
GROUP BY Occupation
ORDER BY COUNT(*) ASC, LOWER(Occupation) ASC;
```

Q. Pivot the Occupation column in OCCUPATIONS so that each Name is sorted alphabetically and displayed underneath its corresponding Occupation. The output column headers should be Doctor, Professor, Singer, and Actor, respectively.
A.

```sql
SELECT
    MAX(CASE WHEN Occupation = 'Doctor' THEN Name END) AS Doctor,
    MAX(CASE WHEN Occupation = 'Professor' THEN Name END) AS Professor,
    MAX(CASE WHEN Occupation = 'Singer' THEN Name END) AS Singer,
    MAX(CASE WHEN Occupation = 'Actor' THEN Name END) AS Actor
FROM (
    select Name, Occupation,
        ROW_NUMBER() OVER (PARTITION BY Occupation ORDER BY Name) as rn
    FROM Occupations
)
AS PivotTable
GROUP BY rn
ORDER BY rn;
```

Q. You are given a table, BST, containing two columns: N and P, where N represents the value of a node in Binary Tree, and P is the parent of N.
Write a query to find the node type of Binary Tree ordered by the value of the node. Output one of the following for each node:

Root: If node is root node.
Leaf: If node is leaf node.
Inner: If node is neither root nor leaf node.
A.

```sql
SELECT
    N as NodeValue,
    CASE
        WHEN P is null THEN "Root"
        WHEN N not in (
            SELECT DISTINCT P FROM BST WHERE P IS NOT NULL
        ) THEN "Leaf"
        ELSE
            "Inner"
    END as NodeType
FROM BST
ORDER BY NodeValue;
```

Q. Query a count of the number of cities in CITY having a Population larger than 100000.
A.

```sql
select count(*) from CITY where POPULATION > 100000;
```

Q. Query the total population of all cities in CITY where District is California.
A.

```sql
select sum(POPULATION) from CITY where DISTRICT = "California";
```

Q. Query the average population of all cities in CITY where District is California.
A.

```sql
SELECT AVG(POPULATION) FROM CITY WHERE DISTRICT = "California";
```

Q. Query the average population for all cities in CITY, rounded down to the nearest integer.
A.

```sql
SELECT ROUND(AVG(POPULATION)) FROM CITY;
```

Q. Query the sum of the populations for all Japanese cities in CITY. The COUNTRYCODE for Japan is JPN.
A.

```sql
SELECT SUM(POPULATION) FROM CITY WHERE COUNTRYCODE = "JPN";
```

Q. Query the sum of the populations for all Japanese cities in CITY. The COUNTRYCODE for Japan is JPN.
A.

```sql
select sum(POPULATION) FROM CITY WHERE COUNTRYCODE = "JPN";
```

Q. Query the difference between the maximum and minimum populations in CITY.
A.

```sql
SELECT MAX(POPULATION) - MIN(POPULATION) FROM CITY;
```

Q. Samantha was tasked with calculating the average monthly salaries for all employees in the EMPLOYEES table, but did not realize her keyboard's key was broken until after completing the calculation. She wants your help finding the difference between her miscalculation (using salaries with any zeros removed), and the actual average salary.

Write a query calculating the amount of error (i.e.: (actual - miscalculated) average monthly salaries), and round it up to the next integer.
A.

```sql
SELECT CEIL(AVG(Salary) - AVG(CAST(REPLACE(Salary, '0', '') AS UNSIGNED))) AS error
FROM EMPLOYEES;
```

Q. We define an employee's total earnings to be their monthly salary X months worked, and the maximum total earnings to be the maximum total earnings for any employee in the Employee table. Write a query to find the maximum total earnings for all employees as well as the total number of employees who have maximum total earnings. Then print these values as 2 space-separated integers.
A.

```sql
SELECT MAX(total_earnings) AS max_total_earnings, COUNT(*) AS employee_count
FROM (
    SELECT salary * months AS total_earnings
    FROM EMPLOYEE
) AS earnings_table
WHERE total_earnings = (SELECT MAX(salary * months) FROM EMPLOYEE);
```

Q. Query the following two values from the STATION table:

The sum of all values in LAT_N rounded to a scale of 2 decimal places.
The sum of all values in LONG_W rounded to a scale of 2 decimal places.
A.

```sql
SELECT ROUND(SUM(LAT_N), 2), ROUND(SUM(LONG_W), 2) FROM STATION;
```

Q. Query the sum of Northern Latitudes (LAT_N) from STATION having values greater than 38.7880 and less than 137.2345. Truncate your answer to decimal places.
A.

```sql
SELECT ROUND(SUM(LAT_N), 4) FROM STATION WHERE LAT_N > 38.7880 AND LAT_N < 137.2345;
```

Q. Query the Western Longitude (LONG_W) for the largest Northern Latitude (LAT_N) in STATION that is less than 137.2345. Round your answer to 4 decimal places.
A.

```sql
SELECT ROUND(LONG_W, 4)
FROM STATION
WHERE LAT_N = (
    SELECT MAX(LAT_N)
    FROM STATION
    WHERE LAT_N < 137.2345
);
```

Q. Query the smallest Northern Latitude (LAT_N) from STATION that is greater than 38.7780. Round your answer to 4 decimal places.
A.

```sql
SELECT ROUND(MIN(LAT_N), 4) FROM STATION WHERE LAT_N > 38.7780;
```

Q. Query the Western Longitude (LONG_W)where the smallest Northern Latitude (LAT_N) in STATION is greater than 38.7780. Round your answer to 4 decimal places.
A.

```sql
SELECT ROUND(LONG_W, 4) FROM STATION WHERE LAT_N = (SELECT MIN(LAT_N) FROM STATION WHERE LAT_N > 38.7780);
```

Q. Consider P1(a, b) and P2(c, d) to be two points on a 2D plane.

a happens to equal the minimum value in Northern Latitude (LAT_N in STATION).
b happens to equal the minimum value in Western Longitude (LONG_W in STATION).
c happens to equal the maximum value in Northern Latitude (LAT_N in STATION).
d happens to equal the maximum value in Western Longitude (LONG_W in STATION).
Query the Manhattan Distance between points P1 and P2 and round it to a scale of 4 decimal places.
A.

```sql
SELECT ROUND(ABS(MAX(LAT_N) - MIN(LAT_N)) + ABS(MAX(LONG_W) - MIN(LONG_W)), 4) FROM STATION;
```

Q. Consider P1(A, C) and P2(B, D) to be two points on a 2D plane where (A, B) are the respective minimum and maximum values of Northern Latitude (LAT_N) and (C, D) are the respective minimum and maximum values of Western Longitude (LONG_W) in STATION.

Query the Euclidean Distance between points P1 and P2 and format your answer to display 4 decimal digits.
A.

```sql
SELECT ROUND(SQRT(POWER(MIN(LAT_N) - MAX(LAT_N), 2) + POWER(MIN(LONG_W) - MAX(LONG_W), 2)), 4) AS euclidean_distance
FROM STATION;

```
