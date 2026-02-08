# Bandit commands to play the game

## Pre Requisite
* docker command 
```bash
docker run --rm -it ubuntu
```

* update and install openssh-client
```bash
apt-get update && apt-get install -y openssh-client
```

* install sshpass
```bash
apt-get install sshpass -y
```

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
bandit4@bandit:~/inhere$ cat ./-file07
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

### Level 12
```bash
sshpass -p $(cat passwords/12) ssh bandit12@bandit.labs.overthewire.org -p 2220
bandit12@bandit:~$ mktemp -d
bandit12@bandit:~$ cd /tmp/tmp.Askoiankl
bandit12@bandit:~$ xxd -r d.txt > data.bin
bandit12@bandit:~$ file data.bin

bandit12@bandit:~$ mv data.bin data.gz
bandit12@bandit:~$ gunzip data.gz
bandit12@bandit:~$ file data

bandit12@bandit:~$ mv data data.bz2
bandit12@bandit:~$ bunzip2 data.bz2
bandit12@bandit:~$ file data

bandit12@bandit:~$ mv data data.tar
bandit12@bandit:~$ tar -xf data.tar
bandit12@bandit:~$ file data

bandit12@bandit:~$ cat data
```

### Level 13
```bash
sshpass -p $(cat passwords/13) ssh bandit13@bandit.labs.overthewire.org -p 2220
bandit13@bandit:~$ ls
bandit13@bandit:~$ exit

root@root:~$ scp -P 2220 bandit13@bandit.labs.overthewire.org:sshkey.private .
root@root:~$ chmod 700 sshkey.private
root@root:~$ ssh -i sshkey.private bandit14@bandit.labs.overthewire.org -p 2220
```

### Level 14
```bash
sshpass -p $(cat passwords/14) ssh bandit14@bandit.labs.overthewire.org -p 2220
bandit14@bandit:~$ nc localhost 30000 # paste the current level password
```

### Level 15
```bash
sshpass -p $(cat passwords/15) ssh bandit15@bandit.labs.overthewire.org -p 2220
bandit15@bandit:~$ openssl s_client -connect localhost:30001 # paste current level password
```

### Level 16
```bash
sshpass -p $(cat passwords/16) ssh bandit16@bandit.labs.overthewire.org -p 2220
bandit16@bandit:~$ nmap -p 31000-32000 localhost
bandit16@bandit:~$ openssl s_client -connect localhost:31790
 # paste current level password
bandit16@bandit:~$ exit
root@root:~$ mktemp -d
root@root:~$ cd /tmp/tmp.lOiokas
root@root:~$ touch private.key
root@root:~$ vim private.key # Paste SSH key here
root@root:~$ chmod 600 private.key
root@root:~$ ssh -i private.key bandit17@bandit.labs.overthewire.org -p 2220
bandit17@bandit:~$ cat /etc/bandit_pass/bandit17
```

### Level 17
```bash
sshpass -p $(cat passwords/17) ssh bandit17@bandit.labs.overthewire.org -p 2220
bandit17@bandit:~$ diff passwords.old passwords.new 
```

### Level 18
```bash
sshpass -p $(cat passwords/18) ssh bandit18@bandit.labs.overthewire.org -p 2220 cat readme
```

### Level 19
```bash
sshpass -p $(cat passwords/19) ssh bandit19@bandit.labs.overthewire.org -p 2220
bandit19@bandit:~$ ./bandit20-do cat /etc/bandit_pass/bandit20
```

### Level 20
```bash
sshpass -p $(cat passwords/20) ssh bandit20@bandit.labs.overthewire.org -p 2220
bandit20@bandit:~$ echo -n '0qXahG8ZjOVMN9Ghs7iOWsCfZyXOUbYO' | nc -l -p 1234 &
bandit20@bandit:~$ ./suconnect 1234
```

