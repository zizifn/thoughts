#!/usr/bin/pwsh
Write-Host "build process.c and create_process.c"
gcc -g -c -fPIC process.c
gcc -g -c -fPIC create_process.c

#把process.o 变成 动态链接库（Shared Libraries）
gcc -g -shared -fPIC -o libdynamicprocess.so process.o

#-L find .a file, use "-L. -ldynamicprocess" find "libdynamicprocess.so"
gcc -g -o dynamiccreateprocess create_process.o -L. -ldynamicprocess

#export LD_LIBRARY_PATH=.
# 当运行这个程序的时候，首先寻找动态链接库，然后加载它。
# 默认情况下，系统在 /lib 和 /usr/lib 文件夹下寻找动态链接库
