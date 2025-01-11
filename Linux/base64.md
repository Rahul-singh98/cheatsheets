# base64 command

## Description
The `base64` command in Unix/Linux is used to encode and decode data using the Base64 encoding scheme, which represents binary data in an ASCII string format. 
Base64 encode or decode FILE, or standard input, to standard output. With no FILE, or when FILE is -, read standard input.
Mandatory arguments to long options are mandatory for short options too.
---

## Options
-d, --decode
        decode data

-i, --ignore-garbage
        when decoding, ignore non-alphabet characters

-w, --wrap=COLS
        wrap  encoded  lines  after  COLS  character  (default  76).  Use 0 to disable line
        wrapping

--help display this help and exit

--version
        output version information and exit

The data are encoded as described for the base64 alphabet in RFC 4648.  When decoding, the
input  may  contain  newlines in addition to the bytes of the formal base64 alphabet.  Use
--ignore-garbage to attempt to recover from any other non-alphabet bytes  in  the  encoded
stream.

---
## Examples

### **1. Encoding Data**
**Command:**
```bash
base64 file
```
**Description:** Encodes the contents of `file` to Base64.

**Example:**
```bash
echo "Hello, World!" > example.txt
base64 example.txt
```
**Output:**
```plaintext
SGVsbG8sIFdvcmxkIQo=
```
The file `example.txt` is encoded in Base64.

---

### **2. Decoding Data (-d or --decode)**
**Command:**
```bash
base64 -d file
```
**Description:** Decodes Base64-encoded data in `file`.

**Example:**
```bash
echo "SGVsbG8sIFdvcmxkIQo=" > encoded.txt
base64 -d encoded.txt
```
**Output:**
```plaintext
Hello, World!
```
The encoded content is decoded back to the original data.

---

### **3. Reading from Standard Input**
**Command:**
```bash
echo "data" | base64
```
**Description:** Encodes or decodes data from standard input.

**Example (Encoding):**
```bash
echo "Base64 encoding example" | base64
```
**Output:**
```plaintext
QmFzZTY0IGVuY29kaW5nIGV4YW1wbGU=
```

**Example (Decoding):**
```bash
echo "QmFzZTY0IGVuY29kaW5nIGV4YW1wbGU=" | base64 -d
```
**Output:**
```plaintext
Base64 encoding example
```

---

### **4. Specifying Input and Output Files (-i and -o)**
**Command:**
```bash
base64 -i inputfile -o outputfile
```
**Description:** Encodes or decodes using input from a file and writes the output to a file.

**Example:**
```bash
base64 -i example.txt -o encoded_output.txt
base64 -d -i encoded_output.txt -o decoded_output.txt
```
**Result:**
- `encoded_output.txt` contains the Base64-encoded data.
- `decoded_output.txt` contains the original data.

---

### **5. Limiting Line Length (-w or --wrap)**
**Command:**
```bash
base64 -w <length>
```
**Description:** Wraps encoded lines to a specific character width. Default is 76 characters. Use `-w 0` to disable wrapping.

**Example:**
```bash
echo "This is a long string for Base64 encoding." | base64 -w 20
```
**Output:**
```plaintext
VGhpcyBpcyBhIGxvbmcgc3Ry
aW5nIGZvciBCYXNlNjQgZW5j
b2RpbmcuCg==
```

**Disabling Wrapping:**
```bash
echo "This is a long string for Base64 encoding." | base64 -w 0
```
**Output:**
```plaintext
VGhpcyBpcyBhIGxvbmcgc3RyaW5nIGZvciBCYXNlNjQgZW5jb2RpbmcuCg==
```

---

### **6. Help Option (--help)**
**Command:**
```bash
base64 --help
```
**Description:** Displays help information with available options.

---

### **7. Combining Options**
**Command:**
```bash
base64 -i inputfile -o outputfile -w 50
```
**Description:** Reads input from `inputfile`, writes encoded data to `outputfile`, and wraps lines at 50 characters.

**Example:**
```bash
base64 -i example.txt -o wrapped_encoded.txt -w 50
```
**Result:**
The file `wrapped_encoded.txt` contains Base64-encoded data wrapped at 50 characters per line.

---

### **Example Summary with Explanation**

#### **Encoding**
```bash
echo "Linux Base64 Examples" | base64
```
**Output:**
```plaintext
TGludXggQmFzZTY0IEV4YW1wbGVzCg==
```

#### **Decoding**
```bash
echo "TGludXggQmFzZTY0IEV4YW1wbGVzCg==" | base64 -d
```
**Output:**
```plaintext
Linux Base64 Examples
```

#### **Encoding with No Wrapping**
```bash
echo "Base64 encoding with no wrapping lines." | base64 -w 0
```
**Output:**
```plaintext
QmFzZTY0IGVuY29kaW5nIHdpdGggbm8gd3JhcHBpbmcgbGluZXMuCg==
```

#### **Encoding to a File and Decoding Back**
```bash
echo "This is an example." > input.txt
base64 -i input.txt -o encoded.txt
base64 -d -i encoded.txt -o decoded.txt
```
**Result:**
- `encoded.txt` contains Base64-encoded data.
- `decoded.txt` contains the original string.
