In MySQL, `RANK()`, `DENSE_RANK()`, and `ROW_NUMBER()` are **window functions** used to assign a unique rank or number to rows within a result set. These functions are particularly useful when working with ordered datasets where you want to number or rank rows based on specific criteria (such as salary, score, etc.).

### 1. **`ROW_NUMBER()`**:
- **Purpose**: Assigns a unique sequential number to each row in a result set, starting from `1` for the first row.
- **Behavior**: If two or more rows have the same values, they will still receive different row numbers.
  
### Syntax:
```sql
ROW_NUMBER() OVER (PARTITION BY partition_column ORDER BY order_column)
```

- **`PARTITION BY`**: (Optional) Divides the result set into partitions based on the values of one or more columns. The row numbering restarts for each partition.
- **`ORDER BY`**: Specifies how the rows within each partition are ordered.

### Example:
```sql
SELECT
    employee_id,
    salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num
FROM Employees;
```

- **Result**:
| employee_id | salary | row_num |
|-------------|--------|---------|
| 101         | 90000  | 1       |
| 102         | 85000  | 2       |
| 103         | 85000  | 3       |
| 104         | 80000  | 4       |

### 2. **`RANK()`**:
- **Purpose**: Assigns a rank to each row, with the same rank given to rows with identical values. However, if two rows have the same rank, the next rank is skipped.
- **Behavior**: It introduces **gaps** in the ranking when there are ties.

### Syntax:
```sql
RANK() OVER (PARTITION BY partition_column ORDER BY order_column)
```

### Example:
```sql
SELECT
    employee_id,
    salary,
    RANK() OVER (ORDER BY salary DESC) AS rank
FROM Employees;
```

- **Result**:
| employee_id | salary | rank |
|-------------|--------|------|
| 101         | 90000  | 1    |
| 102         | 85000  | 2    |
| 103         | 85000  | 2    |
| 104         | 80000  | 4    |

- Here, employee `102` and `103` have the same salary, so they share the same rank (`2`). The next rank is `4`, skipping `3`.

### 3. **`DENSE_RANK()`**:
- **Purpose**: Similar to `RANK()`, but unlike `RANK()`, `DENSE_RANK()` does **not skip ranks** after ties.
- **Behavior**: It assigns the same rank for identical values, but the next rank continues in sequence without gaps.

### Syntax:
```sql
DENSE_RANK() OVER (PARTITION BY partition_column ORDER BY order_column)
```

### Example:
```sql
SELECT
    employee_id,
    salary,
    DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank
FROM Employees;
```

- **Result**:
| employee_id | salary | dense_rank |
|-------------|--------|------------|
| 101         | 90000  | 1          |
| 102         | 85000  | 2          |
| 103         | 85000  | 2          |
| 104         | 80000  | 3          |

- Here, employees `102` and `103` still have the same salary and rank (`2`), but the next rank is `3` (no gaps).

---

### Differences:
| Function       | Description                                   | Handles Ties           | Result Pattern        |
|----------------|-----------------------------------------------|------------------------|-----------------------|
| `ROW_NUMBER()` | Assigns a unique sequential number to each row | Ties are ignored (no special handling) | Unique numbers for all rows |
| `RANK()`       | Assigns rank, but skips ranks after ties      | Skips ranks after a tie | Ranks with gaps       |
| `DENSE_RANK()` | Assigns rank, no gaps after ties              | Does not skip ranks after a tie | Continuous rank sequence |

---

### Practical Use Cases:
1. **`ROW_NUMBER()`**:
   - Useful when you need a strict sequential numbering of rows, such as when displaying paginated results.
   
2. **`RANK()`**:
   - Suitable when you want to assign a rank to values but account for gaps in ranking due to ties. For example, in a competition where the next position after a tie would skip ranks.

3. **`DENSE_RANK()`**:
   - Useful when you need to rank values and do not want to skip ranks after ties. This can be used in leaderboards where consecutive ranking is necessary.

---

### Example with Partitioning:
If you want to rank employees by salary **within each department**, you can partition by department:

```sql
SELECT
    departmentid,
    employee_id,
    salary,
    RANK() OVER (PARTITION BY departmentid ORDER BY salary DESC) AS rank
FROM Employees;
```

This would rank employees within each department based on their salary, with the ranks restarting for each department.