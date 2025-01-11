# strings command

## Description
Strings  finds  and  prints strings containing 6 or more consecutive printable UTF-encoded
characters in a (typically) binary file, default standard input.  Printable characters are
taken  to  be  ASCII  characters  from  blank  through  tilde (hexadecimal 20 through 7E),
inclusive, and all other characters from value 00A0 to FFFF.  Strings reports the  decimal
offset  within  the  file  at  which  the string starts and the text of the string. If the
string is longer than 70 runes the line is terminated by three dots and  the  printing  is
resumed on the next line with the offset of the continuation line.

The `strings` command is a Unix/Linux utility used to extract and display printable character sequences (strings) from binary files or other types of non-text files. Let's look at some examples for the `strings` command, covering all its commonly used options.

---

## Examples
### **1. Basic Usage**
**Command:**
```bash
strings file
```
**Description:** Extracts all printable strings (default minimum length: 4 characters) from the file.

**Example:**
```bash
strings /bin/ls
```
**Output:**
Extracts and prints readable strings, such as error messages, file paths, or commands embedded in the `ls` binary.

---

### **2. Specifying the Minimum String Length (-n)**
**Command:**
```bash
strings -n <length> file
```
**Description:** Extracts printable strings with a minimum length of `<length>`.

**Example:**
```bash
strings -n 8 /bin/ls
```
**Output:**
Displays only strings that are at least 8 characters long.

---

### **3. Displaying Offset Values (-t)**
**Command:**
```bash
strings -t <format> file
```
**Description:** Displays the offset of each string in the file. The format can be:
- `d`: Decimal
- `o`: Octal
- `x`: Hexadecimal

**Example:**
```bash
strings -t x /bin/ls
```
**Output:**
Displays each string in the file with its offset in hexadecimal format.

---

### **4. Searching in a Specific Data Section (-d)**
**Command:**
```bash
strings -d file
```
**Description:** Extracts strings only from initialized and loaded sections of the binary (data sections).

**Example:**
```bash
strings -d /bin/ls
```
**Output:**
Filters strings that are likely part of initialized data in the binary.

---

### **5. Using Custom Encoding (-e)**
**Command:**
```bash
strings -e <encoding> file
```
**Description:** Specifies the character encoding. Options include:
- `s`: Single-byte encoding (default)
- `b`: Big-endian UTF-16
- `l`: Little-endian UTF-16

**Example 1 (Big-endian UTF-16):**
```bash
strings -e b binaryfile
```

**Example 2 (Little-endian UTF-16):**
```bash
strings -e l binaryfile
```
**Output:**
Displays strings based on the specified encoding.

---

### **6. Scanning Standard Input**
**Command:**
```bash
strings
```
**Description:** Reads from standard input and extracts strings.

**Example:**
```bash
cat binaryfile | strings
```
**Output:**
Displays readable strings from the data piped into `strings`.

---

### **7. Combining Options**
**Command:**
```bash
strings -n <length> -t <format> file
```
**Description:** Combines options to extract strings with a specific minimum length and display their offsets.

**Example:**
```bash
strings -n 6 -t d /bin/ls
```
**Output:**
Displays strings with at least 6 characters and their decimal offsets.

---

### **8. Help Option**
**Command:**
```bash
strings --help
```
**Description:** Displays a summary of `strings` options and usage.

---

### Example with Explanation

Let's analyze a command:
```bash
strings -n 5 -t x -e b binaryfile
```

- `-n 5`: Extract strings with a minimum length of 5 characters.
- `-t x`: Show offsets in hexadecimal format.
- `-e b`: Use big-endian UTF-16 encoding.
- `binaryfile`: The file being analyzed.

