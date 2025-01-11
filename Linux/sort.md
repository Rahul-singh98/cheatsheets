# sort command

## Description
sort — sort, merge, or sequence check text files
The sort utility shall perform one of the following functions:

    1. Sort  lines  of  all  the  named  files together and write the result to the specified
    output.

    2. Merge lines of all the named (presorted) files together and write the  result  to  the
    specified output.

    3. Check that a single input file is correctly presorted.

Comparisons shall be based on one or more sort keys extracted from each line of input (or,
if no sort keys are specified, the entire line up to, but not including,  the  terminating
<newline>),  and shall be performed using the collating sequence of the current locale. If
this collating sequence does not have a total ordering of all  characters  (see  the  Base
Definitions  volume  of  POSIX.1‐2017, Section 7.3.2, LC_COLLATE), any lines of input that
collate equally should be further compared byte-by-byte using the collating  sequence  for
the POSIX locale.

## Options
-c        Check that the single input file is ordered as specified by  the  arguments  and
            the  collating  sequence  of  the  current  locale.  Output shall not be sent to
            standard output. The exit code  shall  indicate  whether  or  not  disorder  was
            detected  or  an  error  occurred. If disorder (or, with -u, a duplicate key) is
            detected, a warning message shall be sent to standard error indicating where the
            disorder or duplicate key was found.

-C        Same as -c, except that a warning message shall not be sent to standard error if
            disorder or, with -u, a duplicate key is detected.

-m        Merge only; the input file shall be assumed to be already sorted.

-o output Specify the name of an output file to be used instead of  the  standard  output.
            This file can be the same as one of the input files.

-u        Unique:  suppress  all  but one in each set of lines having equal keys.  If used
            with the -c option, check that there  are  no  lines  with  duplicate  keys,  in
            addition to checking that the input file is sorted.

The  following  options  shall  override the default ordering rules. When ordering options
appear independent of any key field specifications, the  requested  field  ordering  rules
shall  be applied globally to all sort keys. When attached to a specific key (see -k), the
specified ordering options shall override all global ordering options for that key.

-d        Specify that only <blank> characters and alphanumeric characters,  according  to
            the  current  setting  of  LC_CTYPE,  shall  be  significant in comparisons. The
            behavior is undefined for a sort key to which -i or -n also applies.

-f        Consider all lowercase characters that have uppercase equivalents, according  to
            the current setting of LC_CTYPE, to be the uppercase equivalent for the purposes
            of comparison.

-i        Ignore all characters that are non-printable, according to the  current  setting
            of  LC_CTYPE.   The  behavior  is  undefined  for  a  sort key for which -n also
            applies.

-n        Restrict the sort key to an  initial  numeric  string,  consisting  of  optional
            <blank>  characters,  optional <hyphen-minus> character, and zero or more digits
            with an optional radix character and thousands separators  (as  defined  in  the
            current  locale),  which  shall  be  sorted  by arithmetic value. An empty digit
            string shall be treated as zero. Leading zeros and  signs  on  zeros  shall  not
            affect ordering.

-r        Reverse the sense of comparisons.

The treatment of field separators can be altered using the options:

-b        Ignore  leading  <blank>  characters  when  determining  the starting and ending
            positions of a restricted sort key. If the -b option  is  specified  before  the
            first -k option, it shall be applied to all -k options. Otherwise, the -b option
            can be attached independently  to  each  -k  field_start  or  field_end  option-
            argument (see below).

-t char   Use  char  as  the field separator character; char shall not be considered to be
            part of a field (although it can be included in a sort key). Each occurrence  of
            char  shall  be significant (for example, <char><char> delimits an empty field).
            If -t is not specified, <blank>  characters  shall  be  used  as  default  field
            separators; each maximal non-empty sequence of <blank> characters that follows a
            non-<blank> shall be a field separator.

Sort keys can be specified using the options:

-k keydef The keydef argument is a restricted sort key field  definition.  The  format  of
            this definition is:

                field_start[type][,field_end[type]]

            where  field_start  and  field_end define a key field restricted to a portion of
            the line (see the EXTENDED  DESCRIPTION  section),  and  type  is  one  or  more
            modifiers  from  the  list  of characters 'b', 'd', 'f', 'i', 'n', 'r'.  The 'b'
            modifier shall  behave  like  the  -b  option,  but  shall  apply  only  to  the
            field_start  or  field_end  to  which  it is attached. The other modifiers shall
            behave like the corresponding options, but shall apply only to the key field  to
            which  they  are  attached;  they  shall  have  this  effect  if  specified with
            field_start, field_end, or both. If any modifier is attached to a field_start or
            to  a  field_end, no option shall apply to either. Implementations shall support
            at least nine occurrences of the  -k  option,  which  shall  be  significant  in
            command  line  order.  If  no  -k option is specified, a default sort key of the
            entire line shall be used.

            When there are multiple key fields, later keys shall be compared only after  all
            earlier  keys  compare equal. Except when the -u option is specified, lines that
            otherwise compare equal shall be ordered as if none of the options -d,  -f,  -i,
            -n,  or  -k  were present (but with -r still in effect, if it was specified) and
            with all bytes in the lines significant to the comparison. The  order  in  which
            lines that still compare equal are written is unspecified.


