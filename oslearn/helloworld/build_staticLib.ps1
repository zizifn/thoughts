#!/usr/bin/pwsh
Write-Host "build process.c and create_process.c"
gcc -g -c -fPIC process.c
gcc -g -c -fPIC create_process.c

#把process.o 变成静态链接库.a
ar cr libstaticprocess.a process.o

#-L find .a file, use "-L. -lstaticprocess" find "libstaticprocess.a"
gcc -g -o staticcreateprocess create_process.o -L. -lstaticprocess

