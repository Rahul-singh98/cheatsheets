# file command
The `find` command in Unix/Linux systems is a powerful tool for searching files and directories in a directory hierarchy based on various criteria. Let's compare it with the `ls` command, which is typically used for listing files and directories.


## Options
-P     Never follow symbolic links.  This is the default behaviour.  When find examines or
        prints information about files, and the file is a symbolic  link,  the  information
        used shall be taken from the properties of the symbolic link itself.

-L     Follow  symbolic  links.  When find examines or prints information about files, the
        information used shall be taken from the properties of the file to which  the  link
        points,  not  from  the link itself (unless it is a broken symbolic link or find is
        unable to examine the file to which the link points).  Use of this  option  implies
        -noleaf.   If  you later use the -P option, -noleaf will still be in effect.  If -L
        is in effect and find discovers a  symbolic  link  to  a  subdirectory  during  its
        search, the subdirectory pointed to by the symbolic link will be searched.

        When  the -L option is in effect, the -type predicate will always match against the
        type of the file that a symbolic link points to rather than the link itself (unless
        the  symbolic  link  is  broken).   Actions that can cause symbolic links to become
        broken while find is executing (for example -delete) can  give  rise  to  confusing
        behaviour.   Using  -L  causes  the  -lname and -ilname predicates always to return
        false.

-H     Do not follow symbolic links, except while processing the command  line  arguments.
        When find examines or prints information about files, the information used shall be
        taken from the properties of the symbolic link itself.  The only exception to  this
        behaviour  is when a file specified on the command line is a symbolic link, and the
        link can be resolved.  For that situation,  the  information  used  is  taken  from
        whatever the link points to (that is, the link is followed).  The information about
        the link itself is used as a fallback if the file pointed to by the  symbolic  link
        cannot  be  examined.   If  -H  is  in effect and one of the paths specified on the
        command line is a symbolic link to a directory, the contents of that directory will
        be examined (though of course -maxdepth 0 would prevent this).

If  more  than  one of -H, -L and -P is specified, each overrides the others; the last one
appearing on the command line takes effect.  Since it is the default, the -P option should
be considered to be in effect unless either -H or -L is specified.

GNU  find  frequently stats files during the processing of the command line itself, before
any searching has begun.  These options also affect how  those  arguments  are  processed.
Specifically,  there  are  a number of tests that compare files listed on the command line
against a file we are currently considering.  In each case,  the  file  specified  on  the
command  line will have been examined and some of its properties will have been saved.  If
the named file is in fact a symbolic link, and the -P option is in effect (or  if  neither
-H  nor -L were specified), the information used for the comparison will be taken from the
properties of the symbolic link.  Otherwise, it will be taken from the properties  of  the
file  the  link  points  to.   If  find cannot follow the link (for example because it has
insufficient privileges or the link points to a nonexistent file) the  properties  of  the
link itself will be used.

When  the  -H  or  -L  options are in effect, any symbolic links listed as the argument of
-newer will be dereferenced, and the timestamp will be taken from the file  to  which  the
symbolic link points.  The same consideration applies to -newerXY, -anewer and -cnewer.

The  -follow  option has a similar effect to -L, though it takes effect at the point where
it appears (that is, if -L is not used but -follow is, any symbolic links appearing  after
-follow on the command line will be dereferenced, and those before it will not).

-D debugopts
        Print  diagnostic  information;  this  can be helpful to diagnose problems with why
        find is not doing what you want.   The  list  of  debug  options  should  be  comma
        separated.   Compatibility  of the debug options is not guaranteed between releases
        of findutils.  For a complete list of valid debug options, see the output  of  find
        -D help.  Valid debug options include

        exec   Show diagnostic information relating to -exec, -execdir, -ok and -okdir

        opt    Prints diagnostic information relating to the optimisation of the expression
                tree; see the -O option.

        rates  Prints a summary indicating how often each predicate succeeded or failed.

        search Navigate the directory tree verbosely.

        stat   Print messages as files are examined with the stat and lstat  system  calls.
                The find program tries to minimise such calls.

        tree   Show the expression tree in its original and optimised form.

        all    Enable all of the other debug options (but help).

        help   Explain the debugging options.

