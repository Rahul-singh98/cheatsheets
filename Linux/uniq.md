# uniq command

## Description
uniq - report repeated lines in a file
The `uniq` command in Linux is used to filter out or identify unique lines in a file. It works on **adjacent** duplicate lines, so input often needs to be sorted before using `uniq`. 

---

## Options
-u     Print unique lines.

-d     Print (one copy of) duplicated lines.

-c     Prefix a repetition count and a tab to each output line.  Implies -u and -d.

-num   The  first num fields together with any blanks before each are ignored.  A field is
        defined as a string of non-space, non-tab characters separated by tabs  and  spaces
        from its neighbors.

+num   The first num characters are ignored.  Fields are skipped before characters.


---

### **Basic Usage**

#### 1. **Remove Adjacent Duplicates**
```bash
uniq filename
```
Filters out adjacent duplicate lines in the file `filename`.

Input (`file.txt`):
```
apple
apple
banana
cherry
cherry
```

Command:
```bash
uniq file.txt
```

Output:
```
apple
banana
cherry
```

---

### **Examples of `uniq` with Options**

#### 2. **Count the Occurrences of Each Line**
```bash
uniq -c filename
```

Input (`file.txt`):
```
apple
apple
banana
cherry
cherry
```

Command:
```bash
uniq -c file.txt
```

Output:
```
   2 apple
   1 banana
   2 cherry
```

Explanation:
- `-c`: Prefixes each unique line with its count.

---

#### 3. **Display Only Duplicates**
```bash
uniq -d filename
```

Input (`file.txt`):
```
apple
apple
banana
cherry
cherry
```

Command:
```bash
uniq -d file.txt
```

Output:
```
apple
cherry
```

Explanation:
- `-d`: Displays only duplicate lines.

---

#### 4. **Display Only Unique Lines**
```bash
uniq -u filename
```

Input (`file.txt`):
```
apple
apple
banana
cherry
cherry
```

Command:
```bash
uniq -u file.txt
```

Output:
```
banana
```

Explanation:
- `-u`: Displays lines that are not repeated.

---

#### 5. **Ignore Case While Comparing**
```bash
uniq -i filename
```

Input (`file.txt`):
```
Apple
apple
BANANA
banana
CHERRY
cherry
```

Command:
```bash
uniq -i file.txt
```

Output:
```
Apple
BANANA
CHERRY
```

Explanation:
- `-i`: Performs case-insensitive comparison.

---

#### 6. **Skip Fields While Comparing**
```bash
uniq -f 1 filename
```

Input (`file.txt`):
```
1 apple
1 apple
2 banana
3 cherry
3 cherry
```

Command:
```bash
uniq -f 1 file.txt
```

Output:
```
1 apple
2 banana
3 cherry
```

Explanation:
- `-f 1`: Ignores the first field while comparing lines.

---

#### 7. **Skip Characters While Comparing**
```bash
uniq -s 2 filename
```

Input (`file.txt`):
```
xxapple
xxapple
yybanana
zzcherry
zzcherry
```

Command:
```bash
uniq -s 2 file.txt
```

Output:
```
xxapple
yybanana
zzcherry
```

Explanation:
- `-s 2`: Skips the first 2 characters while comparing lines.

---

#### 8. **Limit Comparison to Specific Characters**
```bash
uniq -w 5 filename
```

Input (`file.txt`):
```
applepie
applesauce
banana
bananabread
cherry
cherrycake
```

Command:
```bash
uniq -w 5 file.txt
```

Output:
```
applepie
banana
cherry
```

Explanation:
- `-w 5`: Compares only the first 5 characters of each line.

---

#### 9. **Combine Options**
```bash
uniq -c -i -w 5 filename
```

Input (`file.txt`):
```
Applepie
Applesauce
BANANA
Bananabread
Cherrycake
CHERRYTART
```

Command:
```bash
uniq -c -i -w 5 file.txt
```

Output:
```
   2 Applepie
   2 BANANA
   2 Cherrycake
```

Explanation:
- `-c`: Counts occurrences.
- `-i`: Ignores case.
- `-w 5`: Compares only the first 5 characters.

---

### **Advanced Use Cases**

#### 10. **Sort and Use `uniq`**
Since `uniq` works on adjacent lines, use it with `sort` for unordered input.

Input (`file.txt`):
```
banana
apple
cherry
banana
apple
cherry
```

Command:
```bash
sort file.txt | uniq
```

Output:
```
apple
banana
cherry
```

---

#### 11. **Find Repeated Lines and Their Counts**
```bash
sort filename | uniq -c | sort -nr
```

Explanation:
1. `sort filename`: Sort the file to group duplicates together.
2. `uniq -c`: Count occurrences of each line.
3. `sort -nr`: Sort by frequency in descending order.

---

#### 12. **Output Only the First Occurrence of Each Line**
```bash
uniq filename
```

Input (`file.txt`):
```
apple
apple
banana
apple
cherry
cherry
```

Command:
```bash
uniq file.txt
```

Output:
```
apple
banana
apple
cherry
```

---

#### 13. **Filter and Save Unique Lines to a File**
```bash
uniq -u filename > unique_lines.txt
```

Explanation:
- `uniq -u`: Finds lines that are not repeated.
- `> unique_lines.txt`: Redirects output to a new file.

---

#### 14. **Identify Duplicate Lines with Skipped Fields**
```bash
uniq -d -f 1 filename
```

Input (`file.txt`):
```
A apple
A apple
B banana
C cherry
C cherry
```

Command:
```bash
uniq -d -f 1 file.txt
```

Output:
```
A apple
C cherry
```

---

#### 15. **Highlight Differences Using Colors**
For better visualization, combine `uniq` with `grep`:
```bash
uniq -u filename | grep --color=always "pattern"
```

---

### Tips for Using `uniq` Effectively:
1. Always `sort` the file before using `uniq` unless duplicates are already adjacent.
2. Combine `uniq` with redirection (`>` or `>>`) to save the output.
3. Use `uniq` with `awk` or `sed` for complex transformations.

Let me know if you'd like further clarification or additional examples!