### Level 21
```bash
sshpass -p $(cat passwords/21) ssh bandit21@bandit.labs.overthewire.org -p 2220
bandit21@bandit:~$ cd /etc/cron.d/
bandit21@bandit:/etc/cron.d$ ls
bandit21@bandit:/etc/cron.d$ cat cronjob_bandit22
bandit21@bandit:/etc/cron.d$ cat /usr/bin/cronjob_bandit22.sh
bandit21@bandit:/etc/cron.d$ cat /tmp/t7O6lds9S0RqQh9aMcz6ShpAoZKF7fgv
```

### Level 22
```bash
sshpass -p $(cat passwords/22) ssh bandit22@bandit.labs.overthewire.org -p 2220
bandit22@bandit:~$ cd /etc/cron.d/
bandit22@bandit:/etc/cron.d$ ls
bandit22@bandit:/etc/cron.d$ cat cronjob_bandit23
bandit22@bandit:/etc/cron.d$ cat /usr/bin/cronjob_bandit23.sh
bandit22@bandit:/etc/cron.d$ myname=bandit23
bandit22@bandit:/etc/cron.d$ mytarget=$(echo I am user $myname | md5sum | cut -d ' ' -f 1)
bandit22@bandit:/etc/cron.d$ echo "Copying passwordfile /etc/bandit_pass/$myname to /tmp/$mytarget"
bandit22@bandit:/etc/cron.d$ cat /etc/bandit_pass/$myname > /tmp/$mytarget
bandit22@bandit:/etc/cron.d$ cat /tmp/8ca319486bfbbc3663ea0fbe81326349
```

### Level 23
```bash
sshpass -p $(cat passwords/23) ssh bandit23@bandit.labs.overthewire.org -p 2220
bandit23@bandit:~$ cd /etc/cron.d/
bandit23@bandit:/etc/cron.d$ ls
bandit23@bandit:/etc/cron.d$ cat cronjob_bandit24
bandit23@bandit:/etc/cron.d$ cat /usr/bin/cronjob_bandit24.sh
bandit23@bandit:/etc/cron.d$ nano /tmp/getpass.sh
bandit23@bandit:/etc/cron.d$ chmod +x /tmp/getpass.sh
bandit23@bandit:/etc/cron.d$ cp /tmp/getpass.sh /var/spool/bandit24/foo/
bandit23@bandit:/etc/cron.d$ cat /tmp/bandit24_pass
```

### Level 24
```bash
sshpass -p $(cat passwords/24) ssh bandit24@bandit.labs.overthewire.org -p 2220
bandit24@bandit:~$ PASS=gb8KRRCsshuZXI0tUuR6ypOFjiZbf3G8
bandit24@bandit:~$ for i in {0000..9999}; do   echo "$PASS $i"; done | nc localhost 30002
```

### Level 25
```bash
sshpass -p $(cat passwords/25) ssh bandit25@bandit.labs.overthewire.org -p 2220
bandit25@bandit:~$ ls
bandit25@bandit:~$ exit
rahul@rahul:~$ scp -P 2220 bandit25@bandit.labs.overthewire.org:bandit26.sshkey .
rahul@rahul:~$ ssh -i bandit26.sshkey bandit26@bandit.labs.overthewire.org -p 2220 # Check connection is successful or not. If yes, then resize the screen to bare minimum size.
rahul@rahul:~$ # Once logged in again, press v to open vim editor and type `:e /etc/bandit_pass/bandit26`
rahul@rahul:~$ # Copy paste the password to a file and close the connection.
```

### Level 26
```bash
# Log In by resize the screen to bare minimum
sshpass -p $(cat passwords/26) ssh bandit26@bandit.labs.overthewire.org -p 2220
# Press v and type :set shell=/bin/bash
# and type :shell
bandit26@bandit:~$ ls
bandit26@bandit:~$ ./bandit27-do
bandit26@bandit:~$ cat /etc/bandit_pass/bandit27
bandit26@bandit:~$ ./bandit27-do cat /etc/bandit_pass/bandit27
```