-Olevel
        Enables  query optimisation.  The find program reorders tests to speed up execution
        while preserving the overall effect; that is, predicates with side effects are  not
        reordered relative to each other.  The optimisations performed at each optimisation
        level are as follows.

        0      Equivalent to optimisation level 1.

        1      This is the default optimisation level and corresponds  to  the  traditional
                behaviour.   Expressions are reordered so that tests based only on the names
                of files (for example -name and -regex) are performed first.

        2      Any -type or -xtype tests are performed after any tests based  only  on  the
                names  of  files,  but  before  any  tests that require information from the
                inode.  On many  modern  versions  of  Unix,  file  types  are  returned  by
                readdir()  and  so  these  predicates are faster to evaluate than predicates
                which need to stat the file first.  If you use the -fstype FOO predicate and
                specify  a  filesystem  type  FOO  which  is  not known (that is, present in
                `/etc/mtab') at the time  find  starts,  that  predicate  is  equivalent  to
                -false.

        3      At  this optimisation level, the full cost-based query optimiser is enabled.
                The order of tests is modified so that cheap (i.e. fast) tests are performed
                first  and  more  expensive  ones are performed later, if necessary.  Within
                each cost band, predicates are  evaluated  earlier  or  later  according  to
                whether  they  are  likely  to succeed or not.  For -o, predicates which are
                likely to succeed are evaluated earlier, and for -a,  predicates  which  are
                likely to fail are evaluated earlier.

        The  cost-based  optimiser  has  a  fixed  idea  of how likely any given test is to
        succeed.  In some cases the probability takes account of the specific nature of the
        test  (for  example, -type f is assumed to be more likely to succeed than -type c).
        The cost-based optimiser is currently being evaluated.  If  it  does  not  actually
        improve   the   performance  of  find,  it  will  be  removed  again.   Conversely,
        optimisations that prove to be reliable, robust and effective  may  be  enabled  at
        lower  optimisation  levels  over  time.   However,  the  default  behaviour  (i.e.
        optimisation level 1) will not  be  changed  in  the  4.3.x  release  series.   The
        findutils  test  suite  runs  all  the tests on find at each optimisation level and
        ensures that the result is the same.

## Examples

### Basic `ls` Command Examples and Equivalent `find` Commands:

#### 1. **List all files and directories:**
   - **`ls` Command:**
     ```bash
     ls -R
     ```
     (The `-R` flag recursively lists all files and directories.)

   - **`find` Command:**
     ```bash
     find .
     ```
     (Starts from the current directory `.` and lists all files and directories.)

#### 2. **List files matching a specific name pattern:**
   - **`ls` Command:**
     ```bash
     ls *.txt
     ```
     (Lists all `.txt` files in the current directory.)

   - **`find` Command:**
     ```bash
     find . -name "*.txt"
     ```
     (Finds all `.txt` files in the current directory and subdirectories.)

#### 3. **List files ignoring case:**
   - **`ls` Command:**  
     No direct option in `ls`, but you can use shell globbing with case-insensitive matching:  
     ```bash
     shopt -s nocaseglob
     ls *.txt
     shopt -u nocaseglob
     ```

   - **`find` Command:**
     ```bash
     find . -iname "*.txt"
     ```
     (The `-iname` option is case-insensitive.)

---

### Advanced `find` Command Examples:

#### 4. **Find files based on size:**
   - Find files larger than 10MB:
     ```bash
     find . -type f -size +10M
     ```
   - Find files smaller than 1KB:
     ```bash
     find . -type f -size -1k
     ```

#### 5. **Find files modified within the last 7 days:**
   ```bash
   find . -type f -mtime -7
   ```
   (The `-mtime` option specifies the number of days since the file was modified. `-7` means within the last 7 days.)

#### 6. **Find empty files or directories:**
   - Empty files:
     ```bash
     find . -type f -empty
     ```
   - Empty directories:
     ```bash
     find . -type d -empty
     ```

#### 7. **Find files with specific permissions:**
   - Find files with exact permissions `644`:
     ```bash
     find . -type f -perm 644
     ```
   - Find files writable by others:
     ```bash
     find . -type f -perm /o+w
     ```

#### 8. **Execute a command on found files:**
   - Remove all `.tmp` files:
     ```bash
     find . -type f -name "*.tmp" -exec rm {} \;
     ```
   - Print details of each `.txt` file using `ls`:
     ```bash
     find . -type f -name "*.txt" -exec ls -l {} \;
     ```

---

### Combining Multiple Options in `find`:

#### 9. **Find files matching multiple criteria:**
   - Find `.log` files larger than 5MB:
     ```bash
     find . -type f -name "*.log" -size +5M
     ```

   - Find `.png` files modified in the last 30 days and owned by a specific user:
     ```bash
     find . -type f -name "*.png" -mtime -30 -user username
     ```

#### 10. **Use logical operators (AND, OR, NOT):**
   - Find `.txt` OR `.log` files:
     ```bash
     find . \( -name "*.txt" -o -name "*.log" \)
     ```

   - Find files that are NOT `.txt` files:
     ```bash
     find . ! -name "*.txt"
     ```

---

### Why Use `find` Over `ls`?

- **Recursive Search:** `find` is inherently recursive and allows fine-grained control over what is searched and how.
- **Powerful Filters:** You can filter results based on size, permissions, modification times, and more.
- **Execute Commands:** `find` allows you to execute commands on the files it locates, which `ls` cannot do.

Simple `find|xargs` approach
       •      Find files named core in or below the directory /tmp and delete them.

                  $ find /tmp -name core -type f -print | xargs /bin/rm -f

              Note that this  will  work  incorrectly  if  there  are  any  filenames  containing
              newlines, single or double quotes, or spaces.

   Safer `find -print0 | xargs -0` approach
       •      Find  files  named  core in or below the directory /tmp and delete them, processing
              filenames in such a way that file or directory names containing  single  or  double
              quotes, spaces or newlines are correctly handled.

                  $ find /tmp -name core -type f -print0 | xargs -0 /bin/rm -f

              The -name test comes before the -type test in order to avoid having to call stat(2)
              on every file.

       Note that there is still a race between the time find traverses the hierarchy printing the
       matching filenames, and the time the process executed by xargs works with that file.

   Processing arbitrary starting points
       •      Given that another program proggy pre-filters and creates a huge NUL-separated list
              of files, process those as starting points, and find all regular, empty files among
              them:

                  $ proggy | find -files0-from - -maxdepth 0 -type f -empty

              The  use  of  `-files0-from -`  means to read the names of the starting points from
              standard input, i.e., from the pipe; and -maxdepth 0 ensures that  only  explicitly
              those  entries  are examined without recursing into directories (in the case one of
              the starting points is one).

   Executing a command for each file
       •      Run file on every file in or below the current directory.

                  $ find . -type f -exec file '{}' \;

              Notice that the braces are enclosed in single quote  marks  to  protect  them  from
              interpretation  as  shell script punctuation.  The semicolon is similarly protected
              by the use of a backslash, though single quotes could have been used in  that  case
              also.

       In  many  cases,  one might prefer the `-exec ... +` or better the `-execdir ... +` syntax
       for performance and security reasons.

   Traversing the filesystem just once - for 2 different actions
       •      Traverse the filesystem just once, listing set-user-ID files and  directories  into
              /root/suid.txt and large files into /root/big.txt.

                  $ find / \
                      \( -perm -4000 -fprintf /root/suid.txt '%#m %u %p\n' \) , \
                      \( -size +100M -fprintf /root/big.txt '%-10s %p\n' \)

              This  example  uses  the  line-continuation character '\' on the first two lines to
              instruct the shell to continue reading the command on the next line.

   Searching files by age
       •      Search for files in your home directory  which  have  been  modified  in  the  last
              twenty-four hours.

                  $ find $HOME -mtime 0

              This  command  works this way because the time since each file was last modified is
              divided by 24 hours and any remainder is  discarded.   That  means  that  to  match
              -mtime 0, a file will have to have a modification in the past which is less than 24
              hours ago.

   Searching files by permissions
       •      Search for files which are executable but not readable.

                  $ find /sbin /usr/sbin -executable \! -readable -print

       •      Search for files which have read and write permission for their owner,  and  group,
              but which other users can read but not write to.

                  $ find . -perm 664

              Files which meet these criteria but have other permissions bits set (for example if
              someone can execute the file) will not be matched.

       •      Search for files which have read and write permission for their  owner  and  group,
              and  which  other  users  can  read,  without  regard  to the presence of any extra
              permission bits (for example the executable bit).

                  $ find . -perm -664

              This will match a file which has mode 0777, for example.

       •      Search for files which are writable by somebody (their owner, or  their  group,  or
              anybody else).

                  $ find . -perm /222

       •      Search for files which are writable by either their owner or their group.

                  $ find . -perm /220
                  $ find . -perm /u+w,g+w
                  $ find . -perm /u=w,g=w

              All  three  of  these  commands do the same thing, but the first one uses the octal
              representation of the file mode, and the other two  use  the  symbolic  form.   The
              files  don't  have to be writable by both the owner and group to be matched; either
              will do.

       •      Search for files which are writable by both their owner and their group.

                  $ find . -perm -220
                  $ find . -perm -g+w,u+w

              Both these commands do the same thing.

       •      A more elaborate search on permissions.

                  $ find . -perm -444 -perm /222 \! -perm /111
                  $ find . -perm -a+r -perm /a+w \! -perm /a+x

              These two commands both search for files that are  readable  for  everybody  (-perm
              -444 or -perm -a+r), have at least one write bit set (-perm /222 or -perm /a+w) but
              are not executable for anybody (! -perm /111 or ! -perm /a+x respectively).

   Pruning - omitting files and subdirectories
       •      Copy the contents of /source-dir to /dest-dir, but omit files and directories named
              .snapshot  (and  anything  in them).  It also omits files or directories whose name
              ends in `~', but not their contents.

                  $ cd /source-dir
                  $ find . -name .snapshot -prune -o \( \! -name '*~' -print0 \) \
                      | cpio -pmd0 /dest-dir

              The construct -prune -o \( ... -print0 \) is quite common.  The idea here  is  that
              the  expression  before -prune matches things which are to be pruned.  However, the
              -prune action itself returns true, so the following -o ensures that the right  hand
              side  is evaluated only for those directories which didn't get pruned (the contents
              of the pruned directories are not even visited, so their contents are  irrelevant).
              The expression on the right hand side of the -o is in parentheses only for clarity.
              It emphasises that the -print0 action takes place only for things that didn't  have
              -prune  applied  to  them.  Because the default `and' condition between tests binds
              more tightly than -o, this is the default anyway, but the parentheses help to  show
              what is going on.

       •      Given  the  following directory of projects and their associated SCM administrative
              directories, perform an efficient search for the projects' roots:

                  $ find repo/ \
                      \( -exec test -d '{}/.svn' \; \
                      -or -exec test -d '{}/.git' \; \
                      -or -exec test -d '{}/CVS' \; \
                      \) -print -prune

              Sample output:

                  repo/project1/CVS
                  repo/gnu/project2/.svn
                  repo/gnu/project3/.svn
                  repo/gnu/project3/src/.svn
                  repo/project4/.git

              In this example, -prune prevents unnecessary descent  into  directories  that  have
              already  been  discovered  (for  example  we  do not search project3/src because we
              already  found  project3/.svn),  but  ensures  sibling  directories  (project2  and
              project3) are found.

   Other useful examples
       •      Search for several file types.

                  $ find /tmp -type f,d,l

              Search  for  files,  directories,  and symbolic links in the directory /tmp passing
              these  types  as  a  comma-separated  list  (GNU  extension),  which  is  otherwise
              equivalent to the longer, yet more portable:

                  $ find /tmp \( -type f -o -type d -o -type l \)

       •      Search  for files with the particular name needle and stop immediately when we find
              the first one.

                  $ find / -name needle -print -quit

       •      Demonstrate the interpretation of the %f and %h format directives  of  the  -printf
              action for some corner-cases.  Here is an example including some output.

                  $ find . .. / /tmp /tmp/TRACE compile compile/64/tests/find -maxdepth 0 -printf '[%h][%f]\n'
                  [.][.]
                  [.][..]
                  [][/]
                  [][tmp]
                  [/tmp][TRACE]
                  [.][compile]
                  [compile/64/tests][find]
