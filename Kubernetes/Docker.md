# Docker

## Docker for Windows

1. How Docker for Windows `mounted & -v` works?

    Docker for Windows will add one MobyLinuxVM into Windows Hyper-V. And will mount Windows drivers like C to /c.  
    So this mean, `-v host_src` are already mount in MobyLinuxVM. 仅仅是语法糖(Syntactic sugar), nothing is magic.  

    Below refer to details

``` https://github.com/jwilder/nginx-proxy/issues/1110
https://github.com/jwilder/nginx-proxy/issues/1110 
I think the misunderstanding is that setting this variable  just happens to fix the problem by changing the way paths are parsed. It's not mapping this path to Windows in any way. This directory doesn't exist in Windows, it exists in the Hyper-V VM (Linux). Hopefully, this will help you understand. When you open Docker for Windows "Settings" and go to "Shared Drives", it helps you demonstrate the shared drive is working by entering this command:  

docker run --rm -v c:/Users:/data alpine ls /data  

What it then does, is automatically changes C:/Users to /c/Users in the background to demonstrate that C:\Users is correctly mounted within the Linux VM, and passed on to the container you create. What it doesn't tell you, is there is a way to prevent that from happening, and by doing that you can prove that you're actually mounting the drive from Linux to the Container. Using two slashes allows you to circumvent this conversion.

docker run --rm -v //:/data alpine ls //data
Now you'll see a Linux root directory, with folders like var, opt, etc.

docker run --rm -v //var/run:/data alpine ls //data
Now you'll see that there is a docker.sock  
```