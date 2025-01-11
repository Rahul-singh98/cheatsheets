# Grep Command

## Description
Grep searches the input files (standard input default) for lines that match the pattern, a
regular expression as defined in regexp(7) with the addition of a newline character as  an
alternative  (substitute  for |) with lowest precedence.  Normally, each line matching the
pattern is `selected', and each selected line is  copied  to  the  standard  output.   The
options are

## Options
-c     Print only a count of matching lines.
-h     Do not print file name tags (headers) with output lines.
-e     The following argument is taken as a pattern.  This option makes it easy to specify
        patterns that might confuse argument parsing, such as -n.
-i     Ignore alphabetic case distinctions.  The implementation folds into lower case  all
        letters  in the pattern and input before interpretation.  Matched lines are printed
        in their original form.
-l     (ell) Print the names of files with selected lines; don't print the lines.
-L     Print the names of files with no selected lines; the converse of -l.
-n     Mark each printed line with its line number counted in its file.
-s     Produce no output, but return status.
-v     Reverse: print lines that do not match the pattern.
-f     The pattern argument is the name of a file containing regular expressions  one  per
        line.
-b     Don't buffer the output: write each output line as soon as it is discovered.

Output  lines  are  tagged by file name when there is more than one input file.  (To force
this tagging, include /dev/null as a file name argument.)

Care should be taken when using the shell metacharacters $*[^|()=\ and newline in pattern;
it  is  safest  to  enclose  the  entire expression in single quotes '...'.  An expression
starting with '*' will treat the rest of the expression as literal characters.

G invokes grep with -n and forces tagging of output lines by file name.  If no  files  are
listed, it searches all files matching

        *.C *.b *.c *.h *.m *.cc *.java *.cgi *.pl *.py *.tex *.ms


## Example: Searching with `grep`

### 1. **Basic Search**
```bash
grep "pattern" filename
```
Searches for lines containing `pattern` in the file `filename`.

### 2. **Case-Insensitive Search**
```bash
grep -i "pattern" filename
```
Searches for `pattern` in a case-insensitive manner.

### 3. **Recursive Search**
```bash
grep -r "pattern" directory/
```
Searches recursively for `pattern` in all files under `directory/`.

### 4. **Display Line Numbers**
```bash
grep -n "pattern" filename
```
Displays line numbers for each match.

### 5. **Invert Match**
```bash
grep -v "pattern" filename
```
Displays lines that **do not** contain the `pattern`.

### 6. **Match Whole Words**
```bash
grep -w "word" filename
```
Matches only whole words. For example, it will match `word` but not `wording`.

### 7. **Count Matches**
```bash
grep -c "pattern" filename
```
Counts the number of lines containing `pattern`.

### 8. **Multiple Patterns**
```bash
grep -e "pattern1" -e "pattern2" filename
```
Searches for lines containing either `pattern1` or `pattern2`.

### 9. **With Line Context (Before and After Matches)**
```bash
grep -C 3 "pattern" filename
```
Displays 3 lines before and after each match.

### 10. **Search Using Regular Expressions**
```bash
grep -E "pattern1|pattern2" filename
```
Uses extended regular expressions to match `pattern1` or `pattern2`.

### 11. **Search in Multiple Files**
```bash
grep "pattern" file1 file2 file3
```
Searches for `pattern` in multiple files and prints the filename with the match.

### 12. **Highlight Matches**
```bash
grep --color=always "pattern" filename
```
Highlights the matching parts of the lines.

### 13. **Output Only the Matching Part of a Line**
```bash
grep -o "pattern" filename
```
Outputs only the part of each line that matches `pattern`.

### 14. **Suppress Errors for Nonexistent or Unreadable Files**
```bash
grep -s "pattern" filename
```
Suppresses error messages if a file is missing or cannot be read.

### 15. **Exclude Certain Files**
```bash
grep --exclude="*.log" -r "pattern" directory/
```
Recursively searches for `pattern`, excluding files with a `.log` extension.

### 16. **Only Show Filenames with Matches**
```bash
grep -l "pattern" filename
```
Lists only the filenames that contain the `pattern`.

### 17. **Show Files Without Matches**
```bash
grep -L "pattern" filename
```
Lists only the filenames that **do not** contain the `pattern`.

### 18. **Binary File Suppression**
```bash
grep --binary-files=without-match "pattern" filename
```
Ignores binary files and treats them as if they do not match.

### 19. **Combine Options**
```bash
grep -rinw --color=always "pattern" directory/
```
- `-r`: Recursive search.
- `-i`: Case-insensitive.
- `-n`: Show line numbers.
- `-w`: Match whole words.
- `--color=always`: Highlight matches.

### 20. **Filter From Another Command**
```bash
ps aux | grep "process_name"
```
Filters the output of `ps aux` to show only lines containing `process_name`.

### 21. **Ignore Case and Search for Multiple Patterns**
```bash
grep -iE "pattern1|pattern2" filename
```
Combines `-i` for case-insensitivity and `-E` for extended regular expressions.