### **Basic Usage**
```bash
sort filename
```
Sorts the contents of `filename` in ascending order.

---

### **Examples of `sort` with Options**

#### 1. **Sort in Reverse Order**
```bash
sort -r filename
```
Sorts the file contents in descending order.

---

#### 2. **Sort by Numeric Values**
```bash
sort -n filename
```
Sorts lines based on numeric values. For example:
Input:
```
10
2
30
```
Output:
```
2
10
30
```

---

#### 3. **Sort with Unique Entries**
```bash
sort -u filename
```
Removes duplicate lines while sorting.

---

#### 4. **Sort and Output to a New File**
```bash
sort filename -o sorted_filename
```
Sorts the content of `filename` and writes the output to `sorted_filename`.

---

#### 5. **Sort Based on a Specific Field**
```bash
sort -k 2 filename
```
Sorts based on the second column or field in a file. Useful for files with tabular data.

Input (`filename`):
```
Alice 25
Bob 22
Charlie 30
```
Command:
```bash
sort -k 2 filename
```
Output:
```
Bob 22
Alice 25
Charlie 30
```

---

#### 6. **Specify a Delimiter**
```bash
sort -t ',' -k 2 filename
```
Specifies a delimiter (comma in this case) and sorts based on the second column.

Input (`filename`):
```
Alice,25
Bob,22
Charlie,30
```
Command:
```bash
sort -t ',' -k 2 filename
```
Output:
```
Bob,22
Alice,25
Charlie,30
```

---

#### 7. **Sort in Human-Readable Format**
```bash
sort -h filename
```
Sorts human-readable numbers, such as sizes with `K`, `M`, `G`.

Input:
```
10K
5M
2G
100
```
Command:
```bash
sort -h filename
```
Output:
```
100
10K
5M
2G
```

---

#### 8. **Ignore Case While Sorting**
```bash
sort -f filename
```
Sorts in a case-insensitive manner.

Input:
```
apple
Banana
cherry
Apple
```
Command:
```bash
sort -f filename
```
Output:
```
apple
Apple
Banana
cherry
```

---

#### 9. **Randomize Lines**
```bash
sort -R filename
```
Randomizes the order of lines in a file.

---

#### 10. **Sort by Month Names**
```bash
sort -M filename
```
Sorts by month names (e.g., Jan, Feb, Mar).

Input:
```
March
January
February
```
Command:
```bash
sort -M filename
```
Output:
```
January
February
March
```

---

#### 11. **Combine Multiple Options**
```bash
sort -t ',' -k 3 -n -r filename
```
- `-t ','`: Use a comma as the delimiter.
- `-k 3`: Sort by the third column.
- `-n`: Sort numerically.
- `-r`: Sort in reverse order.

---

#### 12. **Sort While Maintaining Stability**
```bash
sort --stable -k 2 filename
```
Ensures that lines with equal keys maintain their original order.

---

#### 13. **Check If a File is Already Sorted**
```bash
sort -c filename
```
Checks if the file is sorted. If it’s not, it returns an error.

---

#### 14. **Suppress Warnings for Binary Files**
```bash
sort --quiet filename
```
Suppresses warnings if binary files are encountered.

---

#### 15. **Sort by Multiple Keys**
```bash
sort -k 2,2 -k 3n filename
```
- `-k 2,2`: Sort by the second column.
- `-k 3n`: Within lines with the same second column, sort numerically by the third column.

Input (`filename`):
```
Alice 25 100
Bob 22 200
Alice 25 50
```
Command:
```bash
sort -k 2,2 -k 3n filename
```
Output:
```
Bob 22 200
Alice 25 50
Alice 25 100
```

---

#### 16. **Sort with Field Separator and Reverse Order**
```bash
sort -t ':' -k 3 -r filename
```
Sorts using `:` as the delimiter and in reverse order based on the third column.

---

### **17. Sort by Date**

Input (`dates.txt`):
```
2023-11-15
2021-01-10
2025-05-20
2022-03-25
```

Command:
```bash
sort -k1,1 -n dates.txt
```

Output:
```
2021-01-10
2022-03-25
2023-11-15
2025-05-20
```

Explanation:
- `-k1,1`: Sort by the first column (entire line since it has only one column).
- `-n`: Sort numerically (year, month, day order).

---

### **18. Sort IP Addresses**

Input (`ips.txt`):
```
192.168.1.2
10.0.0.1
172.16.0.5
192.168.1.1
```

