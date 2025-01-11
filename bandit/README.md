# Bandit commands to play the game

### Level 0
```bash
sshpass -p $(cat passwords/0) ssh bandit0@bandit.labs.overthewire.org -p 2220 cat readme 
```

### Level 1
```bash
sshpass -p $(cat passwords/1) ssh bandit1@bandit.labs.overthewire.org -p 2220 cat ./-
```

### Level 2
```bash
sshpass -p $(cat passwords/2) ssh bandit2@bandit.labs.overthewire.org -p 2220 cat "spaces\ in\ this\ filename"
``` 

or

```bash
sshpass -p $(cat passwords/2) ssh bandit2@bandit.labs.overthewire.org -p 2220 
bandit2@bandit:~$ cat spaces\ in\ this\ filename
``` 

### Level 3
```bash
sshpass -p $(cat passwords/3) ssh bandit3@bandit.labs.overthewire.org -p 2220 
bandit3@bandit:~$ cd inhere | cat ...Hiding-From-You
```

### Level 4
```bash
sshpass -p $(cat passwords/4) ssh bandit4@bandit.labs.overthewire.org -p 2220 
bandit4@bandit:~$ cd inhere
bandit4@bandit:~/inhere$ for i in $(ls); do file ./$i; done
bandit4@bandit:~/inhere$ cat ./-file07  # Select file which showing ASCII text
```

### Level 5
```bash
sshpass -p $(cat passwords/5) ssh bandit5@bandit.labs.overthewire.org -p 2220 
bandit5@bandit:~$ cd inhere
bandit5@bandit:~/inhere$ find . -readable -size 1033c \! -executable -exec cat {} \;
```

### Level 6
```bash
sshpass -p $(cat passwords/6) ssh bandit6@bandit.labs.overthewire.org -p 2220 
bandit6@bandit:~$ find / -user bandit7 -group bandit6 -size 33c 2>/dev/null -exec cat {} \;
```

### Level 7
```bash
sshpass -p $(cat passwords/7) ssh bandit7@bandit.labs.overthewire.org -p 2220 
bandit7@bandit:~$ cat data.txt | grep "millionth"
```

### Level 8
```bash
sshpass -p $(cat passwords/8) ssh bandit8@bandit.labs.overthewire.org -p 2220 
bandit8@bandit:~$ cat data.txt | sort | uniq -u
```

### Level 9
```bash
sshpass -p $(cat passwords/9) ssh bandit9@bandit.labs.overthewire.org -p 2220
bandit9@bandit:~$ strings data.txt -n 32
```

### Level 10
```bash
sshpass -p $(cat passwords/10) ssh bandit10@bandit.labs.overthewire.org -p 2220
bandit10@bandit:~$ base64 -d data.txt
```

### Level 11
```bash
sshpass -p $(cat passwords/11) ssh bandit11@bandit.labs.overthewire.org -p 2220
bandit11@bandit:~$ cat data.txt | tr 'A-Za-z' 'N-ZA-Mn-za-m'
```
