# tr command

## Description
Tr  copies  the  standard  input  to  the standard output with substitution or deletion of
selected characters (runes).  Input characters  found  in  string1  are  mapped  into  the
corresponding  characters of string2.  When string2 is short it is padded to the length of
string1 by duplicating its last character.

The `tr` command in Unix/Linux is used to translate or delete characters from standard input. It is commonly used for tasks such as replacing, removing, or compressing characters.

---

## Options
-c     Complement  string1:  replace it with a lexicographically ordered list of all other
            characters.

-d     Delete from input all characters in string1.

-s     Squeeze repeated output characters that occur in string2 to single characters.

In either string a noninitial sequence -x, where x is  any  character  (possibly  quoted),
stands  for  a  range  of  characters: a possibly empty sequence of codes running from the
successor of the previous code up through the code for x.  The character followed by 1,  2
or  3  octal  digits stands for the character whose 16-bit value is given by those digits.
The character sequence followed by 1, 2,  3,  or  4  hexadecimal  digits  stands  for  the
character  whose 16-bit value is given by those digits.  A followed by any other character
stands for that character.

---

### **1. Basic Syntax**
**Command:**
```bash
tr [options] SET1 [SET2]
```
- `SET1`: The characters to be replaced.
- `SET2`: The characters to replace them with.

---

### **2. Translating Characters**
**Command:**
```bash
echo "example" | tr 'aeiou' '12345'
```
**Description:** Translates characters in `SET1` (`aeiou`) to corresponding characters in `SET2` (`12345`).

**Output:**
```plaintext
2x1mpl2
```

---

### **3. Deleting Characters (-d)**
**Command:**
```bash
echo "hello world" | tr -d 'lo'
```
**Description:** Deletes all occurrences of characters in `SET1` (`lo`).

**Output:**
```plaintext
he wrd
```

---

### **4. Squeezing Repeated Characters (-s)**
**Command:**
```bash
echo "aaabbbccc" | tr -s 'a'
```
**Description:** Squeezes repeated occurrences of `a` into a single `a`.

**Output:**
```plaintext
abbbccc
```

---

### **5. Complementing a Set (-c)**
**Command:**
```bash
echo "hello world" | tr -c 'a-z' '*'
```
**Description:** Complements `SET1` to include all characters except those in `a-z`. Replaces non-alphabetic characters with `*`.

**Output:**
```plaintext
hello*world
```

---

### **6. Combining Delete and Complement (-c -d)**
**Command:**
```bash
echo "hello123world" | tr -c -d 'a-z'
```
**Description:** Deletes all characters except alphabetic characters.

**Output:**
```plaintext
helloworld
```

---

### **7. Translating and Squeezing (-s with SET1 and SET2)**
**Command:**
```bash
echo "aaabbbccc" | tr -s 'abc' 'xyz'
```
**Description:** Translates `a` to `x`, `b` to `y`, and `c` to `z`, and squeezes repeated occurrences.

**Output:**
```plaintext
xyz
```

---

### **8. Using Character Classes**
Character classes are predefined sets of characters, enclosed in `[: :]`. Examples include:
- `[:lower:]`: All lowercase letters.
- `[:upper:]`: All uppercase letters.
- `[:digit:]`: All digits.
- `[:space:]`: All whitespace characters.
- `[:alnum:]`: All alphanumeric characters.

#### **Example 1: Converting Lowercase to Uppercase**
```bash
echo "hello world" | tr '[:lower:]' '[:upper:]'
```
**Output:**
```plaintext
HELLO WORLD
```

#### **Example 2: Removing Digits**
```bash
echo "abc123xyz" | tr -d '[:digit:]'
```
**Output:**
```plaintext
abcxyz
```

#### **Example 3: Removing Non-Alphanumeric Characters**
```bash
echo "abc!123@xyz#" | tr -d -c '[:alnum:]'
```
**Output:**
```plaintext
abc123xyz
```

---

### **9. Specifying Ranges**
Ranges are a shorthand for specifying a set of characters, e.g., `a-z`, `A-Z`, `0-9`.

#### **Example 1: Replace Digits with Dashes**
```bash
echo "Phone: 123-456-7890" | tr '0-9' '-'
```
**Output:**
```plaintext
Phone: ---/---/----
```

#### **Example 2: Removing Vowels**
```bash
echo "hello world" | tr -d 'a-z'
```
**Output:**
```plaintext
 (empty line)
```

---

### **10. Combining Complement and Squeeze**
**Command:**
```bash
echo "a!!b##c" | tr -c -s 'a-z' '+'
```
**Description:** Replaces all non-alphabetic characters with `+` and squeezes them.

**Output:**
```plaintext
a+b+c
```

---

### **11. Handling Multiple Files (Using Shell Commands)**
The `tr` command doesn't accept file names directly, but you can process files using shell redirection.

#### **Example: Processing a File**
```bash
tr '[:lower:]' '[:upper:]' < input.txt > output.txt
```
**Description:** Converts lowercase to uppercase in `input.txt` and writes the result to `output.txt`.

---

### **12. Help Option**
**Command:**
```bash
tr --help
```
**Description:** Displays usage information and available options.

---

### **Example Summary**

#### **Basic Character Translation**
```bash
echo "abc" | tr 'abc' '123'
```
**Output:**
```plaintext
123
```

#### **Deleting Characters**
```bash
echo "hello world" | tr -d ' '
```
**Output:**
```plaintext
helloworld
```

#### **Removing Non-Digits**
```bash
echo "a1b2c3" | tr -cd '0-9'
```
**Output:**
```plaintext
123
```

#### **Removing Whitespace**
```bash
echo "a b c" | tr -d '[:space:]'
```
**Output:**
```plaintext
abc
```