Command:
```bash
sort -t '.' -k 1,1n -k 2,2n -k 3,3n -k 4,4n ips.txt
```

Output:
```
10.0.0.1
172.16.0.5
192.168.1.1
192.168.1.2
```

Explanation:
- `-t '.'`: Use `.` as the delimiter.
- `-k 1,1n -k 2,2n -k 3,3n -k 4,4n`: Sort numerically by each segment of the IP address.

---

### **19. Sort by File Size**

Input (`sizes.txt`):
```
15K
5G
100M
1T
```

Command:
```bash
sort -h sizes.txt
```

Output:
```
15K
100M
5G
1T
```

Explanation:
- `-h`: Sorts in human-readable format, handling size suffixes like K, M, G, T, etc.

---

### **20. Sort by Column Range**

Input (`data.txt`):
```
Alice 25 150
Bob 30 180
Charlie 22 160
Diana 25 140
```

Command:
```bash
sort -k 2,3 -n data.txt
```

Output:
```
Charlie 22 160
Diana 25 140
Alice 25 150
Bob 30 180
```

Explanation:
- `-k 2,3`: Sort based on columns 2 and 3 together.
- `-n`: Sort numerically.

---

### **21. Case-Insensitive Sort with Stability**

Input (`names.txt`):
```
apple
Banana
Cherry
apple
```

Command:
```bash
sort -f --stable names.txt
```

Output:
```
apple
apple
Banana
Cherry
```

Explanation:
- `-f`: Ignore case.
- `--stable`: Preserve the order of identical elements.

---

### **22. Sort Words and Remove Duplicates**

Input (`words.txt`):
```
apple
banana
cherry
apple
banana
```

Command:
```bash
sort -u words.txt
```

Output:
```
apple
banana
cherry
```

Explanation:
- `-u`: Remove duplicates.

---

### **23. Sort Log Files by Timestamp**

Input (`log.txt`):
```
INFO 2023-01-01 Event A
ERROR 2022-12-31 Event B
WARN 2023-01-02 Event C
```

Command:
```bash
sort -k 2 log.txt
```

Output:
```
ERROR 2022-12-31 Event B
INFO 2023-01-01 Event A
WARN 2023-01-02 Event C
```

Explanation:
- `-k 2`: Sort by the second column (dates).

---

### **24. Sort Numeric Fields with Thousands Separators**

Input (`sales.txt`):
```
$1,000
$10,000
$5,000
$100
```

Command:
```bash
sort -t ',' -k 1,1 -k 2,2n sales.txt
```

Output:
```
$100
$1,000
$5,000
$10,000
```

Explanation:
- `-t ','`: Use `,` as a delimiter.
- `-k 1,1`: Sort by the first part (`$` symbol or prefix).
- `-k 2,2n`: Sort numerically by the number after the comma.

---

### **25. Sort Large Files**

If you’re sorting a very large file, you can improve performance by specifying the amount of memory to use:
```bash
sort --buffer-size=50M largefile.txt
```

Explanation:
- `--buffer-size=50M`: Allocates 50MB of memory for sorting to optimize performance.

---

### **26. Sort and Remove Lines with Blank Fields**

Input (`data.txt`):
```
Alice 25
Bob
Charlie 22
```

Command:
```bash
sort -b -u data.txt
```

Output:
```
Alice 25
Bob
Charlie 22
```

Explanation:
- `-b`: Ignores leading spaces.
- `-u`: Removes duplicate blank lines.

---

### **27. Sort by Multiple Delimiters**

Input (`multi-delim.txt`):
```
John;25|Developer
Alice;30|Designer
Bob;22|Manager
```

Command:
```bash
sort -t ';' -k 2,2 -t '|' -k 3 multi-delim.txt
```

Output:
```
Bob;22|Manager
John;25|Developer
Alice;30|Designer
```

Explanation:
- Sort by the second column (age), and within equal ages, sort by the third column (job title).

---

### **28. Sort Based on Specific Character Range**

Input (`chars.txt`):
```
abcdef
ghijkl
mnopqr
```

Command:
```bash
sort -k 1.2,1.5 chars.txt
```

Output:
```
bcdef
hijkl
nopqr
```

Explanation:
- `-k 1.2,1.5`: Sort based on characters 2 to 5 in the first field.

---

### **29. Ignore Leading Whitespace**

Input (`whitespace.txt`):
```
   Apple
  Banana
 Cherry
```

Command:
```bash
sort -b whitespace.txt
```

Output:
```
   Apple
  Banana
 Cherry
```

Explanation:
- `-b`: Ignores leading spaces.

---

### **30. Parallel Sort for Large Files**

Command:
```bash
sort --parallel=4 largefile.txt
```

Explanation:
- `--parallel=4`: Uses 4 threads for sorting to improve performance for large files.
